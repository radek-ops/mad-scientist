class World {
    ctx;
    canvas;
    background = new Background();
    enemies = [];
    controls;
    mainCharacter;
    gunsProjectils;
    IMAGES_BACKGROUND = [];
    cameraX = 0;
    worldWidth = 3 * 1280;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.controls = new Controls();
        this.mainCharacter = new Character(this.controls);
        this.gunsProjectils = new GunsProjectils(this.controls);
        this.addBackgroundImages();
        this.createEnemies();
        this.draw();
    }

    createEnemies() {
        for (let i = 0; i < 9; i++) {
            let enemy = new Enemy();
            this.enemies.push(enemy);
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.mainCharacter.x < 0) {
            this.mainCharacter.x = 0;
        }
        if (this.mainCharacter.x > this.worldWidth - this.mainCharacter.width) {
            this.mainCharacter.x = this.worldWidth - this.mainCharacter.width;
        }

        let targetCameraX = this.mainCharacter.x - this.canvas.width / 2;
        if (targetCameraX < 0) {
            targetCameraX = 0;
        }
        if (targetCameraX > this.worldWidth - this.canvas.width) {
            targetCameraX = this.worldWidth - this.canvas.width;
        }
        this.cameraX = targetCameraX;

        this.ctx.save();
        this.ctx.translate(-this.cameraX, 0);

        let drawY = this.mainCharacter.y - (240 - this.mainCharacter.jumpY);

        let tempY = this.mainCharacter.y;
        this.mainCharacter.y = drawY;

        if (this.mainCharacter.direction === 1) {
            this.gunsProjectils.x = this.mainCharacter.x + 350;
        } else {
            this.gunsProjectils.x = this.mainCharacter.x - 30;
        }
        this.gunsProjectils.y = drawY + 240;
        this.gunsProjectils.direction = this.mainCharacter.direction;

        if (this.controls.mouseClickLeft) {
            this.checkLaserCollisions();
        }
        this.checkCharacterCollisions();

        this.removeDeadEnemies();

        this.addObjectToMap(this.IMAGES_BACKGROUND);
        this.addObjectToMap(this.enemies);
        this.addToMap(this.gunsProjectils);
        this.addToMap(this.mainCharacter);

        this.mainCharacter.y = tempY;

        this.ctx.restore();

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    removeDeadEnemies() {
        let aliveEnemies = [];
        for (let i = 0; i < this.enemies.length; i++) {
            let enemy = this.enemies[i];
            if (!enemy.deathComplete) {
                aliveEnemies.push(enemy);
            }
        }
        this.enemies = aliveEnemies;
    }

    addToMap(value) {
        if (value.direction === -1) {
            this.ctx.save();
            this.ctx.translate(value.x + value.width, value.y);
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(value.img, 0, 0, value.width, value.height);
            this.ctx.restore();
        } else {
            this.ctx.drawImage(
                value.img,
                value.x,
                value.y,
                value.width,
                value.height
            );
        }
    }

    addObjectToMap(objects) {
        for (let i = 0; i < objects.length; i++) {
            let object = objects[i];
            this.addToMap(object);
        }
    }

    checkLaserCollisions() {
        let laserTipX;
        if (this.gunsProjectils.direction === 1) {
            laserTipX = this.gunsProjectils.x + this.gunsProjectils.width - 10;
        } else {
            laserTipX = this.gunsProjectils.x;
        }

        let laserTip = {
            x: laserTipX,
            y: this.gunsProjectils.y + this.gunsProjectils.height / 2 - 5,
            w: 1,
            h: 1
        };

        for (let i = 0; i < this.enemies.length; i++) {
            let enemy = this.enemies[i];
            if (enemy.isDead) {
                continue;
            }

            let enemyBox = {
                x: enemy.x + enemy.width * 0.4,
                y: enemy.y + enemy.height * 0.4,
                w: enemy.width * 0.2,
                h: enemy.height * 0.2
            };

            if (
                laserTip.x + laserTip.w > enemyBox.x &&
                laserTip.x < enemyBox.x + enemyBox.w &&
                laserTip.y + laserTip.h > enemyBox.y &&
                laserTip.y < enemyBox.y + enemyBox.h
            ) {
                enemy.die();
                break;
            }
        }
    }

    checkCharacterCollisions() {
        for (let i = 0; i < this.enemies.length; i++) {
            let enemy = this.enemies[i];
            if (enemy.isDead || enemy.isAttacking) {
                continue;
            }

            let charBox = {
                x: this.mainCharacter.x + this.mainCharacter.width * 0.3,
                y: this.mainCharacter.y + this.mainCharacter.height * 0.3,
                w: this.mainCharacter.width * 0.4,
                h: this.mainCharacter.height * 0.4
            };

            let enemyBox = {
                x: enemy.x + enemy.width * 0.3,
                y: enemy.y + enemy.height * 0.3,
                w: enemy.width * 0.4,
                h: enemy.height * 0.4
            };

            if (
                charBox.x + charBox.w > enemyBox.x &&
                charBox.x < enemyBox.x + enemyBox.w &&
                charBox.y + charBox.h > enemyBox.y &&
                charBox.y < enemyBox.y + enemyBox.h
            ) {
                enemy.attack();
                this.mainCharacter.getHit();
            }
        }
    }

    addBackgroundImages() {
        for (let i = 0; i < 3; i++) {
            let imgNumber = i;
            let nextBackground = 1280 * i;
            let bg = new Background(
                `./img/PNG/Backgrounds/${imgNumber}.png`,
                nextBackground
            );
            this.IMAGES_BACKGROUND.push(bg);
        }
    }
}

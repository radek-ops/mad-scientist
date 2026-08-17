class World {
    ctx;
    canvas;
    enemies;
    mainCharacter;
    finalBoss;
    gunsProjectils;
    IMAGES_BACKGROUND = [];
    map_scroll_x = 0;
    statusBar;
    hpbar;
    potions;
    drawY;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.lastSection = 0;
        this.addBackgroundImages();
        this.addBackgroundlayer();
        this.statusBar = new StatusBar();
        this.hpbar = new HPBar();
        this.potions = [new Potion(0), new Potion(1), new Potion(2)];
        this.controls = new Controls();
        this.gunsProjectils = new GunsProjectils(this.controls);
        this.mainCharacter = new Character(this.controls, this.gunsProjectils);
        this.mainCharacter.world = this;
        this.enemies = [new Enemy(this.controls), new Enemy(this.controls), new Enemy(this.controls), new Enemy(this.controls), new Enemy(this.controls)];
        this.finalBoss = new FinalBoss();
        this.draw();
    }

    collision(mainCharacter, enemies) {
        let charY = mainCharacter.getJumpY();
        let charLeft = mainCharacter.x + 106;
        let charRight = mainCharacter.x + 106 + (mainCharacter.width - 266);
        let charHead = charY + 150;
        let charFeet = charY + 150 + (mainCharacter.height - 244);
        let enemyLeft = enemies.x + 111;
        let enemyRight = enemies.x + 111 + (enemies.width - 226);
        let enemyHead = enemies.y + 148;
        let enemyFeet = enemies.y + 148 + (enemies.height - 226);
        if (charRight > enemyLeft &&
            charFeet> enemyHead &&
            charLeft < enemyRight &&
            charHead < enemyFeet) {
            return true;
        }
        return false;
    }

    checkEnemyCollision01() {
        this.enemies.forEach((enemy) => {
            if (this.collision(this.mainCharacter, enemy) && enemy.enemyType === '01') {
                let charFeet = this.mainCharacter.getJumpY() + 281;
                let enemyHead = enemy.y + 148;
                let isFalling = this.mainCharacter.speedY < 0;
                let isStomping = isFalling && (charFeet - enemyHead < 50);
                if (isStomping && !enemy.isHit) {
                    enemy.isHit = true;
                    enemy.enemy01GetHit();
                    setTimeout(() => {
                        let deathInterval = setInterval(() => {
                            let done = enemy.enemy01Death();
                            if (done) {
                                clearInterval(deathInterval);
                                enemy.isDead = true;
                            }
                        }, 60);
                    }, 500);
                }
            }
        });
    }


     checkEnemyCollision07And09() {
        this.enemies.forEach((enemy) => {
            if (this.collision(this.mainCharacter, enemy) && enemy.enemyType === '07' || enemy.enemyType == '09' ) {
                let charFeet = this.mainCharacter.getJumpY() + 281;
                let enemyHead = enemy.y + 148;
                let isFalling = this.mainCharacter.speedY < 0;
                let isStomping = isFalling && (charFeet - enemyHead < 50);
                if (isStomping) {
                    enemy.enemyGetHit();
                }
            }
        });
    }



    checkLaserEnemyCollision07() {
        if (!this.controls.mouseClickLeft) return;
        this.enemies.forEach((enemy) => {
            if (enemy.enemyType === '07' && this.laserHitEnemy(enemy) && !enemy.isHit) {
                enemy.isHit = true;
                let electricInterval = setInterval(() => {
                    let done = enemy.enemy07GetElectric();
                    if (done) {
                        clearInterval(electricInterval);
                        setTimeout(() => {
                            let deathInterval = setInterval(() => {
                                let done = enemy.enemy07Death();
                                if (done) {
                                    clearInterval(deathInterval);
                                    enemy.isDead = true;
                                }
                            }, 60);
                        }, 300);
                    }
                }, 100);
            }
        });
    }

    checkLaserEnemyCollision09() {
        if (!this.controls.mouseClickLeft) return;
        this.enemies.forEach((enemy) => {
            if (enemy.enemyType === '09' && this.laserHitEnemy(enemy) && !enemy.isHit) {
                enemy.isHit = true;
                let electricInterval = setInterval(() => {
                    let done = enemy.enemy09GetElectric();
                    if (done) {
                        clearInterval(electricInterval);
                        setTimeout(() => {
                            let deathInterval = setInterval(() => {
                                let done = enemy.enemy09Death();
                                if (done) {
                                    clearInterval(deathInterval);
                                    enemy.isDead = true;
                                }
                            }, 60);
                        }, 300);
                    }
                }, 100);
            }
        });
    }

    laserHitEnemy(enemy) {
        let laserLeft = this.gunsProjectils.x + 10;
        let laserRight = this.gunsProjectils.x + 10 + (this.gunsProjectils.width - 20);
        let laserTop = this.gunsProjectils.y + 10;
        let laserBottom = this.gunsProjectils.y + 10 + (this.gunsProjectils.height - 20);
        let enemyLeft = enemy.x + 111;
        let enemyRight = enemy.x + 111 + (enemy.width - 226);
        let enemyTop = enemy.y + 148;
        let enemyBottom = enemy.y + 148 + (enemy.height - 226);
        return laserRight > enemyLeft &&
               laserBottom > enemyTop &&
               laserLeft < enemyRight &&
               laserTop < enemyBottom;
    }

    spawnNewEnemies() {
        let section = Math.floor(this.mainCharacter.x / 1280);
        if (section > this.lastSection) {
            this.lastSection = section;
            let offset = section * 1280;
            for (let i = 0; i < 5; i++) {
                let e = new Enemy(this.controls);
                e.x += offset;
                this.enemies.push(e);
            }
        }
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.map_scroll_x, 0);
        let gunOffsetY = this.mainCharacter.isAboveGround() ? 70 : 180;
        this.gunsProjectils.otherDirection = this.mainCharacter.otherDirection;
        if (this.gunsProjectils.otherDirection) {
            this.gunsProjectils.x = this.mainCharacter.x - 10;
            this.gunsProjectils.y = this.calcJumpPos() + gunOffsetY;
        } else {
            this.gunsProjectils.x = this.mainCharacter.x + 280;
            this.gunsProjectils.y = this.calcJumpPos() + gunOffsetY;
        }
        this.allfunctions();
    }

    allfunctions() {
        this.addObjectToMap(this.IMAGES_BACKGROUND);
        this.addObjectToMap(this.enemies);
        this.spawnNewEnemies();
        this.checkEnemyCollision01();
        this.checkLaserEnemyCollision07();
        this.checkLaserEnemyCollision09();
        this.ctx.translate(-this.map_scroll_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.hpbar);
        this.addObjectToMap(this.potions);
        this.ctx.translate(this.map_scroll_x, 0);
        this.addToMap(this.mainCharacter);
        this.addToMap(this.finalBoss);
        this.addToMap(this.gunsProjectils);
        this.ctx.translate(-this.map_scroll_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });

    }


    addToMap(value) {
        if (value.otherDirection) {
            this.ctx.save();
            this.ctx.translate(value.width, 0);
            this.ctx.scale(-1, 1);
            value.x = value.x * -1;
        }
        this.drawY = (value === this.mainCharacter) ? this.calcJumpPos() : value.y;
        if (value.draw) {
            value.draw(this.ctx);
        } else {
            this.ctx.drawImage(
                value.img,
                value.x,
                this.drawY,
                value.width,
                value.height);
        }
        if (value.otherDirection) {
            value.x = value.x * -1;
            this.ctx.restore();
        }
    }

    calcJumpPos() {
        return this.mainCharacter.getJumpY();
    }

    addObjectToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        });
    }

    addBackgroundImages() {
        for (let i = 0; i < 3; i++) {
            let imgNumber = i;
            let x = 1278 * i;
            this.IMAGES_BACKGROUND.push(new Background(`./img/PNG/Backgrounds/layerLevel1/${imgNumber}.png`, x));
        }
    }

    addBackgroundlayer() {
        for (let i = 0; i < 3; i++) {
            let imgNumber = i;
            let x = 1278 * i;
            this.IMAGES_BACKGROUND.push(new Background(`./img/PNG/Backgrounds/layerTop/${imgNumber}.png`, x, 0, 1920, 180));
            this.IMAGES_BACKGROUND.push(new Background(`./img/PNG/Backgrounds/layerBottom/${imgNumber}.png`, x, 600, 1920, 120));
        }
    }
}



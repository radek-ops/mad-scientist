class World {
    ctx;
    canvas;
    enemies;
    mainCharacter;
    gunsProjectils;
    IMAGES_BACKGROUND = [];
    camera_x = 0;


    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.addBackgroundImages();
        this.addBackgroundlayer();
        this.controls = new Controls();
        this.mainCharacter = new Character(this.controls);
        this.mainCharacter.world = this;
        this.enemies = [new Enemy(this.controls), new Enemy(this.controls), new Enemy(this.controls), new Enemy(this.controls), new Enemy(this.controls)];
        this.gunsProjectils = new GunsProjectils(this.controls);
        this.ctx.imageSmoothingEnabled = false;

        this.draw();
    }





    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);


        if (this.gunsProjectils.otherDirection = this.mainCharacter.otherDirection) {
            this.gunsProjectils.x = this.mainCharacter.x - 30;
            this.gunsProjectils.y = this.calcJumpPos() -240;
        } else {
            this.gunsProjectils.x = this.mainCharacter.x + 350;
            this.gunsProjectils.y = this.calcJumpPos() + 240;
        }



        this.addObjectToMap(this.IMAGES_BACKGROUND);
        this.addObjectToMap(this.enemies);
        this.addToMap(this.gunsProjectils);
        this.addToMap(this.mainCharacter);
        this.ctx.translate(-this.camera_x, 0);


        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });

    }


    calcJumpPos() {
        if (this.mainCharacter.isAboveGround()) {
            return this.mainCharacter.y - (240 - this.mainCharacter.jumpY);
        } else {
            return this.mainCharacter.y;
        }
    }


    addObjectToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        });
    }

    addToMap(value) {
        if (value.otherDirection) {
            this.ctx.save();
            this.ctx.translate(value.width, 0);
            this.ctx.scale(-1, 1);
            value.x = value.x * -1;
        }
        let drawY = (value === this.mainCharacter) ? this.calcJumpPos() : value.y;
        this.ctx.drawImage(
            value.img,
            value.x,
            drawY,
            value.width,
            value.height);
        if (value.otherDirection) {
            value.x = value.x * -1;
            this.ctx.restore();

        }

    }

    addBackgroundImages() {
        for (let i = 0; i < 3; i++) {
            let imgNumber = i;
            let x = 1280 * i;
            this.IMAGES_BACKGROUND.push(new Background(`./img/PNG/Backgrounds/layerLevel1/${imgNumber}.png`, x));
        }
    }

    addBackgroundlayer() {
        for (let i = 0; i < 3; i++) {
            let imgNumber = i;
            let x = 1280 * i;
            this.IMAGES_BACKGROUND.push(new Background(`./img/PNG/Backgrounds/layerTop/${imgNumber}.png`, x, 0, 1282, 120));
            this.IMAGES_BACKGROUND.push(new Background(`./img/PNG/Backgrounds/layerBottom/${imgNumber}.png`, x, 600, 1282, 120));
            console.log(this.IMAGES_BACKGROUND);

        }
    }

}



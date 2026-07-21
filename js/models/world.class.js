class World {
    ctx;
    canvas;
    IMAGES_BACKGROUND = [];
    enemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];
    controls;
    mainCharacter;
    gunsProjectils;
    camera_x = 0;


    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.addBackgroundImages();
        this.controls = new Controls();
        this.mainCharacter = new Character(this.controls);
        this.gunsProjectils = new GunsProjectils(this.controls);
        this.draw();
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        let drawX = this.mainCharacter.x;
        let drawY = this.mainCharacter.y - (240 - this.mainCharacter.jumpY);

        this.gunsProjectils.x = drawX + 350;
        this.gunsProjectils.y = drawY + 240;

        this.addObjectsToMap(this.IMAGES_BACKGROUND);


        this.addToMap(this.gunsProjectils);

        this.ctx.drawImage(
            this.mainCharacter.img,
            drawX,
            drawY,
            this.mainCharacter.width,
            this.mainCharacter.height
        );
        this.addObjectsToMap(this.enemies);

        this.ctx.translate(-this.camera_x, 0);

        this.camera_x = -this.mainCharacter.x + 0;

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });

    }


    addToMap(value) {
        this.ctx.drawImage(
            value.img,
            value.x,
            value.y,
            value.width,
            value.height);
    }


    addObjectsToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        });
    }

    addBackgroundImages() {
        for (let i = 0; i < 3; i++) {
            let nextBackground = 1439 * i;
            this.IMAGES_BACKGROUND.push(new Background(`./img/PNG/Backgrounds/${i}.png`, nextBackground));
        }

    }

}


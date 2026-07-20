class World {
    ctx;
    canvas;
    background = new Background();
    enemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];
    controls;
    mainCharacter;
    gunsProjectils;
    IMAGES_BACKGROUND = [];


    constructor(canvas) {

        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.controls = new Controls();
        this.mainCharacter = new Character(this.controls);
        this.gunsProjectils = new GunsProjectils(this.controls);
        this.addBackgroundImages();
        this.draw();
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        let drawX = this.mainCharacter.x;
        let drawY = this.mainCharacter.y - (240 - this.mainCharacter.jumpY);

        this.gunsProjectils.x = drawX + 350;
        this.gunsProjectils.y = drawY + 240;

        this.addObjectsToMap(this.IMAGES_BACKGROUND);
        this.addObjectToMap(this.enemies);
        this.addObjectToMap(this.gunsProjectils);



        addObjectToMap(objects)
        objects.forEach(obj => {
            this.addToMap(obj);
        });

        addToMap(value)
        this.ctx.drawImage(
            value.img,
            value.x,
            value.y,
            value.width,
            value.height);


        this.ctx.drawImage(
            this.mainCharacter.img,
            drawX,
            drawY,
            this.mainCharacter.width,
            this.mainCharacter.height
        );




        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });

    }


   addBackgroundImages() {
        for (let i = 0; i < 5; i++) {
            let imgNumber = '0' + i;
            let nextBackground = 719 * i;
            this.IMAGES_BACKGROUND.push(new Background(`./img/PNG/Backgrounds/${imgNumber}.png`, nextBackground));
        }

    }

}


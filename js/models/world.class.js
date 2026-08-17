class World {
    ctx;
    canvas;
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

        this.gunsProjectils.x = this.mainCharacter.x + 350;
        this.gunsProjectils.y = this.mainCharacter.y + 240;
        
        this.mainCharacter.y = this.calcJumpPos();   
        this.addObjectToMap(this.IMAGES_BACKGROUND);
        this.addObjectToMap(this.enemies);
        this.addToMap(this.gunsProjectils);
        this.addToMap(this.mainCharacter);
       
       





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
        let drawY = value.calcJumpY ? value.calcJumpY() : value.y;
        this.ctx.drawImage(
            value.img,
            value.x,
            drawY,
            value.width,
            value.height);
    }


    addBackgroundImages() {
        for (let i = 0; i < 3; i++) {
            let imgNumber = i;
            let nextBackground = 1279 * i;
            this.IMAGES_BACKGROUND.push(new Background(`./img/PNG/Backgrounds/${imgNumber}.png`, nextBackground));
            console.log(this.IMAGES_BACKGROUND);

        }

    }





}


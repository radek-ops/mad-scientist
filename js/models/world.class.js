class World {
    ctx;
    canvas;
    controls;
    attacks;
    mainCharacter;
    background = new Backdrop();
    enemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];


    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.controls = new Controls();
        this.mainCharacter = new Character(this.controls);
        this.draw();
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.drawImage(
            this.background.img,
            this.background.x,
            this.background.y,
            this.background.width,
            this.background.height);

        this.enemies.forEach(enemy => {
            this.ctx.drawImage(
                enemy.img,
                enemy.x,
                enemy.y,
                enemy.width,
                enemy.height)
        });


        this.ctx.drawImage(

            this.mainCharacter.img,
            this.mainCharacter.x,
            this.mainCharacter.y,
            this.mainCharacter.width,
            this.mainCharacter.height,
        );

        if (this.mainCharacter.shootImg) {

            this.ctx.drawImage(
                this.mainCharacter.shootImg,
                this.mainCharacter.x,
                this.mainCharacter.y,
                this.mainCharacter.width,
                this.mainCharacter.height
            );
        }


        if (this.mainCharacter.gunImg) {

            this.ctx.drawImage(
                this.mainCharacter.gunImg,
                this.mainCharacter.x,
                this.mainCharacter.y,
                this.mainCharacter.width,
                this.mainCharacter.height
            );
        }


        if (this.mainCharacter.throwBombImg) {

            this.ctx.drawImage(
                this.mainCharacter.throwBombImg,
                this.mainCharacter.x,
                this.mainCharacter.y,
                this.mainCharacter.width,
                this.mainCharacter.height
            );
        }

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });

    }

}


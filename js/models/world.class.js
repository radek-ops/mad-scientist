class World {
    ctx;
    canvas;
    background = new Background();
    enemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];
    controls;
    mainCharacter;
    gunsProjectils;



    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.controls = new Controls();
        this.mainCharacter = new Character(this.controls);
        this.gunsProjectils = new GunsProjectils(this.controls);
        this.draw();
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.gunsProjectils.x = this.mainCharacter.x + 200;
        this.gunsProjectils.y = this.mainCharacter.y + 160;

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
                this.mainCharacter.height
            );
        
        
            this.ctx.drawImage(

                this.gunsProjectils.img,
                this.gunsProjectils.x,
                this.gunsProjectils.y,
                this.gunsProjectils.width,
                this.gunsProjectils.height
            );
        

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });

    }

}


class World {
    ctx;
    canvas;
    background = new Backdrop();
    mainCharacter = new Character();
    enemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];


    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
         window.addEventListener('keydown', (event) => {
            (event.key === 'w') ? this.mainCharacter.movingUp = true : false;
            (event.key === 'a') ? this.mainCharacter.movingLeft = true : false;
            (event.key === 's') ? this.mainCharacter.movingDown = true : false;
            (event.key === 'd') ? this.mainCharacter.movingRight = true : false;
        });

         window.addEventListener('keyup', (event) => {
            (event.key === 'w') ? this.mainCharacter.movingUp = false : false;
            (event.key === 'a') ? this.mainCharacter.movingLeft = false : false;
            (event.key === 's') ? this.mainCharacter.movingDown = false : false;
            (event.key === 'd') ? this.mainCharacter.movingRight = false : false;
        });
        
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


        this.ctx.drawImage(
            this.background.img,
            this.background.x,
            this.background.y,
            this.background.width,
            this.background.height);


        this.ctx.drawImage(
            this.mainCharacter.img,
            this.mainCharacter.x,
            this.mainCharacter.y,
            this.mainCharacter.width,
            this.mainCharacter.height
            );


        this.enemies.forEach(enemy => {
            this.ctx.drawImage(
                enemy.img,
                enemy.x,
                enemy.y,
                enemy.width,
                enemy.height)

        });


        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });



    }



}


class Enemy extends Moveables {
    IMAGES_IDLE = [];
    IMAGES_WALK = [];

    frameCounter = 0;
    currentImage = 0;

    constructor() {
        super();
        this.width = 375;
        this.height = 375;
        this.addEnemyImages();
        this.saveImages(this.IMAGES_IDLE);
        this.img = this.imageCache[this.IMAGES_IDLE[0]];
        this.saveImages(this.IMAGES_WALK);
        this.idleAnimate();
        this.walkAnimate();

    }

    addEnemyImages() {
        let enemyNum = Math.random() < 0.5 ? '01' : '07';

        for (let i = 0; i <= 13; i++) {
            let number = i < 10 ? '0' + i : i;
            this.IMAGES_WALK.push(`./img/PNG/Enemy_Characters/Enemy_Character${enemyNum}/Walk/Walk_${number}.png`);
            this.IMAGES_WALK.push(`./img/PNG/Enemy_Characters/Enemy_Character${enemyNum}/Walk/Walk_${number}.png`);
        }

        for (let i = 0; i <= 13; i++) {
            let number = i < 10 ? '0' + i : i;
            this.IMAGES_IDLE.push(`./img/PNG/Enemy_Characters/Enemy_Character${enemyNum}/Idle/Idle_${number}.png`);
            this.IMAGES_IDLE.push(`./img/PNG/Enemy_Characters/Enemy_Character${enemyNum}/Idle/Idle_${number}.png`);
        }

    }


    idleAnimate() {
        this.x = 550 + Math.random() * 500;
        this.y = 280 + Math.random() * 60;
        setInterval(() => {
            let path = this.IMAGES_IDLE[this.currentImage];
            this.currentImage++;
            if (this.currentImage == this.IMAGES_IDLE.length) {
                this.currentImage = 0;
            }
            this.img = this.imageCache[path];
        }, 60);

    }

    walkAnimate() {

        setInterval(() => {
            let path = this.IMAGES_WALK[this.currentImage];
            this.img = this.imageCache[path];
            this.currentImage++;
            if (this.currentImage == this.IMAGES_WALK.length) {
                this.currentImage = 0;
            }
        }, 60);
        this.startMoveAnimate();
    }









    startMoveAnimate() {
        setInterval(() => {
            this.x -= 1.5;
        }, 1000 / 60);

    }




}

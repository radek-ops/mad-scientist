class Enemy extends Moveables {
    IMAGES_IDLE = [];
    IMAGES_WALK = [];
    
    currentImage = 0;

    constructor() {
        super();
        this.width = 375;
        this.height = 375;
        this.addIdleEnemyImages();
        this.saveImages(this.IMAGES_IDLE);
        this.img = this.imageCache[this.IMAGES_IDLE[0]];
        this.saveImages(this.IMAGES_WALK);
        this.width = 375;
        this.height = 375;
        this.startIdleAnimate();
        this.startWalkAnimate();

    }

    addIdleEnemyImages() {
        for (let i = 0; i <= 13; i++) {
            let number = i < 10 ? '0' + i : i;
            this.IMAGES_IDLE.push(`./img/PNG/Enemy_Characters/Enemy_Character01/Idle/Idle_${number}.png`);
            this.IMAGES_WALK.push(`./img/PNG/Enemy_Characters/Enemy_Character01/Walk/Walk_${number}.png`);
        }
    }

    startIdleAnimate() {
        this.x = 550 + Math.random() * 500;
        this.y = 275 + Math.random() * 60;
        setInterval(() => {
            let path = this.IMAGES_IDLE[this.currentImage];
            this.img = this.imageCache[path];
            this.currentImage++;
            if (this.currentImage == this.IMAGES_IDLE.length) {
                this.currentImage = 0;
            }
        }, 60);

    }

    startWalkAnimate() {
        this.startMoveAnimate();

        setInterval(() => {
            this.x -= 0.3;
            let path = this.IMAGES_WALK[this.currentImage];
            this.img = this.imageCache[path];
            this.currentImage++;
            if (this.currentImage == this.IMAGES_WALK.length) {
                this.currentImage = 0;
            }
        }, 60);
    }

    startMoveAnimate() {
        setInterval(() => {
            this.x -= 1;
        }, 1000 / 60);

    }


    

}

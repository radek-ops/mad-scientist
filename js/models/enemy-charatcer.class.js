class Enemy extends movableCharacters {
    IMAGES_IDLE = [];
    imagesCache = {};
    currentImage = 0;

    IMAGES_WALK = [];




    constructor() {
        super();
        this.addIdleEnemyImages();
        this.loadIdleEnemyImages();
        this.img = this.imagesCache[this.IMAGES_IDLE[0]];
        this.x = 550 + Math.random() * 500;
        this.y = 275 + Math.random() * 60;
        this.width = 375;
        this.height = 375;

    }

    addIdleEnemyImages() {
        
        for (let i = 0; i <= 13; i++) {
            let number = i < 10 ? '0' + i : i;
            this.IMAGES_IDLE.push(`./img/PNG/Enemy_Characters/Enemy_Character01/Idle/Idle_${number}.png`);
        }

    }

    loadIdleEnemyImages() {
        for (let i = 0; i < this.IMAGES_IDLE.length; i++) {
            let imagesIndex = this.IMAGES_IDLE[i];
            let img = new Image();
            img.src = imagesIndex;
            this.imagesCache[imagesIndex] = img;
        }
        this.startIdleAnimate();
    }

    startIdleAnimate() {

        setInterval(() => {
            let path = this.IMAGES_IDLE[this.currentImage];
            this.img = this.imagesCache[path];
            this.currentImage++;
            if (this.currentImage == this.IMAGES_IDLE.length) {
                this.currentImage = 0;
            }
        }, 80);
    }






    moveLeft() {

    }
    moveRight() {

    }
}

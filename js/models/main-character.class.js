class Character extends movableCharacters {
    IMAGES_IDLE = [];
    IMAGES_WALK = [];
    imagesCache = {};
    currentImagePlus = 0;
    currentImageMinus = 13;
    currentImageIdle = 0;

    movingUp = false;
    movingLeft = false;
    movingDown = false;
    movingRight = false;


    constructor() {
        super();
        this.addImages();
        this.saveIdleImages();
        this.saveWalkImages();
        this.x = -70;
        this.y = 240;
        this.width = 475;
        this.height = 475;
        this.img = this.imagesCache[this.IMAGES_IDLE[0]];
        this.startAnimate();
    }

    addImages() {

        for (let i = 0; i <= 13; i++) {
            let number = i < 10 ? '0' + i : i;
            this.IMAGES_IDLE.push(`./img/PNG/Main_Characters/Gun01/Idle/Idle_${number}.png`);
        }
        for (let i = 0; i <= 13; i++) {
            let number = i < 10 ? '0' + i : i;
            this.IMAGES_WALK.push(`./img/PNG/Main_Characters/Gun01/Walk/Walk_${number}.png`);
        }
    }

    saveIdleImages() {
        for (let i = 0; i < this.IMAGES_IDLE.length; i++) {
            let imagesIndex = this.IMAGES_IDLE[i];
            let img = new Image();
            img.src = imagesIndex;
            this.imagesCache[imagesIndex] = img;
        }
    }

    saveWalkImages() {
        for (let i = 0; i < this.IMAGES_WALK.length; i++) {
            let imagesIndex = this.IMAGES_WALK[i];
            let img = new Image();
            img.src = imagesIndex;
            this.imagesCache[imagesIndex] = img;
        }
    }

    startAnimate() {

        setInterval(() => {
            let currentArray = (this.movingRight || this.movingLeft || this.movingUp || this.movingDown) ? this.IMAGES_WALK : this.IMAGES_IDLE;
            let index = 0;


            if (this.movingUp) {
               if (this.y  > 190) { 
                    this.y -= 5;
                }
                this.currentImageMinus--;
                if (this.currentImageMinus < 0) {
                    this.currentImageMinus = 13;
                }
                index = this.currentImageMinus;
            }

            else if (this.movingLeft) {
                this.x -= 5;
                this.currentImageMinus--;
                if (this.currentImageMinus < 0) {
                    this.currentImageMinus = 13;
                }
                index = this.currentImageMinus;
            }

            else if (this.movingDown) {
                if (this.y <  270) { 
                    this.y += 5;
                }
                this.currentImagePlus++;
                if (this.currentImagePlus > 13) {
                    this.currentImagePlus = 0;
                }
                index = this.currentImagePlus;
            }

            else if (this.movingRight) {
                this.x += 5;
                this.currentImagePlus++;
                if (this.currentImagePlus > 13) {
                    this.currentImagePlus = 0;
                }
                index = this.currentImagePlus;
            }

            else {
                this.currentImageIdle++;
                if (this.currentImageIdle > 13) {
                    this.currentImageIdle = 0;
                }
                index = this.currentImageIdle;
            }
            let path = currentArray[index];
            this.img = this.imagesCache[path];

        }, 80);
    }


}

class Character extends moveableCharacters {
    IMAGES_IDLE = [];
    IMAGES_WALK = [];

    imagesCache = {};
    currentImagePlus = 0;
    currentImageMinus = 13;
    currentImageIdle = 0;


    constructor() {
        super();
        this.addMoveImages();
        this.x = -70;
        this.y = 240;
        this.width = 475;
        this.height = 475;
        this.img = this.imagesCache[this.IMAGES_IDLE[0]];
        this.saveImages(this.IMAGES_IDLE);
        this.saveImages(this.IMAGES_WALK);
        this.addMoveImages();
        this.moveCharacter();
        this.img = this.imagesCache[this.IMAGES_IDLE[0]];

    }

    addMoveImages() {
        for (let i = 0; i < 13; i++) {
            let imgNumber = i < 10 ? '0' + i : i;
            this.IMAGES_IDLE.push(`./img/PNG/Main_Characters/Gun01/Idle/Idle_${imgNumber}.png`);
            this.IMAGES_WALK.push(`./img/PNG/Main_Characters/Gun01/Walk/Walk_${imgNumber}.png`);
        }
    }

    saveImages(characterImages) {
        characterImages.forEach((imgPath) => {
            let img = new Image();
            img.src = imgPath;
            this.imagesCache[imgPath] = img;
        });
    }

    moveCharacter() {
        setInterval(() => {
            let useKey = (this.up || this.back || this.down || this.foward) ? this.IMAGES_WALK : this.IMAGES_IDLE;

            let index = 0;

            if (this.up) {
                if (this.y > 190) {
                    this.y -= 10;
                }
                this.currentImageMinus--;
                if (this.currentImageMinus < 0) {
                    this.currentImageMinus = 13;
                }
                index = this.currentImageMinus;
            }

            else if (this.back) {
                this.x -= 10;
                this.currentImageMinus--;
                if (this.currentImageMinus < 0) {
                    this.currentImageMinus = 13;
                }
                index = this.currentImageMinus;
            }

            else if (this.down) {
                if (this.y < 270) {
                    this.y += 10;
                }
                this.currentImagePlus++;
                if (this.currentImagePlus > 13) {
                    this.currentImagePlus = 0;
                }
                index = this.currentImagePlus;
            }

            else if (this.foward) {
                this.x += 10;
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
            let path = useKey[index];
            this.img = this.imagesCache[path];

        }, 60);
    }

}

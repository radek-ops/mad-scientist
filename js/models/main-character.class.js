class Character extends movableCharacters {
    IMAGES_IDLE = [];
    IMAGES_WALK = [];
    IMAGES_SHOOTFX1 = [];
    IMAGES_PROJECTILE = [];
    IMAGES_TROWBOMB = [];
    imagesCache = {};
    currentImagePlus = 0;
    currentImageMinus = 13;
    currentImageIdle = 0;


    constructor() {
        super();
        this.addImages();
        this.x = -70;
        this.y = 240;
        this.width = 475;
        this.height = 475;
        this.img = this.imagesCache[this.IMAGES_IDLE[0]];
        
        // this.characterAttacks();
        this.saveImages(this.IMAGES_IDLE);
        this.saveImages(this.IMAGES_WALK);
        this.saveImages(this.IMAGES_SHOOTFX1);
        this.saveImages(this.IMAGES_PROJECTILE);
        this.saveImages(this.IMAGES_TROWBOMB);
        this.moveCharacter();
        
    }

    addImages() {
        for (let i = 0; i < 13; i++) {
            let number = i < 10 ? '0' + i : i;
            this.IMAGES_IDLE.push(`./img/PNG/Main_Characters/Gun01/Idle/Idle_${number}.png`);
            this.IMAGES_WALK.push(`./img/PNG/Main_Characters/Gun01/Walk/Walk_${number}.png`);
            this.IMAGES_SHOOTFX1.push(`./img/PNG/Main_Characters/Gun01/ShootFX1/ShootFX1_${number}.png`);
            this.IMAGES_PROJECTILE.push(`./img/PNG/Projectile/Laser/skeleton-animation_${number}.png`);
            this.IMAGES_TROWBOMB.push(`img/PNG/Main_Characters/Gun01/Throw bomb/Throw bomb_${number}.png`);
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



    // characterAttacks() {
    //     let mouseClickLeft = (this.mouseClickLeft) ? this.IMAGES_PROJECTILE : this.IMAGES_WALK;
    //     let mouseClickRight = (this.mouseClickRight) ? this.IMAGES_TROWBOMB : this.IMAGES_WALK;
    //     if (this.mouseClickLeft) {
    //     }
    // }
}

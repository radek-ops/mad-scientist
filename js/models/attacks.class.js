class attacks extends moveableCharacters {

    IMAGES_SHOOTFX1 = [];
    IMAGES_PROJECTILE = [];
    IMAGES_THROWBOMB = [];


    constructor() {
        super();
        this.x = -70;
        this.y = 240;
        this.width = 475;
        this.height = 475;
        this.saveImages(this.IMAGES_SHOOTFX1);
        this.saveImages(this.IMAGES_PROJECTILE);
        this.saveImages(this.IMAGES_THROWBOMB);
        this.characterAttacks();
        
    }




    addGunImages() {
        for (let i = 0; i < 4; i++) {
            let imgNumber = i < 4 ? '0' + i : i;
            this.IMAGES_SHOOTFX1.push(`./img/PNG/Main_Characters/Gun01/ShootFX1/ShootFX1_${imgNumber}.png`);
        }
    }

    addLaserImages() {
        for (let i = 0; i < 5; i++) {
            let imgNumber = i < 0 ? '0' + i : i;
            this.IMAGES_PROJECTILE.push(`./img/PNG/Projectile/Laser/skeleton-animation_${imgNumber}.png`);

        }
    }

    addThrowBombImages() {
        for (let i = 0; i < 19; i++) {
            let imgNumber = i < 10 ? '0' + i : i;
            this.IMAGES_THROWBOMB.push(`img/PNG/Main_Characters/Gun01/Throw bomb/Throw bomb_${imgNumber}.png`);

        }
    }


    saveImages(characterImages) {
        characterImages.forEach((imgPath) => {
            let img = new Image();
            img.src = imgPath;
            this.imagesCache[imgPath] = img;
        });
    }



    characterAttacks() {
        setInterval(() => {
            let mouseClickLeft = (this.mouseClickLeft) ? this.IMAGES_PROJECTILE : this.IMAGES_WALK;
            let mouseClickRight = (this.mouseClickRight) ? this.IMAGES_TROWBOMB : this.IMAGES_WALK;
            if (this.mouseClickLeft) {
            }

        }, 100);
    }


}
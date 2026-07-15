class Guns extends Moveables {

    IMAGES_LASER_GUN = [];
    IMAGES_THROWBOMB = [];
    imagesCache = {};

    x;
    y;
    width;
    heigth;
    controls;
    projectilImg;
    throwBombImg;
    currentProjectilekImages = 0;
    currentThrowBombkImages = 0;




    constructor(controls) {
        super();
        this.x = -70;
        this.y = 240;
        this.width = 200;
        this.height = 200;
        this.addLaserGunImages();
        this.addThrowBombImages();
        this.addLaserGunImages();
        this.addThrowBombImages();
        this.saveImages(this.IMAGES_LASER_GUN);
        this.saveImages(this.IMAGES_THROWBOMB);
        
    }


    addLaserGunImages() {
        for (let i = 0; i < 5; i++) {
            let imgNumber = '0' + i;
            this.IMAGES_LASER_GUN.push(`./img/PNG/Projectile/Laser/skeleton-animation_${imgNumber}.png`);

        }
    }

    addThrowBombImages() {
        for (let i = 0; i < 20; i++) {
            let imgNumber = i < 10 ? '0' + i : i;
            this.IMAGES_THROWBOMB.push(`./img/PNG/Main_Characters/Gun01/ThrowBomb/ThrowBomb_${imgNumber}.png`);

        }
    }

    projectilAnimate() {
        let isMouseLeftClicked = this.controls.mouseClickLeft;
        let projectil = [];
        if (isMouseLeftClicked) {
            projectil = this.IMAGES_LASER_GUN;
            this.currentProjectilekImages++;
            if (this.currentProjectilekImages == projectil.length) {
                this.currentProjectilekImages = 0;
            }
            let imgPath = projectil[this.currentProjectilekImages];
            this.projectilImg = this.imagesCache[imgPath];
        } else {
            this.projectilImg = null;
            this.currentProjectilekImages = 0;
        }
    }


    throwBombAnimate() {
        let isMouseRightClicked = this.controls.mouseClickRight;
        let bombImages = [];
        if (isMouseRightClicked) {
            bombImages = this.IMAGES_THROWBOMB;
            this.currentThrowBombkImages++;
            if (this.currentThrowBombkImages == bombImages.length) {
                this.currentThrowBombkImages = 0;
            }
            let imgPath = bombImages[this.currentThrowBombkImages];
            this.throwBombImg = this.imagesCache[imgPath];
        } else {
            this.throwBombImg = null;
            this.currentThrowBombkImages = 0;
        }
    }

}
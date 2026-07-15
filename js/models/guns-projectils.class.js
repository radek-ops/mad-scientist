class GunsProjectils extends Moveables {

    LASER = [];
    imagesCache = {};

    x;
    y;
    img;
    width;
    height;
    controls;
    currentProjectilekImages = 0;





    constructor(controls) {
        super();
        this.controls = controls;
        this.x = -70;
        this.y = 240;
        this.img;
        this.width = 100;
        this.height = 100;
        this.projectilImg;
        this.addLaserGunImages();
        this.saveImages(this.LASER);
        this. useProjectil();

    }


    addLaserGunImages() {
        for (let i = 0; i < 5; i++) {
            let imgNumber = '0' + i;
            this.LASER.push(`./img/PNG/Projectile/Laser/skeleton-animation_${imgNumber}.png`);

        }
    }

       useProjectil() {
        setInterval(() => {
            this.projectilAnimate();
        }, 1000 / 60);
    }


    projectilAnimate() {
        let isShooting = this.controls.mouseClickLeft;
        if (isShooting) {
            this.currentProjectilekImages++;
            if (this.currentProjectilekImages == this.LASER.length) {
                this.currentProjectilekImages = 0;
            }
            let imgPath = this.LASER[this.currentProjectilekImages];
            this.img = this.imagesCache[imgPath];
        } else {
            this.img = null;
            this.currentProjectilekImages = 0;
        }
    }


}
class GunsProjectils extends Moveables {

    LASER = [];
    width;
    height;
    controls;
    currentProjectileImages = 0;
    mageCache = {};




    constructor(controls) {
        super();
        this.controls = controls;
        this.x = -70;
        this.y = 240;

        this.width = 200
        this.height = 100;
        this.projectilImg;
        this.addLaserGunImages();
        this.saveImages(this.LASER);
        this.useProjectil();

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
            if (this.currentProjectileImages == this.LASER.length) {
                this.currentProjectileImages = 0;
            }
            let imgPath = this.LASER[this.currentProjectileImages];
            this.img = this.imageCache[imgPath];
        } else {
            this.currentProjectileImages = 0;
            this.img = null;d
           
        }
    }


}
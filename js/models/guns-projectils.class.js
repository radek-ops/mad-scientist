class GunsProjectils extends Moveables {

    LASER = [];
    width;
    height;
    controls;
    currentProjectileImages = 0;
//    mageCache = {};
    EMPTY_IMG = new Image();
    direction = 1;

    constructor(controls) {
        super();
        this.controls = controls;
        this.x = -70;
        this.y = 240;
        this.img = this.EMPTY_IMG;
        this.width = 150;
        this.height = 100;
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
        if (this.controls.mouseClickLeft) {
            this.currentProjectileImages++;
            if (this.currentProjectileImages >= this.LASER.length) {
                this.currentProjectileImages = 0;
            }
            let imgPath = this.LASER[this.currentProjectileImages];
            this.img = this.imageCache[imgPath];
        } else {
            this.currentProjectileImages = 0;
            this.img = this.EMPTY_IMG;
        }
    }
}

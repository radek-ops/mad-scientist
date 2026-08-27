class GunsProjectiles extends Moveables {

    LASER = [];
    width;
    height;
    controls;
    currentProjectileImages = 0;
    EMPTY_IMG = new Image();

    /**
     * Creates the gun and loads its images.
     * @param {Controls} controls - The mouse controls
     */
    constructor(controls) {
        super();
        this.controls = controls;
        this.x = 0;
        this.y = 0;
        this.img = this.EMPTY_IMG;
        this.width = 150;
        this.height = 100;
        this.addLaserGunImages();
        this.saveImages(this.LASER);
        this.useProjectile();
    }

    /**
     * Draws the laser.
     * @param {CanvasRenderingContext2D} ctx - The canvas context
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Loads the laser gun images.
     */
    addLaserGunImages() {
        for (let i = 0; i < 5; i++) {
            let imgNumber = '0' + i;
            this.LASER.push(`./img/PNG/Projectile/Laser/skeleton-animation_${imgNumber}.png`);

        }
    }

    /**
     * Starts the projectile animation loop.
     */
    useProjectile() {
        window.projectileInterval = setInterval(() => {
            this.projectileAnimate();
        }, 1000 / 60);
    }

    /**
     * Plays the laser animation when shooting.
     */
    projectileAnimate() {
        if (this.controls.mouseClickLeft) {
            let imgPath = this.LASER[this.currentProjectileImages];
            this.currentProjectileImages++;
            if (this.currentProjectileImages >= this.LASER.length) {
                this.currentProjectileImages = 0;
            }
            this.img = this.imageCache[imgPath];

        } else {
            this.currentProjectileImages = 0;
            this.img = this.EMPTY_IMG;

        }
    }


}
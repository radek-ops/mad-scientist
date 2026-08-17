class GunsProjectils extends Moveables {

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
        this.useProjectil();
    }


    SHOOT_SOUND = new Audio('../sounds/Shoot51.wav');
    /**
     * Plays the shoot sound.
     */
    playShootSound() {
        this.SHOOT_SOUND.play();
    }


    /**
     * Draws the laser and its collision box.
     * @param {CanvasRenderingContext2D} ctx - The canvas context
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        if (this.img !== this.EMPTY_IMG) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x + 10, this.y + 10, this.width - 20, this.height - 20);
            ctx.stroke();
        }
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
    useProjectil() {
        setInterval(() => {
            this.projectilAnimate();
        }, 1000 / 60);
    }


    /**
     * Plays the laser animation when shooting.
     */
    projectilAnimate() {
        if (this.controls.mouseClickLeft) {
            let imgPath = this.LASER[this.currentProjectileImages];
            this.currentProjectileImages++;
            if (this.currentProjectileImages >= this.LASER.length) {
                this.currentProjectileImages = 0;
                //  this.playShootSound();
            }
            this.img = this.imageCache[imgPath];

        } else {
            this.currentProjectileImages = 0;
            this.img = this.EMPTY_IMG;

        }
    }


}
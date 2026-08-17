class Boxing extends Moveables {
    BOXING_IMAGES = [];
    currentBoxingImages = 0;
    isActive = false;
    hasDamaged = false;
    animationInterval;


    /**
     * Creates the boss boxing (punch) animation.
     * @param {number} x - The x position
     * @param {number} y - The y position
     */
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.width = 400;
        this.height = 75;
        this.addBoxingImages();
        this.saveImages(this.BOXING_IMAGES);
        this.img = this.imageCache[this.BOXING_IMAGES[0]];
    }


    /**
     * Loads the boxing animation images.
     */
    addBoxingImages() {
        for (let i = 0; i <= 13; i++) {
            this.BOXING_IMAGES.push(`./img/PNG/Projectile/Boxing/skeleton-animation_${i}.png`);
        }
    }


    /**
     * Draws the boxing animation and its collision box.
     * @param {CanvasRenderingContext2D} ctx - The canvas context
     */
    draw(ctx) {
        if (!this.isActive) {
            return;
        }
        ctx.save();
        ctx.translate(this.x + this.width, this.y);
        ctx.scale(-1, 1);
        ctx.drawImage(this.img, 0, 0, this.width, this.height);
        ctx.restore();

        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "blue";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }


    /**
     * Starts the boxing animation.
     */
    start() {
        if (this.isActive) {
            return;
        }
        this.isActive = true;
        this.currentBoxingImages = 0;
        this.hasDamaged = false;
        this.animationInterval = setInterval(() => {
            let done = this.animate();
            if (done) {
                clearInterval(this.animationInterval);
            }
        }, 60);
    }


    /**
     * Plays one frame of the boxing animation.
     * @returns {boolean} True when the animation is finished
     */
    animate() {
        let imgPath = this.BOXING_IMAGES[this.currentBoxingImages];
        this.img = this.imageCache[imgPath];
        this.currentBoxingImages++;
        if (this.currentBoxingImages >= this.BOXING_IMAGES.length) {
            this.currentBoxingImages = 0;
            this.isActive = false;
            return true;
        }
        return false;
    }
}

class FinalBoss extends Moveables {
    IMAGES_IDLE = [];
    IMAGES_GET_HIT = [];
    IMAGES_DESTROY = [];
    frameCounter = 0;
    currentGetHitImages = 0;
    currentDestroyImages = 0;
    isHit = false;
    isDead = false;
    destroyFinished = false;


    /**
     * Creates the final boss.
     */
    constructor() {
        super();
        this.x = 2500;
        this.y = -900;
        this.width = 2000;
        this.height = 2000;
        this.addFinalBossImages();
        this.addGetHitImages();
        this.addDestroyImages();
        this.saveImages(this.IMAGES_IDLE);
        this.saveImages(this.IMAGES_GET_HIT);
        this.saveImages(this.IMAGES_DESTROY);
        this.img = this.imageCache[this.IMAGES_IDLE[0]];
        this.startAnimation();
    }

    /**
     * Draws the boss.
     * @param {CanvasRenderingContext2D} ctx - The canvas context
     */
    draw(ctx) {
        if (this.destroyFinished) return;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Loads the idle images of the boss.
     */
    addFinalBossImages() {
        for (let i = 0; i <= 6; i++) {
            let number = i;
            this.IMAGES_IDLE.push(`./img/PNG/Enemy_Characters/Enemy_Character10/Idle/Idle_${number}.png`);
        }
    }

    /**
     * Loads the get-hit images of the boss.
     */
    addGetHitImages() {
        for (let i = 0; i <= 9; i++) {
            let number = i < 10 ? '0' + i : i;
            this.IMAGES_GET_HIT.push(`./img/PNG/Enemy_Characters/Enemy_Character10/Get Hit/Get Hit_${number}.png`);
        }
    }

    /**
     * Loads the destroy images of the boss.
     */
    addDestroyImages() {
        for (let i = 0; i <= 13; i++) {
            let number = i < 10 ? '0' + i : i;
            this.IMAGES_DESTROY.push(`./img/PNG/Enemy_Characters/Enemy_Character10/Destroy/Destroy_${number}.png`);
        }
    }

    /**
     * Plays the idle animation of the boss.
     */
    startAnimationUpdate() {
        if (this.isHit || this.isDead) return;
        this.frameCounter++;
        if (this.frameCounter % 6 !== 0) return;
        let path = this.IMAGES_IDLE[this.currentIdleImages];
        this.currentIdleImages = (this.currentIdleImages + 1) % this.IMAGES_IDLE.length;
        this.img = this.imageCache[path]
    }

    /**
     * Plays one frame of the get-hit animation.
     * @returns {boolean} True when the animation is finished
     */
    getHit() {
        let imgPath = this.IMAGES_GET_HIT[this.currentGetHitImages];
        this.img = this.imageCache[imgPath];
        this.currentGetHitImages++;
        if (this.currentGetHitImages >= this.IMAGES_GET_HIT.length) {
            this.currentGetHitImages = 0;
            this.isHit = false;
            return true;
        }
        return false;
    }

    /**
     * Plays one frame of the destroy animation.
     * @returns {boolean} True when the animation is finished
     */
    destroy() {
        let imgPath = this.IMAGES_DESTROY[this.currentDestroyImages];
        this.img = this.imageCache[imgPath];
        this.currentDestroyImages++;
        if (this.currentDestroyImages >= this.IMAGES_DESTROY.length) {
            this.currentDestroyImages = 0;
            this.destroyFinished = true;
            return true;
        }
        return false;
    }

}


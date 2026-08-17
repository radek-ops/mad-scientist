class FinalBoss extends Moveables {
    IMAGES_IDLE = [];
    frameCounter = 0;
    isDead = false;


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
        this.saveImages(this.IMAGES_IDLE);
        this.img = this.imageCache[this.IMAGES_IDLE[0]];
        this.startAnimation();
    }


    /**
     * Draws the boss and its collision box.
     * @param {CanvasRenderingContext2D} ctx - The canvas context
     */
    draw(ctx) {
        if (this.isDead) return;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "blue";
        ctx.rect(this.x + 750, this.y + 1050, this.width - 1470, this.height - 1520);
        ctx.stroke();
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
     * Plays the idle animation of the boss.
     */
    startAnimationUpdate() {
        this.frameCounter++;
        if (this.frameCounter % 6 !== 0) return;
        let path = this.IMAGES_IDLE[this.currentIdleImages];
        this.currentIdleImages = (this.currentIdleImages + 1) % this.IMAGES_IDLE.length;
        this.img = this.imageCache[path]
    }









}


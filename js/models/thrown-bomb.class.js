class ThrownBomb extends Moveables {

    BOMB_IMAGE = './img/PNG/Projectile/Other/1.png';
    EXPLOSION_IMAGES = [];
    flySpeed = 8;
    flyDirection = 1;
    jumpUpSpeed = -14;
    gravity = 0.5;
    groundLevel = 600;
    hasExploded = false;
    hasDamaged = false;
    explosionFrame = 0;


    /**
     * Creates a thrown bomb that flies in an arc.
     * @param {number} startX - The start x position
     * @param {number} startY - The start y position
     * @param {number} flyDirection - 1 for right, -1 for left
     */
    constructor(startX, startY, flyDirection) {
        super();
        this.x = startX;
        this.y = startY;
        this.flyDirection = flyDirection;
        this.width = 40;
        this.height = 40;
        this.loadExplosionImages();
        this.saveImages(this.EXPLOSION_IMAGES);
        this.loadImages(this.BOMB_IMAGE);
    }


    /**
     * Loads the explosion animation images.
     */
    loadExplosionImages() {
        for (let i = 0; i <= 17; i++) {
            this.EXPLOSION_IMAGES.push(`./img/PNG/Collision_Fx/Fx02/skeleton-Fx2_${i}.png`);
        }
    }


    /**
     * Draws the bomb and its collision box.
     * @param {CanvasRenderingContext2D} ctx - The canvas context
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.beginPath();
        ctx.lineWidth = "3";
        ctx.strokeStyle = "blue";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }


    /**
     * Moves the bomb forward with gravity.
     */
    moveForward() {
        this.x += this.flySpeed * this.flyDirection;
        this.y += this.jumpUpSpeed;
        this.jumpUpSpeed += this.gravity;
        if (this.y + this.height >= this.groundLevel) {
            this.y = this.groundLevel - 200;
            this.hasExploded = true;
            this.width = 200;
            this.height = 200;
        }
    }


    /**
     * Plays one frame of the explosion animation.
     * @returns {boolean} True when the animation is finished
     */
    explode() {
        let imgPath = this.EXPLOSION_IMAGES[this.explosionFrame];
        this.img = this.imageCache[imgPath];
        this.explosionFrame++;
        if (this.explosionFrame >= this.EXPLOSION_IMAGES.length) {
            return true;
        }
        return false;
    }
}
class Enemy extends Moveables {
    IMAGES_WALK = [];
    IMAGES_IDLE = [];
    controls;
    speed = 0;
    isActivated = false;
    isHit = false;
    isDead = false;
    isAttacking = false;
    frameCounter = 0;
    COLLISION = { left: 111, shrinkX: 226, top: 148, shrinkY: 226 };

    /**
     * Creates an enemy and loads its common images.
     * @param {Controls} controls - The keyboard and mouse controls
     * @param {string} folderName - The image folder name of this enemy
     */
    constructor(controls, folderName) {
        super();
        this.controls = controls;
        this.width = 350;
        this.height = 350;
        this.addWalkAndIdleImages(folderName);
        this.setStartPosition();
        this.img = this.imageCache[this.IMAGES_IDLE[0]];
        this.startAnimation();
    }

    /**
     * Loads the common walk and idle images.
     * @param {string} folderName - The image folder name
     */
    addWalkAndIdleImages(folderName) {
        for (let i = 0; i <= 13; i++) {
            let number = i < 10 ? '0' + i : i;
            this.IMAGES_WALK.push(`./img/PNG/Enemy_Characters/Enemy_Character${folderName}/Walk/Walk_${number}.png`);
            this.IMAGES_IDLE.push(`./img/PNG/Enemy_Characters/Enemy_Character${folderName}/Idle/Idle_${number}.png`);
        }
        this.saveImages(this.IMAGES_IDLE);
        this.saveImages(this.IMAGES_WALK);
    }

    /**
     * Sets the default ground start position and speed.
     */
    setStartPosition() {
        this.x = 900 + Math.random() * 500;
        this.y = 290 + Math.random() * 60;
        this.speed = 2;
    }

    /**
     * Loads the type-specific images. Overridden by subclasses.
     */
    loadTypeImages() {
    }

    /**
     * Draws the enemy.
     * @param {CanvasRenderingContext2D} ctx - The canvas context
     */
    draw(ctx) {
        if (this.isDead) return;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Plays the walk or idle animation and moves the enemy.
     */
    startAnimationUpdate() {
        if (this.isHit || this.isAttacking) return;
        this.frameCounter++;
        if (this.frameCounter % 4 !== 0) return;
        this.activateEnemy();
        if (this.isActivated) {
            this.animateWalk();
        } else {
            this.animateIdle();
        }
    }

    /**
     * Marks the enemy as activated when any control is pressed.
     */
    activateEnemy() {
        let isMoving = this.controls.up || this.controls.back || this.controls.down || this.controls.forward || this.controls.space;
        isMoving ? this.isActivated = true : false;
    }

    /**
     * Plays the walk animation and moves the enemy left.
     */
    animateWalk() {
        let path = this.IMAGES_WALK[this.currentWalkImages];
        this.currentWalkImages = (this.currentWalkImages + 1) % this.IMAGES_WALK.length;
        this.img = this.imageCache[path];
        this.x -= this.speed;
    }

    /**
     * Plays the idle animation.
     */
    animateIdle() {
        let path = this.IMAGES_IDLE[this.currentIdleImages];
        this.currentIdleImages = (this.currentIdleImages + 1) % this.IMAGES_IDLE.length;
        this.img = this.imageCache[path];
    }
}

/**
 * Creates a random enemy of one of the three enemy types.
 * @param {Controls} controls - The keyboard and mouse controls
 * @returns {Enemy} A new enemy instance
 */
function createRandomEnemy(controls) {
    let enemyTypes = [ShieldEnemy, UnshieldedEnemy, FlyingEnemy];
    let RandomEnemy = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
    return new RandomEnemy(controls);
}
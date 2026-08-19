class Character extends Moveables {

    IMAGES_IDLE = [];
    IMAGES_WALK = [];
    IMAGES_SHOOTFX1 = [];
    IMAGES_THROWBOMB = [];
    IMAGES_JUMP = [];
    IMAGES_GETHIT = [];
    IMAGES_DEATH = [];
    controls;
    currentThrowBombImages = 0;
    currentShootFXImages = 0;
    currentJumpImages = 0;
    currentGetHitImages = 0;
    currentDeathImages = 0;
    isHit = false;
    isDead = false;
    walkFrameCounter = 0;
    shootFxframeCounter = 0;
    speedY = 0;
    acceleration = 1;
    otherDirection = false;
    gunsProjectiles;
    x = 0;
    y = 300;
    width = 375;
    height = 375;


    /**
     * Creates the character, loads images and starts movement.
     * @param {Controls} controls - The keyboard and mouse controls
     * @param {GunsProjectiles} gunsProjectiles - The gun of the character
     */
    constructor(controls, gunsProjectiles) {
        super();
        this.controls = controls;
        this.gunsProjectiles = gunsProjectiles;
        this.jumpY = 240;
        this.loadAllImages();
        this.moveCharacter();
        this.applyGravity();

    }


    /**
     * Draws the character.
     * @param {CanvasRenderingContext2D} ctx - The canvas context
     */
    draw(ctx) {
        let drawY = this.getJumpY();
        ctx.drawImage(this.img, this.x, drawY, this.width, this.height);
    }

    /**
     * Loads all images of the character.
     */
    loadAllImages() {
        this.addMoveImages();
        this.addShootFXImages();
        this.addThrowBombImages();
        this.addJumpImages();
        this.addGetHitImages();
        this.addDeathImages();
        this.saveImages(this.IMAGES_IDLE);
        this.saveImages(this.IMAGES_WALK);
        this.saveImages(this.IMAGES_SHOOTFX1);
        this.saveImages(this.IMAGES_THROWBOMB);
        this.saveImages(this.IMAGES_JUMP);
        this.saveImages(this.IMAGES_GETHIT);
        this.saveImages(this.IMAGES_DEATH);
        this.img = this.imageCache[this.IMAGES_IDLE[0]];
    }

    /**
     * Loads the idle and walk images.
     */
    addMoveImages() {
        for (let i = 0; i < 14; i++) {
            let imgNumber = i < 10 ? '0' + i : i;
            this.IMAGES_IDLE.push(`./img/PNG/Main_Characters/Gun01/Idle/Idle_${imgNumber}.png`);
            this.IMAGES_WALK.push(`./img/PNG/Main_Characters/Gun01/Walk/Walk_${imgNumber}.png`);
        }
    }

    /**
     * Loads the shoot animation images.
     */
    addShootFXImages() {
        for (let i = 0; i < 4; i++) {
            let imgNumber = '0' + i;
            this.IMAGES_SHOOTFX1.push(`./img/PNG/Main_Characters/Gun01/ShootFX1/ShootFX1_${imgNumber}.png`);
        }
    }

    /**
     * Loads the throw-bomb animation images.
     */
    addThrowBombImages() {
        for (let i = 0; i < 20; i++) {
            let imgNumber = i < 10 ? '0' + i : i;
            this.IMAGES_THROWBOMB.push(`./img/PNG/Main_Characters/Gun01/ThrowBomb/ThrowBomb_${imgNumber}.png`);
        }
    }

    /**
     * Loads the jump animation images.
     */
    addJumpImages() {
        for (let i = 0; i < 9; i++) {
            let imgNumber = '0' + i;
            this.IMAGES_JUMP.push(`./img/PNG/Main_Characters/Gun01/Jump/Jump_${imgNumber}.png`);
        }
    }

    /**
     * Loads the get-hit animation images.
     */
    addGetHitImages() {
        for (let i = 0; i <= 9; i++) {
            let number = i < 10 ? '0' + i : i;
            this.IMAGES_GETHIT.push(`./img/PNG/Main_Characters/Gun01/GetHit/GetHit_${number}.png`);
        }
    }

    /**
     * Loads the death animation images.
     */
    addDeathImages() {
        for (let i = 0; i <= 43; i++) {
            let number = i < 10 ? '0' + i : i;
            this.IMAGES_DEATH.push(`./img/PNG/Main_Characters/Gun01/Death/Death_${number}.png`);
        }
    }

    /**
     * Starts the movement and animation loop.
     */
    moveCharacter() {
        setInterval(() => {
            this.movement();
            this.animate();
            this.jump();
        }, 1000 / 60);
    }


    /**
     * Moves the character based on the pressed keys.
     */
    movement() {
        if (this.isDead) {
            return;
        }
        if (this.controls.up && this.y > 262) {
            this.y -= 10;
        }
        if (this.controls.down && this.y < 338) {
            this.y += 10;
        }
        if (this.controls.back && this.x > 0) {
            this.x -= 10;
            this.otherDirection = true;
        }
        else if (this.controls.forward && this.x < 3300) {
            this.x += 10;
            this.otherDirection = false;
        }
           this.movementUpdate();
    }

    /**
     * Updates the scrolling of the world when the character moves.
     */
    movementUpdate(){
        let deadZone = 960;
        if (this.x > deadZone) {
            this.world.map_scroll_x = -(this.x - deadZone);
        } else {
            this.world.map_scroll_x = 0;
        }

        if (this.world.map_scroll_x > 0) {
            this.world.map_scroll_x = 0;
        }
        if (this.world.map_scroll_x < -(3840 - 1920)) {
            this.world.map_scroll_x = -(3840 - 1920);
        }

    }

    /**
     * Chooses the right animation based on the input.
     */
    animate() {
        if (this.isDead || this.isHit) {
            return;
        }
        if (this.controls.mouseClickLeft) {
            this.walkAnimate();
            this.shootFxAnimate();
            this.gunsProjectiles.projectileAnimate();
        } else if (this.controls.mouseClickRight && !this.isAboveGround()) {
            this.startThrowBomb();
        } else if (this.currentThrowBombImages > 0) {
            this.throwBombAnimate();
        } else {
            this.walkAnimate();
        }
    }


    /**
     * Starts throwing a bomb with the right mouse button.
     */
    startThrowBomb() {
        this.controls.mouseClickRight = false;
        this.currentThrowBombImages = 0;
        this.throwBombAnimate();
        this.world.throwBomb();
    }


    /**
     * Plays the walk or idle animation.
     */
    walkAnimate() {
        this.walkFrameCounter++;
        if (this.walkFrameCounter % 3 !== 0) return;
        let isMoving = this.controls.up || this.controls.back || this.controls.down || this.controls.forward;

        let images;
        if (isMoving) {
            images = this.IMAGES_WALK;
        } else {
            images = this.IMAGES_IDLE;
        }
        this.currentWalkImages++;
        if (this.currentWalkImages >= images.length) {
            this.currentWalkImages = 0;
        }
        let imgPath = images[this.currentWalkImages];
        this.img = this.imageCache[imgPath];
    }

    /**
     * Plays the shoot animation.
     */
    shootFxAnimate() {
        this.shootFxframeCounter++;
        if (this.shootFxframeCounter % 2 !== 0) return;
        let imgPath = this.IMAGES_SHOOTFX1[this.currentShootFXImages];
        this.img = this.imageCache[imgPath];
        this.currentShootFXImages++;
        if (this.currentShootFXImages >= this.IMAGES_SHOOTFX1.length) {
            this.currentShootFXImages = 0;
        }
    }

    /**
     * Plays the throw-bomb animation.
     */
    throwBombAnimate() {
        let imgPath = this.IMAGES_THROWBOMB[this.currentThrowBombImages];
        this.img = this.imageCache[imgPath];
        this.currentThrowBombImages++;
        if (this.currentThrowBombImages >= this.IMAGES_THROWBOMB.length) {
            this.currentThrowBombImages = 0;
        }
    }

    /**
     * Applies gravity to the character every frame.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.jumpY -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.speedY = 0;
                this.jumpY = 240;
            }
        }, 1000 / 60);
    }

    /**
     * Checks if the character is in the air.
     * @returns {boolean} True when the character is jumping
     */
    isAboveGround() {
        return this.jumpY < 240;
    }

    /**
     * Returns the current y position while jumping.
     * @returns {number} The y position
     */
    getJumpY() {
        if (this.isAboveGround()) {
            return this.y - (240 - this.jumpY);
        } else {
            return this.y;
        }
    }

    /**
     * Makes the character jump with the space key.
     */
    jump() {
        if (this.isDead || this.isHit) {
            return;
        }
        if (this.controls.space && !this.isAboveGround()) {
            this.speedY = 18 ;
            this.currentJumpImages = 0;
            this.controls.space = false;
            this.world.sound.play('jump');
        }
        if (this.isAboveGround()) {
            this.jumpAnimate();
        }
    }

    /**
     * Plays the jump animation.
     */
    jumpAnimate() {
        if (this.currentJumpImages < this.IMAGES_JUMP.length) {
            this.currentJumpImages++;
        }
        let index = Math.min(this.currentJumpImages, this.IMAGES_JUMP.length - 1);
        let imgPath = this.IMAGES_JUMP[index];
        this.img = this.imageCache[imgPath];
    }

    /**
     * Plays the get-hit animation of the character.
     * @returns {boolean} True when the animation is finished
     */
    characterGetHit() {
        let imgPath = this.IMAGES_GETHIT[this.currentGetHitImages];
        let img = this.imageCache[imgPath];
        if (img && img.complete) {
            this.img = img;
        }
        this.currentGetHitImages++;
        if (this.currentGetHitImages >= this.IMAGES_GETHIT.length) {
            this.currentGetHitImages = 0;
            this.isHit = false;
            return true;
        }
        return false;
    }

    /**
     * Plays the death animation of the character.
     * @returns {boolean} True when the animation is finished
     */
    characterDeath() {
        let imgPath = this.IMAGES_DEATH[this.currentDeathImages];
        let img = this.imageCache[imgPath];
        if (img && img.complete) {
            this.img = img;
        }
        this.currentDeathImages++;
        if (this.currentDeathImages >= this.IMAGES_DEATH.length) {
            this.currentDeathImages = 0;
            return true;
        }
        return false;
    }

}

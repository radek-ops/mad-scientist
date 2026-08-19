class Enemy extends Moveables {
    IMAGES_WALK = [];
    IMAGES_IDLE = [];
    GET_HIT = [];
    GET_ELECTRIC_07 = [];
    GET_ELECTRIC_09 = [];
    DEATH01 = [];
    DEATH_07 = [];
    DEATH_09 = [];
    HIT_01 = [];
    HIT_07 = [];
    controls;
    speed = 0;
    isActivated = false;
    isHit = false;
    isDead = false;
    isAttacking = false;
    currentGetHitImages01 = 0;
    currentDeathImages01 = 0;
    currentElectricImages07 = 0;
    currentElectricImages09 = 0;
    currentDeathImages07 = 0;
    currentDeathImages09 = 0;
    currentHitImages01 = 0;
    currentHitImages07 = 0;
    frameCounter = 0;


    /**
     * Creates an enemy and loads its images.
     * @param {Controls} controls - The keyboard and mouse controls
     */
    constructor(controls) {
        super();
        this.controls = controls;
        this.width = 350;
        this.height = 350;
        this.addEnemyImages();
        this.addEnemyGetHitImages01();
        this.addEnemyGetElectricImages07();
        this.addEnemyGetElectricImages09();
        this.addEnemyDeathImages01();
        this.addEnemyDeathImages07();
        this.addEnemyDeathImages09();
        this.addEnemyHitImages01();
        this.addEnemyHitImages07();
        this.saveAllImages();
        this.img = this.imageCache[this.IMAGES_IDLE[0]];
        this.startAnimation();
    }

    /**
     * Loads all enemy images into the cache.
     */
    saveAllImages() {
        this.saveImages(this.IMAGES_IDLE);
        this.saveImages(this.IMAGES_WALK);
        this.saveImages(this.GET_HIT);
        this.saveImages(this.GET_ELECTRIC_07);
        this.saveImages(this.GET_ELECTRIC_09);
        this.saveImages(this.DEATH01);
        this.saveImages(this.DEATH_07);
        this.saveImages(this.DEATH_09);
        this.saveImages(this.HIT_01);
        this.saveImages(this.HIT_07);


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
     * Chooses a random enemy type.
     */
    addEnemyImages() {
        let availableEnemy = ['01', '07', '09'];
        let randomIndex = Math.floor(Math.random() * availableEnemy.length);
        let walkEnemyNum = availableEnemy[randomIndex];
        let idleEnemyNum = availableEnemy[randomIndex];
        this.enemyType = walkEnemyNum;
        this.addEnemyImagesUpdate(walkEnemyNum, idleEnemyNum);
    }

    /**
     * Loads the walk and idle images and sets the start position.
     * @param {string} walkEnemyNum - The enemy type number
     * @param {string} idleEnemyNum - The enemy type number for idle
     */
    addEnemyImagesUpdate(walkEnemyNum, idleEnemyNum) {
        for (let i = 0; i <= 13; i++) {
            let number = i < 10 ? '0' + i : i;
            this.IMAGES_WALK.push(`./img/PNG/Enemy_Characters/Enemy_Character${walkEnemyNum}/Walk/Walk_${number}.png`);
            this.IMAGES_IDLE.push(`./img/PNG/Enemy_Characters/Enemy_Character${idleEnemyNum}/Idle/Idle_${number}.png`);
        }
        if (walkEnemyNum === '09') {
            this.x = 900 + Math.random() * 500;
            this.y = -10 + Math.random() * 60;
            this.speed = 4;
        } else {
            this.x = 900 + Math.random() * 500;
            this.y = 290 + Math.random() * 60;
            this.speed = 2;
        }
    }

    /**
     * Plays the walk or idle animation and moves the enemy.
     */
    startAnimationUpdate() {
        if (this.isHit || this.isAttacking) return;
        this.frameCounter++;
        if (this.frameCounter % 4 !== 0) return;
        let isMoving = this.controls.up || this.controls.back || this.controls.down || this.controls.forward || this.controls.space;
        isMoving ? this.isActivated = true : false;
        if (this.isActivated) {
            let path = this.IMAGES_WALK[this.currentWalkImages];
            this.currentWalkImages = (this.currentWalkImages + 1) % this.IMAGES_WALK.length;
            this.img = this.imageCache[path];
            this.x -= this.speed;
        } else {
            let path = this.IMAGES_IDLE[this.currentIdleImages];
            this.currentIdleImages = (this.currentIdleImages + 1) % this.IMAGES_IDLE.length;
            this.img = this.imageCache[path]
        }
    }

    /**
     * Loads the get-hit images for enemy type 01.
     */
    addEnemyGetHitImages01() {
        for (let i = 0; i <= 9; i++) {
            let number = i < 10 ? '0' + i : i;
            this.GET_HIT.push(`./img/PNG/Enemy_Characters/Enemy_Character01/Get_Hit/Get_Hit_${number}.png`);
        }
    }

    /**
     * Loads the electric images for enemy type 07.
     */
    addEnemyGetElectricImages07() {
        for (let i = 0; i <= 2; i++) {
            this.GET_ELECTRIC_07.push(`./img/PNG/Enemy_Characters/Enemy_Character07/Get Electric/Get Electric_${i}.png`);
        }
    }

    /**
     * Loads the electric images for enemy type 09.
     */
    addEnemyGetElectricImages09() {
        for (let i = 0; i <= 2; i++) {
            this.GET_ELECTRIC_09.push(`./img/PNG/Enemy_Characters/Enemy_Character09/Get Electric/Get Electric_${i}.png`);
        }
    }

    /**
     * Plays the electric animation for enemy type 07.
     * @returns {boolean} True when the animation is finished
     */
    enemy07GetElectric() {
        let imgPath = this.GET_ELECTRIC_07[this.currentElectricImages07];
        let img = this.imageCache[imgPath];
        if (img && img.complete) {
            this.img = img;
        }
        this.currentElectricImages07++;
        if (this.currentElectricImages07 >= this.GET_ELECTRIC_07.length) {
            this.currentElectricImages07 = 0;
            return true;
        }
        return false;
    }

    /**
     * Plays the electric animation for enemy type 09.
     * @returns {boolean} True when the animation is finished
     */
    enemy09GetElectric() {
        let imgPath = this.GET_ELECTRIC_09[this.currentElectricImages09];
        let img = this.imageCache[imgPath];
        if (img && img.complete) {
            this.img = img;
        }
        this.currentElectricImages09++;
        if (this.currentElectricImages09 >= this.GET_ELECTRIC_09.length) {
            this.currentElectricImages09 = 0;
            return true;
        }
        return false;
    }

    /**
     * Loads the death images for enemy type 07.
     */
    addEnemyDeathImages07() {
        for (let i = 0; i <= 23; i++) {
            let number = i < 10 ? '0' + i : i;
            this.DEATH_07.push(`./img/PNG/Enemy_Characters/Enemy_Character07/Death/Death_${number}.png`);
        }
    }

    /**
     * Loads the death images for enemy type 09.
     */
    addEnemyDeathImages09() {
        for (let i = 0; i <= 13; i++) {
            let number = i < 10 ? '0' + i : i;
            this.DEATH_09.push(`./img/PNG/Enemy_Characters/Enemy_Character09/Destroy/Destroy_${number}.png`);
        }
    }

    /**
     * Plays the death animation for enemy type 07.
     * @returns {boolean} True when the animation is finished
     */
    enemy07Death() {
        let imgPath = this.DEATH_07[this.currentDeathImages07];
        let img = this.imageCache[imgPath];
        if (img && img.complete) {
            this.img = img;
        }
        this.currentDeathImages07++;
        if (this.currentDeathImages07 >= this.DEATH_07.length) {
            this.currentDeathImages07 = 0;
            return true;
        }
        return false;
    }

    /**
     * Plays the death animation for enemy type 09.
     * @returns {boolean} True when the animation is finished
     */
    enemy09Death() {
        let imgPath = this.DEATH_09[this.currentDeathImages09];
        let img = this.imageCache[imgPath];
        if (img && img.complete) {
            this.img = img;
        }
        this.currentDeathImages09++;
        if (this.currentDeathImages09 >= this.DEATH_09.length) {
            this.currentDeathImages09 = 0;
            return true;
        }
        return false;
    }

    /**
    * Loads the death images for enemy type 01.
    */
    addEnemyDeathImages01() {
        for (let i = 0; i <= 23; i++) {
            let number = i < 10 ? '0' + i : i;
            this.DEATH01.push(`./img/PNG/Enemy_Characters/Enemy_Character01/Death/Death_${number}.png`);
        }
    }

    /**
    * Plays the get-hit animation for enemy type 01.
    */
    enemy01GetHit() {
        let imgPath = this.GET_HIT[this.currentGetHitImages01];
        let img = this.imageCache[imgPath];
        if (img && img.complete) {
            this.img = img;
        }
        this.currentGetHitImages01++;
        if (this.currentGetHitImages01 >= this.GET_HIT.length) {
            this.currentGetHitImages01 = 0;
        }
    }

    /**
     * Plays the death animation for enemy type 01.
     * @returns {boolean} True when the animation is finished
     */
    enemy01Death() {
        let imgPath = this.DEATH01[this.currentDeathImages01];
        let img = this.imageCache[imgPath];
        if (img && img.complete) {
            this.img = img;
        }
        this.currentDeathImages01++;
        if (this.currentDeathImages01 >= this.DEATH01.length) {
            this.currentDeathImages01 = 0;
            return true;
        }
        return false;
    }

    /**
     * Loads the attack images for enemy type 01.
     */
    addEnemyHitImages01() {
        for (let i = 0; i <= 13; i++) {
            let number = i < 10 ? '0' + i : i;
            this.HIT_01.push(`./img/PNG/Enemy_Characters/Enemy_Character01/Hit/Hit_${number}.png`);
        }
    }

    /**
     * Loads the attack images for enemy type 07.
     */
    addEnemyHitImages07() {
        for (let i = 0; i <= 13; i++) {
            let number = i < 10 ? '0' + i : i;
            this.HIT_07.push(`./img/PNG/Enemy_Characters/Enemy_Character07/Hit/Hit_${number}.png`);
        }
    }

    /**
     * Plays the attack animation for enemy type 01.
     * @returns {boolean} True when the animation is finished
     */
    enemy01Attack() {
        let imgPath = this.HIT_01[this.currentHitImages01];
        let img = this.imageCache[imgPath];
        if (img && img.complete) {
            this.img = img;
        }
        this.currentHitImages01++;
        if (this.currentHitImages01 >= this.HIT_01.length) {
            this.currentHitImages01 = 0;
            this.isAttacking = false;
            return true;
        }
        return false;
    }

    /**
     * Plays the attack animation for enemy type 07.
     * @returns {boolean} True when the animation is finished
     */
    enemy07Attack() {
        let imgPath = this.HIT_07[this.currentHitImages07];
        let img = this.imageCache[imgPath];
        if (img && img.complete) {
            this.img = img;
        }
        this.currentHitImages07++;
        if (this.currentHitImages07 >= this.HIT_07.length) {
            this.currentHitImages07 = 0;
            this.isAttacking = false;
            return true;
        }
        return false;
    }

}

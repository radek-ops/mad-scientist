class Enemy extends Moveables {
    IMAGES_IDLE = [];
    IMAGES_WALK = [];
    IMAGES_DEATH = [];
    IMAGES_HIT = [];
    IMAGES_ELECTRIC = [];
    frameCounter = 0;
    currentImage = 0;
    isDead = false;
    deathAnimationIndex = 0;
    deathInterval;
    isAttacking = false;
    hitAnimationIndex = 0;
    hitInterval;
    isElectric = false;
    electricAnimationIndex = 0;
    electricInterval;

    constructor() {
        super();
        this.width = 375;
        this.height = 375;
        this.addIdleEnemyImages();
        this.addDeathImages();
        this.addHitImages();
        this.addElectricImages();
        this.saveImages(this.IMAGES_IDLE);
        this.saveImages(this.IMAGES_WALK);
        this.saveImages(this.IMAGES_DEATH);
        this.saveImages(this.IMAGES_HIT);
        this.saveImages(this.IMAGES_ELECTRIC);
        this.img = this.imageCache[this.IMAGES_IDLE[0]];
        this.startIdleAnimate();
        this.startWalkAnimate();

    }

    addIdleEnemyImages() {
        for (let i = 0; i <= 13; i++) {
            let number = i < 10 ? '0' + i : i;
            this.IMAGES_IDLE.push(`./img/PNG/Enemy_Characters/Enemy_Character01/Idle/Idle_${number}.png`);
            this.IMAGES_WALK.push(`./img/PNG/Enemy_Characters/Enemy_Character01/Walk/Walk_${number}.png`);
        }
    }

    addDeathImages() {
        for (let i = 0; i < 24; i++) {
            let number = i < 10 ? '0' + i : i;
            this.IMAGES_DEATH.push(`./img/PNG/Enemy_Characters/Enemy_Character01/Death/Death_${number}.png`);
        }
    }

    addHitImages() {
        for (let i = 0; i <= 13; i++) {
            let number = i < 10 ? '0' + i : i;
            this.IMAGES_HIT.push(`./img/PNG/Enemy_Characters/Enemy_Character01/Hit/Hit_${number}.png`);
        }
    }

    addElectricImages() {
        for (let i = 0; i < 3; i++) {
            this.IMAGES_ELECTRIC.push(`./img/PNG/Enemy_Characters/Enemy_Character01/Get Electric/Get Electric_${i}.png`);
        }
    }

    startIdleAnimate() {
        this.x = 550 + Math.random() * 500;
        this.y = 275 + Math.random() * 60;
        setInterval(() => {
            if (this.isDead) return;
            if (this.isAttacking) return;
            if (this.isElectric) return;
            let path = this.IMAGES_IDLE[this.currentImage];
            this.img = this.imageCache[path];
            this.currentImage++;
            if (this.currentImage == this.IMAGES_IDLE.length) {
                this.currentImage = 0;
            }
        }, 60);

    }

    startWalkAnimate() {
        setInterval(() => {
            if (this.isDead) return;
            if (this.isAttacking) return;
            if (this.isElectric) return;
            let path = this.IMAGES_WALK[this.currentImage];
            this.img = this.imageCache[path];
            this.currentImage++;
            if (this.currentImage == this.IMAGES_WALK.length) {
                this.currentImage = 0;
            }
        }, 60);
        this.startMoveAnimate();
    }

    startMoveAnimate() {
        setInterval(() => {
            if (this.isDead) return;
            if (this.isAttacking) return;
            if (this.isElectric) return;
            this.x -= 1.5;
        }, 1000 / 60);

    }

    die() {
        if (this.isDead) return;
        this.isElectric = true;
        this.electricAnimationIndex = 0;

        if (this.electricInterval) clearInterval(this.electricInterval);
        this.electricInterval = setInterval(() => {
            if (this.electricAnimationIndex < this.IMAGES_ELECTRIC.length) {
                this.img = this.imageCache[this.IMAGES_ELECTRIC[this.electricAnimationIndex]];
                this.electricAnimationIndex++;
            } else {
                clearInterval(this.electricInterval);
                this.isElectric = false;
                this.startDeathAnimation();
            }
        }, 60);
    }

    startDeathAnimation() {
        this.isDead = true;
        this.deathAnimationIndex = 0;
        if (this.deathInterval) clearInterval(this.deathInterval);
        this.deathInterval = setInterval(() => {
            if (this.deathAnimationIndex < this.IMAGES_DEATH.length) {
                this.img = this.imageCache[this.IMAGES_DEATH[this.deathAnimationIndex]];
                this.deathAnimationIndex++;
            } else {
                clearInterval(this.deathInterval);
                this.deathComplete = true;
            }
        }, 60);
    }

    attack() {
        if (this.isDead) return;
        this.isAttacking = true;
        this.hitAnimationIndex = 0;
        if (this.hitInterval) clearInterval(this.hitInterval);
        this.hitInterval = setInterval(() => {
            if (this.hitAnimationIndex < this.IMAGES_HIT.length) {
                this.img = this.imageCache[this.IMAGES_HIT[this.hitAnimationIndex]];
                this.hitAnimationIndex++;
            } else {
                clearInterval(this.hitInterval);
                this.isAttacking = false;
            }
        }, 60);
    }




}

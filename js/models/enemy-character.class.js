class Enemy extends Moveables {
    IMAGES_IDLE = [];
    IMAGES_WALK = [];
    IMAGES_DEATH = [];
    frameCounter = 0;
    currentImage = 0;
    isDead = false;
    deathAnimationIndex = 0;
    deathInterval;

    constructor() {
        super();
        this.width = 375;
        this.height = 375;
        this.addIdleEnemyImages();
        this.addDeathImages();
        this.saveImages(this.IMAGES_IDLE);
        this.saveImages(this.IMAGES_WALK);
        this.saveImages(this.IMAGES_DEATH);
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

    startIdleAnimate() {
        this.x = 550 + Math.random() * 500;
        this.y = 190 + Math.random() * 80;
        setInterval(() => {
            if (this.isDead) return;
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
            this.x -= 1.5;
        }, 1000 / 60);

    }

    die() {
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




}

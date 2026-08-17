class FinalBoss extends Moveables {
    IMAGES_IDLE = [];
    frameCounter = 0;


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


    addFinalBossImages(walkEnemyNum, idleEnemyNum) {
        for (let i = 0; i <= 6; i++) {
            let number = i;
            this.IMAGES_IDLE.push(`./img/PNG/Enemy_Characters/Enemy_Character10/Idle/Idle_${number}.png`);
        }
    }

    startAnimationUpdate() {
        this.frameCounter++;
        if (this.frameCounter % 6 !== 0) return;
        let path = this.IMAGES_IDLE[this.currentIdleImages];
        this.currentIdleImages = (this.currentIdleImages + 1) % this.IMAGES_IDLE.length;
        this.img = this.imageCache[path]
    }









}


class Enemy extends Moveables {
    IMAGES_WALK = [];
    IMAGES_IDLE = [];
    controls;
    speed = 0;
    isActivated = false;
    frameCounter = 0;


    constructor(controls) {
        super();
        this.controls = controls;
        this.width = 425;
        this.height = 425;
        this.addEnemyImages()
        this.saveImages(this.IMAGES_IDLE);
        this.saveImages(this.IMAGES_WALK);
        this.img = this.imageCache[this.IMAGES_IDLE[0]];
        this.startAnimation();
    }

    addEnemyImages() {
        let availableEnemy = ['01', '07', '09'];
        let randomIndex = Math.floor(Math.random() * availableEnemy.length);
        let walkEnemyNum = availableEnemy[randomIndex];
        let idleEnemyNum = availableEnemy[randomIndex];
        this.addEnemyImagesUpdate(walkEnemyNum, idleEnemyNum);
    }

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
            this.y = 240 + Math.random() * 60;
            this.speed = 2;
        }
    }


    startAnimationUpdate() {
        this.frameCounter++;
        if (this.frameCounter % 4 !== 0) return;
        let isMoving = this.controls.up || this.controls.back || this.controls.down || this.controls.foward || this.controls.space;
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

}

class Enemy extends Moveables {
    IMAGES_WALK = [];
    IMAGES_IDLE = [];
    controls;
    frameCounter = 0;
    currentImage = 0;

    constructor(controls) {
        super();
        this.controls = controls;
        this.width = 375;
        this.height = 375;
        this.startEnemyMove();
        this.saveImages(this.IMAGES_IDLE);
        this.img = this.imageCache[this.IMAGES_IDLE[0]];
        this.saveImages(this.IMAGES_WALK);
        this.idleAnimate();
        this.walkAnimate();
    }


    startEnemyMove() {
        if (this.controls.up || this.controls.back || this.controls.down || this.controls.foward || this.controls.space) {
            this.addEnemyImages();
        }
    }


    addEnemyImages() {
        let isMoving = this.controls.up || this.controls.back || this.controls.down || this.controls.foward;
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
        walkEnemyNum === '09' ? this.x = 900 + Math.random() * 500 : this.x = 900 + Math.random() * 500;
        walkEnemyNum === '09' ? this.y = 50 + Math.random() * 60 : this.y = 280 + Math.random() * 60;
    }


    idleAnimate() {
        setInterval(() => {
            let path = this.IMAGES_IDLE[this.currentImage];
            this.currentImage++;
            if (this.currentImage == this.IMAGES_IDLE.length) {
                this.currentImage = 0;
            }
            this.img = this.imageCache[path];
        }, 60);
    }


    walkAnimate() {
        setInterval(() => {
            let path = this.IMAGES_WALK[this.currentImage];
            this.img = this.imageCache[path];
            this.currentImage++;
            if (this.currentImage == this.IMAGES_WALK.length) {
                this.currentImage = 0;
            }
        }, 60);
        this.MoveAnimate();
    }


    MoveAnimate() {
        setInterval(() => {
            this.x -= 1.5;
        }, 1000 / 60);

    }
}

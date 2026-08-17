class Character extends Moveables {

    IMAGES_IDLE = [];
    IMAGES_WALK = [];
    IMAGES_SHOOTFX1 = [];
    img;
    controls;
    shootFxImg;
    imagesCache = {};



    constructor(controls) {
        super();
        this.controls = controls;
        this.x = -70;
        this.y = 240;
        this.width = 475;
        this.height = 475;
        this.addMoveImages();
        this.addShootFXImages();
        this.saveImages(this.IMAGES_IDLE);
        this.img = this.imagesCache[this.IMAGES_IDLE[0]];
        this.saveImages(this.IMAGES_WALK);
        this.saveImages(this.IMAGES_SHOOTFX1);
        this.moveCharacter();
    }


    addMoveImages() {
        for (let i = 0; i < 14; i++) {
            let imgNumber = i < 10 ? '0' + i : i;
            this.IMAGES_IDLE.push(`./img/PNG/Main_Characters/Gun01/Idle/Idle_${imgNumber}.png`);
            this.IMAGES_WALK.push(`./img/PNG/Main_Characters/Gun01/Walk/Walk_${imgNumber}.png`);
        }
    }

    addShootFXImages() {
        for (let i = 0; i < 4; i++) {
            let imgNumber = '0' + i;
            this.IMAGES_SHOOTFX1.push(`./img/PNG/Main_Characters/Gun01/ShootFX1/ShootFX1_${imgNumber}.png`);
        }
    }



    movement() {
        if (this.controls.up && this.y > 190) {
            this.y -= 10;
        }
        if (this.controls.down && this.y < 270) {
            this.y += 10;
        }
        if (this.controls.back) {
            this.x -= 10;
        }
        if (this.controls.foward) {
            this.x += 10;
        }
    }
    moveCharacter() {
        setInterval(() => {
            this.movement();
            this.walkAnimate();
        }, 1000 / 60);
    }

    walkAnimate() {
        let isShooting = this.controls.mouseClickLeft;
        if (isShooting) {
            this.shootFxAnimate();
        } else {
            this.shootFxImg = null;
            this.currentShootFXImages = 0;
            let isMoving = this.controls.up || this.controls.back || this.controls.down || this.controls.foward;
            let images = isMoving ? this.IMAGES_WALK : this.IMAGES_IDLE;
            this.walkAnimateUpdate(images);
        }
    }

    walkAnimateUpdate(images) {
        this.currentWalkImages++;
        let walkAnimate = this.currentWalkImages == images.length ? this.currentWalkImages = 0 : false;
        let imgPath = images[this.currentWalkImages];
        this.img = this.imagesCache[imgPath];
    }

    shootFxAnimate() {
        let isShooting = this.controls.mouseClickLeft;
        let images = [];
        if (isShooting) {
            images = this.IMAGES_SHOOTFX1;
            this.currentShootFXImages++;
            if (this.currentShootFXImages == images.length) {
                this.currentShootFXImages = 0;
            }
            let imgPath = images[this.currentShootFXImages];
            this.shootFxImg = this.imagesCache[imgPath];
        } 
    }






















}


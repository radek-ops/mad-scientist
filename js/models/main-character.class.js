class Character extends Moveables {

    IMAGES_IDLE = [];
    IMAGES_WALK = [];
    IMAGES_SHOOTFX1 = [];
    IMAGES_THROWBOMB = [];
    IMAGES_JUMP = [];
    controls;
    currentThrowBombkImages = 0;
    currentShootFXImages = 0;
    currentJumpImages = 0;
    frameCounter = 0;
    speedY = 0;
    acceleration = 1;
    otherDirection = false;

    constructor(controls) {
        super();
        this.controls = controls;
        this.x = 0;
        this.y = 180;
        this.jumpY = 240;
        this.width = 550;
        this.height = 550;
        this.loadAllImages();
        this.moveCharacter();
        this.applyGravity();
    }

    loadAllImages() {
        this.addMoveImages();
        this.addShootFXImages();
        this.addThrowBombImages();
        this.addJumpImages();
        this.saveImages(this.IMAGES_IDLE);
        this.saveImages(this.IMAGES_WALK);
        this.saveImages(this.IMAGES_SHOOTFX1);
        this.saveImages(this.IMAGES_THROWBOMB);
        this.saveImages(this.IMAGES_JUMP);
        this.img = this.imageCache[this.IMAGES_IDLE[0]];
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

    addThrowBombImages() {
        for (let i = 0; i < 20; i++) {
            let imgNumber = i < 10 ? '0' + i : i;
            this.IMAGES_THROWBOMB.push(`./img/PNG/Main_Characters/Gun01/ThrowBomb/ThrowBomb_${imgNumber}.png`);
        }
    }

    addJumpImages() {
        for (let i = 0; i < 9; i++) {
            let imgNumber = '0' + i;
            this.IMAGES_JUMP.push(`./img/PNG/Main_Characters/Gun01/Jump/Jump_${imgNumber}.png`);
        }
    }

    moveCharacter() {
        setInterval(() => {
            this.movement();
            this.animate();
        }, 1000 / 60);
    }


    movement() {
        if (this.controls.up && this.y > 140) {
            this.y -= 10;
        }
        if (this.controls.down && this.y < 210) {
            this.y += 10;
        }
        if (this.controls.back && this.x > 0) {
            this.x -= 10;
            this.otherDirection = true;
        }
        else if (this.controls.foward && this.x < 3840 -this.width ) {
            this.x += 10;
            this.otherDirection = false;
        }
        this.world.map_scroll_x = -this.x;

        if (this.world.map_scroll_x > 0) {
            this.world.map_scroll_x = 0;
        }
        if (this.world.map_scroll_x < -(3840 - 1920)) {
            this.world.map_scroll_x = -(3840 - 1920);
        }

    }


    animate() {
        if (this.controls.mouseClickLeft) {
            this.shootFxAnimate();
        } else if (this.controls.mouseClickRight) {
            this.startThrowBomb();
        } else if (this.currentThrowBombkImages > 0) {
            this.throwBombAnimate();
        } else if (this.controls.space || this.isAboveGround()) {
            this.jump();
        } else {
            this.walkAnimate();
        }
    }

    startThrowBomb() {
        this.controls.mouseClickRight = false;
        this.currentThrowBombkImages = 0;
        this.throwBombAnimate();
    }

    walkAnimate() {
        this.frameCounter++;
        if (this.frameCounter % 3 !== 0) return;
        let isMoving = this.controls.up || this.controls.back || this.controls.down || this.controls.foward;

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

    shootFxAnimate() {
        this.frameCounter++;
        if (this.frameCounter % 2 !== 0) return;
        let imgPath = this.IMAGES_SHOOTFX1[this.currentShootFXImages];
        this.img = this.imageCache[imgPath];
        this.currentShootFXImages++;
        if (this.currentShootFXImages >= this.IMAGES_SHOOTFX1.length) {
            this.currentShootFXImages = 0;
        }
    }

    throwBombAnimate() {
        let imgPath = this.IMAGES_THROWBOMB[this.currentThrowBombkImages];
        this.img = this.imageCache[imgPath];
        this.currentThrowBombkImages++;
        if (this.currentThrowBombkImages >= this.IMAGES_THROWBOMB.length) {
            this.currentThrowBombkImages = 0;
        }
    }

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

    isAboveGround() {
        return this.jumpY < 240;
    }

    calcJumpY() {
        return this.y - (240 - this.jumpY);
    }

    jump() {
        if (!this.isAboveGround()) {
            this.speedY = 20;
            this.currentJumpImages = 0;
        }
        this.controls.space = false;
        this.jumpAnimate();
    }

    jumpAnimate() {
        if (this.currentJumpImages < this.IMAGES_JUMP.length) {
            let imgPath = this.IMAGES_JUMP[this.currentJumpImages];
            this.img = this.imageCache[imgPath];
            this.currentJumpImages++;
            this.controls.space = false;
        }

    }

}

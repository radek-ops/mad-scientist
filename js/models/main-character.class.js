class Character extends Moveables {

    IMAGES_IDLE = [];
    IMAGES_WALK = [];
    IMAGES_SHOOTFX1 = [];
    IMAGES_THROWBOMB = [];
    img;
    controls;
    imagesCache = {};
    currentThrowBombkImages = 0;
    currentShootFXImages = 0



    constructor(controls) {
        super();
        this.controls = controls;
        this.x = -70;
        this.y = 240;
        this.width = 475;
        this.height = 475;
        this.addMoveImages();
        this.addShootFXImages();
        this.addThrowBombImages();
        this.saveImages(this.IMAGES_IDLE);
        this.img = this.imagesCache[this.IMAGES_IDLE[0]];
        this.saveImages(this.IMAGES_WALK);
        this.saveImages(this.IMAGES_SHOOTFX1);
        this.saveImages(this.IMAGES_THROWBOMB);
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

    addThrowBombImages() {
        for (let i = 0; i < 20; i++) {
            let imgNumber = i < 10 ? '0' + i : i;
            this.IMAGES_THROWBOMB.push(`./img/PNG/Main_Characters/Gun01/ThrowBomb/ThrowBomb_${imgNumber}.png`);

        }
    }

    moveCharacter() {
        setInterval(() => {
            this.movement();
            this.walkAnimate();
        }, 1000 / 60);
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

    walkAnimate() {
        let isShooting = this.controls.mouseClickLeft;
        let isThrowBomb = this.controls.mouseClickRight;
        if (isShooting) {
            this.shootFxAnimate();
        } else if (isThrowBomb) {
            this.throwBombAnimate();
        } else {

            this.currentShootFXImages = 0;
            this.currentThrowBombkImages = 0;
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
        let imgPath = this.IMAGES_SHOOTFX1[this.currentShootFXImages];
        this.img = this.imagesCache[imgPath];

        this.currentShootFXImages++;
        if (this.currentShootFXImages == this.IMAGES_SHOOTFX1.length) {
            this.currentShootFXImages = 0;
        }
        


    }

    throwBombAnimate() {
        let imgPath = this.IMAGES_THROWBOMB[this.currentThrowBombkImages];
        this.img = this.imagesCache[imgPath];

        this.currentThrowBombkImages++;
        if (this.currentThrowBombkImages == this.IMAGES_THROWBOMB.length) {
            this.currentThrowBombkImages = 0;
        }
        
    }






















}


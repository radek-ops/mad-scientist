class Character extends moveableCharacters {

    IMAGES_IDLE = [];
    IMAGES_WALK = [];
    IMAGES_SHOOTFX1 = [];
    IMAGES_LASER_GUN = [];
    IMAGES_THROWBOMB = [];
    imagesCache = {};
    currentWalkImages = 0;
    currentShootFXImages = 0;
    currentProjectilekImages = 0;
    currentThrowBombkImages = 0;
    controls;
    shootImg;
    gunImg;
    throwBombImg;


    constructor(controls) {
        super();
        this.controls = controls;
        this.x = -70;
        this.y = 240;
        this.width = 475;
        this.height = 475;
        this.shootImg;
        this.gunImg;
        this.throwBombImg;
        this.addMoveImages();
        this.addShootFXImages();
        this.addLaserGunImages();
        this.addThrowBombImages();
        this.saveImages(this.IMAGES_IDLE);
        this.img = this.imagesCache[this.IMAGES_IDLE[0]];
        this.saveImages(this.IMAGES_WALK);
        this.saveImages(this.IMAGES_SHOOTFX1);
        this.saveImages(this.IMAGES_LASER_GUN);
        this.saveImages(this.IMAGES_THROWBOMB);
        this.moveCharacter();
    }


    addMoveImages() {
        for (let i = 0; i < 13; i++) {
            let imgNumber = i < 10 ? '0' + i : i;
            this.IMAGES_IDLE.push(`./img/PNG/Main_Characters/Gun01/Idle/Idle_${imgNumber}.png`);
            this.IMAGES_WALK.push(`./img/PNG/Main_Characters/Gun01/Walk/Walk_${imgNumber}.png`);
        }
    }

    addShootFXImages() {
        for (let i = 0; i < 3; i++) {
            let imgNumber = i < 3 ? '0' + i : i;
            this.IMAGES_SHOOTFX1.push(`./img/PNG/Main_Characters/Gun01/ShootFX1/ShootFX1_${imgNumber}.png`);
        }
    }

    addLaserGunImages() {
        for (let i = 0; i < 4; i++) {
            let imgNumber = i < 4 ? '0' + i : i;
            this.IMAGES_LASER_GUN.push(`./img/PNG/Projectile/Laser/skeleton-animation_${imgNumber}.png`);

        }
    }

    addThrowBombImages() {
        for (let i = 0; i < 19; i++) {
            let imgNumber = i < 10 ? '0' + i : i;
            this.IMAGES_THROWBOMB.push(`./img/PNG/Main_Characters/Gun01/Throw bomb/Throw bomb_${imgNumber}.png`);

        }
    }

    saveImages(characterImages) {
        characterImages.forEach((imgPath) => {
            let img = new Image();
            img.src = imgPath;
            this.imagesCache[imgPath] = img;
        });
    }

    moveCharacter() {
        setInterval(() => {
            this.movement();
            this.walkAnimate();
            this.shootFxAnimate();
            this.projectilAnimate();
            this.throwBombAnimate();

        }, 60);
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

        let isMoving = this.controls.up || this.controls.back || this.controls.down || this.controls.foward;
        let images = isMoving ? this.IMAGES_WALK : this.IMAGES_IDLE;
        this.currentWalkImages++;
        if (this.currentWalkImages == images.length) {
            this.currentWalkImages = 0;
        }
        let imgPath = images[this.currentWalkImages];
        this.img = this.imagesCache[imgPath];

    }


    shootFxAnimate() {
        let isMouseLeftClicked = this.controls.mouseClickLeft;
        let shootFxImages = [];

        if (isMouseLeftClicked) {
            shootFxImages = this.IMAGES_SHOOTFX1;

            this.currentShootFXImages++;
            if (this.currentShootFXImages == shootFxImages.length) {
                this.currentShootFXImages = 0;
            }
            let imgPath = shootFxImages[this.currentShootFXImages];
            this.shootImg = this.imagesCache[imgPath];

        } else {
            this.shootImg = null;
            this.currentShootFXImages = 0;
            
        }

    }



    projectilAnimate() {
        let isMouseLeftClicked = this.controls.mouseClickLeft;
        let gunImages = [];
        if (isMouseLeftClicked) {
            gunImages = this.IMAGES_LASER_GUN;

            this.currentProjectilekImages++;
            if (this.currentProjectilekImages == gunImages.length) {
                this.currentProjectilekImages = 0;
            }
            let imgPath = gunImages[this.currentProjectilekImages];
            this.gunImg = this.imagesCache[imgPath];

        } else {
            this.gunImg = null;
            this.currentProjectilekImages = 0;
        }
    }



    throwBombAnimate() {
        let isMouseRightClicked = this.controls.mouseClickRight;
        let bombImages = [];
        if (isMouseRightClicked) {
            bombImages = this.IMAGES_THROWBOMB;

            this.currentThrowBombkImages++;
            if (this.currentThrowBombkImages == bombImages.length) {
                this.currentThrowBombkImages = 0;
            }

            let imgPath = bombImages[this.currentThrowBombkImages];
            this.throwBombImg = this.imagesCache[imgPath];
        } else {
            this.throwBombImg = null;
            this.currentThrowBombkImages = 0;
        }

    }




















}


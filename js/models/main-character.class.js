class Character extends Moveables {

    IMAGES_IDLE = [];
    IMAGES_WALK = [];
    IMAGES_SHOOTFX1 = [];
    IMAGES_THROWBOMB = [];
    IMAGES_JUMP = [];
    controls;
    currentThrowBombkImages = 0;
    currentShootFXImages = 0;
    currentWalkImages = 0;
    currentJumpImages = 0;
    frameCounter = 0;
    speedY = 0;
    acceleration = 1;


    constructor(controls) {
        super();
        this.controls = controls;
        this.x = 0;
        this.y = 240;
        this.jumpY = 240;
        this.width = 475;
        this.height = 475;
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
        this.moveCharacter();
        this.applyGravity();
        // this.playWalkingSound();

    }

    WALKING_SOUND = new Audio('../sounds/01_Main_Theme_Rate.mp3');
    playWalkingSound() {
        this.WALKING_SOUND.play();
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
           
            this.animate();


        }, 1000 / 60);
    }

    movement() {
         if (this.isAboveGround()) {
       
        this.jumpAnimate();
    } 
        if (this.controls.up && this.y > 190) {
            this.y -= 10;
        }
        if (this.controls.down && this.y < 270) {
            this.y += 10;
        }
        if (this.controls.back && this.x > 0 ) {
            this.x -= 10;
        }
        if (this.controls.foward  && this.x < 4350) {
            this.x += 10;
        }
    }

    animate() {

        if (this.controls.mouseClickLeft) {
            this.shootFxAnimate();
        } else if (this.controls.mouseClickRight) {
            this.controls.mouseClickRight = false;
            this.currentThrowBombkImages = 0;
            this.throwBombAnimate();
        } else if (this.currentThrowBombkImages > 0) {
            this.throwBombAnimate();
        }
        else if (this.controls.space) {
            this.jump();
            this.controls.space = false;
        }
        else {
            this.walkAnimate();
        }
    }


    walkAnimate() {
        this.frameCounter++;
        if (this.frameCounter % 3 !== 0) return;
        let isMoving = this.controls.up || this.controls.back || this.controls.down || this.controls.foward;
        let images = isMoving ? this.IMAGES_WALK : this.IMAGES_IDLE;
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
            this.walkAnimate();
        }
    }


    throwBombAnimate() {
        let imgPath = this.IMAGES_THROWBOMB[this.currentThrowBombkImages];
        this.img = this.imageCache[imgPath];
        this.currentThrowBombkImages++;
        if (this.currentThrowBombkImages >= this.IMAGES_THROWBOMB.length) {
            this.currentThrowBombkImages = 0;
            this.walkAnimate();
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

    jump() {
    if (!this.isAboveGround()) {
        this.speedY = 16;  
        this.currentJumpImages = 0;
    }
}

jumpAnimate() {
    this.frameCounter++;
  
    

    let imgPath = this.IMAGES_JUMP[this.currentJumpImages];
    this.img = this.imageCache[imgPath];

   
    if (this.currentJumpImages < this.IMAGES_JUMP.length - 1) {
        this.currentJumpImages++;
    }
    
}
    

}




































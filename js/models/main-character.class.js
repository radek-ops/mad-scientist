class Character extends moveableCharacters {

    IMAGES_IDLE = [];
    IMAGES_WALK = [];
    IMAGES_SHOOTFX1 = [];
    IMAGES_PROJECTILE = [];
    IMAGES_THROWBOMB = [];
    imagesCache = {};
    currentImage = 0; 
    controls;
    shoots;


    constructor(controls, shoots) {
        super();
        this.controls = controls;
        this.shoots = shoots;
        this.addMoveImages();
        this.x = -70;
        this.y = 240;
        this.width = 475;
        this.height = 475;
        this.saveImages(this.IMAGES_IDLE);
        this.saveImages(this.IMAGES_WALK);
        this.saveImages(this.IMAGES_SHOOTFX1);
        this.saveImages(this.IMAGES_PROJECTILE);
        this.saveImages(this.IMAGES_THROWBOMB); 
        this.addMoveImages();
        this.moveCharacter();
        this.img = this.imagesCache[this.IMAGES_IDLE[0]];
    }

    addMoveImages() {
        for (let i = 0; i < 13; i++) {
            let imgNumber = i < 10 ? '0' + i : i;
            this.IMAGES_IDLE.push(`./img/PNG/Main_Characters/Gun01/Idle/Idle_${imgNumber}.png`);
            this.IMAGES_WALK.push(`./img/PNG/Main_Characters/Gun01/Walk/Walk_${imgNumber}.png`);
        }
    }

    addGunImages() {
        for (let i = 0; i < 4; i++) {
            let imgNumber = i < 4 ? '0' + i : i;
            this.IMAGES_SHOOTFX1.push(`./img/PNG/Main_Characters/Gun01/ShootFX1/ShootFX1_${imgNumber}.png`);
        }
    }

    addLaserImages() {
        for (let i = 0; i < 5; i++) {
            let imgNumber = i < 0 ? '0' + i : i;
            this.IMAGES_PROJECTILE.push(`./img/PNG/Projectile/Laser/skeleton-animation_${imgNumber}.png`);

        }
    }

    addThrowBombImages() {
        for (let i = 0; i < 19; i++) {
            let imgNumber = i < 10 ? '0' + i : i;
            this.IMAGES_THROWBOMB.push(`img/PNG/Main_Characters/Gun01/Throw bomb/Throw bomb_${imgNumber}.png`);

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
            this.movement(); // 1. Wohin läuft er?
            this.animate();       // 2. Welches Bild wird gezeigt?
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


animate() {
    // 1. Welches Set an Bildern benutzen wir?
    let isMoving = this.controls.up || this.controls.back || this.controls.down || this.controls.foward;
    let images = isMoving ? this.IMAGES_WALK : this.IMAGES_IDLE;

    // 2. Zähler hochzählen und zurücksetzen, wenn er am Ende angekommen ist
    this.currentImage++;
    if (this.currentImage >= images.length) {
        this.currentImage = 0;
    }

    // 3. Bild setzen
    let path = images[this.currentImage];
    this.img = this.imagesCache[path];
}

}







   

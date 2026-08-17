class Character extends movableCharacters {
    IMAGES_IDLE = [];
    imagesCache = {};



    constructor() {
        super();
        this.addIdleCharacterImages();
        this.loadMainCharacterImages();
        this.x = -70;
        this.y = 240;
        this.width = 475;
        this.height = 475;
    }

    addIdleCharacterImages() {
        for (let i = 0; i <= 13; i++) {
            let number = i < 10 ? '0' + i : i;
            this.IMAGES_IDLE.push(`./img/PNG/Main_Characters/Gun01/Idle/Idle_${number}.png`);
        }
    }


    
    loadMainCharacterImages() {
        for (let i = 0; i < this.IMAGES_IDLE.length; i++) {
            let images = this.IMAGES_IDLE[i];
            let img = new Image();
            img.src = images;
            this.imagesCache[images] = img;

        }

        
        
    }






    jump() { };
}
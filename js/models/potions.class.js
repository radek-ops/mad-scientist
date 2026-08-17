class Potion extends Moveables {

    POTIONS = [];

    xPositions = [150, 200, 250];
    index;


    constructor(index) {
        super();
        this.index = index;
        this.addPotions();
        this.saveImages(this.POTIONS)
        this.initPotion();
        this.y = 100;
        this.width = 35;
        this.height = 35;
    }


    addPotions() {
        for (let i = 1; i <= 3; i++) {
            this.POTIONS.push(`./img/PNG/User_Interfaces/potion${i}.png`);
        }
    }

    initPotion() {
        this.img = this.imageCache[this.POTIONS[this.index]];
        this.x = this.xPositions[this.index];

    }










}





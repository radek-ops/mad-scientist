class Potion extends Moveables {

    POTIONS = [];

    xPositions = [80, 145, 210];

    static counter = 0;


    constructor() {
        super();
        this.addPotions();
        this.saveImages(this.POTIONS);
        this.initPotion();
        this.y = 110;
        this.width = 45;
        this.height = 45;
    }


    initPotion() {
        let index = Potion.counter;
        this.img = this.imageCache[this.POTIONS[index]];
        this.x = this.xPositions[index];
        Potion.counter++;
    }


    addPotions() {
        for (let i = 1; i <= 3; i++) {
            this.POTIONS.push(`./img/PNG/User_Interfaces/potion${i}.png`);
        }
    }


}





class Potion extends Moveables {

    POTION_IMAGE = './img/PNG/User_Interfaces/potion1.png';
    isCollected = false;
    isConsumed = false;


    /**
     * Creates a collectible potion at a world position.
     * @param {number} worldX - The x position in the world
     * @param {number} worldY - The y position in the world
     */
    constructor(worldX, worldY) {
        super();
        this.x = worldX;
        this.y = worldY;
        this.width = 40;
        this.height = 40;
        this.loadImages(this.POTION_IMAGE);
    }


    /**
     * Marks the potion as collected and moves it into the UI bar.
     * @param {number} slotNumber - The slot where the potion appears
     */
    collect(slotNumber) {
        this.isCollected = true;
        this.x = 150 + (slotNumber * 50);
        this.y = 100;
    }
}

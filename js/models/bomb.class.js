class Bomb extends Moveables {

    BOMB_IMAGE = './img/PNG/Projectile/Other/1.png';
    isCollected = false;
    isConsumed = false;
    collectedSlotNumber;


    /**
     * Creates a collectible bomb at a world position.
     * @param {number} worldX - The x position in the world
     * @param {number} worldY - The y position in the world
     * @param {number} collectedSlotNumber - The slot in the UI
     */
    constructor(worldX, worldY, collectedSlotNumber) {
        super();
        this.x = worldX;
        this.y = worldY;
        this.collectedSlotNumber = collectedSlotNumber;
        this.width = 40;
        this.height = 40;
        this.loadImages(this.BOMB_IMAGE);
    }


    /**
     * Marks the bomb as collected and moves it into the UI bar.
     * @param {number} slotNumber - The slot where the bomb appears
     */
    collect(slotNumber) {
        this.isCollected = true;
        this.x = 320 + (slotNumber * 45);
        this.y = 100;
    }
}
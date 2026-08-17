class BossHPBar extends Moveables {

    HEART_IMAGE = './img/PNG/User_Interfaces/HpICon.png';
    BAR_IMAGE = './img/PNG/User_Interfaces/GreenHPbar.png';
    maxHP = 100;
    currentHP = 100;
    maxWidth = 250;


    /**
     * Creates the boss health bar.
     */
    constructor() {
        super();
        this.x = 1300;
        this.y = 50;
        this.width = this.maxWidth;
        this.height = 30;
        this.heartImg = new Image();
        this.heartImg.src = this.HEART_IMAGE;
        this.barImg = new Image();
        this.barImg.src = this.BAR_IMAGE;
    }


    /**
     * Draws the heart, red bar and frame.
     * @param {CanvasRenderingContext2D} ctx - The canvas context
     */
    draw(ctx) {
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.roundRect(this.x - 10, this.y - 10, 330, 60, 15);
        ctx.fill();

        ctx.drawImage(this.heartImg, this.x, this.y, 40, 40);

        let currentWidth = this.maxWidth * (this.currentHP / this.maxHP);
        ctx.fillStyle = '#cc0000';
        ctx.fillRect(this.x + 50, this.y + 5, currentWidth, this.height);

        ctx.fillStyle = '#ffffff';
        ctx.font = '18px "blablaHawk", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Boss', this.x + 175, this.y + 25);

        ctx.beginPath();
        ctx.roundRect(this.x - 10, this.y - 10, 330, 60, 15);
        ctx.lineWidth = "4";
        ctx.strokeStyle = "#000000";
        ctx.stroke();
    }


    /**
     * Reduces the health of the boss.
     * @param {number} amount - How much health to remove
     */
    loseHP(amount) {
        this.currentHP -= amount;
        if (this.currentHP < 0) {
            this.currentHP = 0;
        }
    }
}
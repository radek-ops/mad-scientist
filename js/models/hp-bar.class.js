class HPBar extends Moveables {

    maxHP = 100;
    currentHP = 100;
    maxWidth = 256;
    slantedRight = 4;
    slantedLeft = 3;

    /**
     * Creates the character health bar.
     */
    constructor() {
        super();
        this.x = 123;
        this.y = 64;
        this.width = this.maxWidth;
        this.height = 18;
    }

    /**
     * Sets the current and maximum health.
     * @param {number} currentHP - The current health
     * @param {number} maxHP - The maximum health
     */
    setHP(currentHP, maxHP) {
        this.currentHP = currentHP;
        this.maxHP = maxHP || this.maxHP;
    }

    /**
     * Returns the color based on the health amount.
     * @returns {string} The color as hex value
     */
    getColor() {
        let percent = this.currentHP / this.maxHP;
        if (percent > 0.5) return '#00cc00';
        if (percent > 0.25) return '#cccc00';
        if (percent < 0.15) return '#cc0000';
    }

    /**
     * Draws the health bar.
     * @param {CanvasRenderingContext2D} ctx - The canvas context
     */
    draw(ctx) {
        let currentWidth = this.maxWidth * (this.currentHP / this.maxHP);
        let color = this.getColor();
        let sl = this.slantedLeft;
        let sr = this.slantedRight;

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + currentWidth, this.y);
        ctx.lineTo(this.x + currentWidth - sr, this.y + this.height);
        ctx.lineTo(this.x + sl, this.y + this.height);
        ctx.closePath();
        ctx.fill();
    }
}






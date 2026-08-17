class HPBar extends Moveables {

    maxHP = 100;
    currentHP = 100;
    maxWidth = 331;
    slantedRight = 5;
    slantedLeft = 5;

    constructor() {
        super();
        this.x = 145;
        this.y = 66.8;
        this.width = this.maxWidth;
        this.height = 25;
    }


    setHP(currentHP, maxHP) {
        this.currentHP = currentHP;
        this.maxHP = maxHP || this.maxHP;
    }


    getColor() {
        let percent = this.currentHP / this.maxHP;
        if (percent > 0.5) return '#00cc00';
        if (percent > 0.25) return '#cccc00';
        if (percent < 0.15) return '#cc0000';
    }


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






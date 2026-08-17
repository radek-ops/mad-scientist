class StatusBar extends Moveables {
    PRO_BAR = [];



    constructor() {
        super();
        this.addProBar();
        this.x = 40;
        this.y = 50;
        this.width = 450;
        this.height = 125;
        this.loadImages(this.PRO_BAR[0]);

    }


    addProBar() {
        for (let i = 0; i < 1; i++) {
            this.PRO_BAR.push('./img/PNG/User_Interfaces/ProfileBar.png');
        }
    }

}


















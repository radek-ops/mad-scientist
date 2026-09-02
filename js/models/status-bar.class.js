class StatusBar extends Moveables {
    PRO_BAR = [];

    /**
     * Creates the status bar that shows the collected bombs and potions at the top left.
     */
    constructor() {
        super();
        this.addProBar();
        this.x = 40;
        this.y = 50;
        this.width = 350;
        this.height = 100;
        this.loadImages(this.PRO_BAR[0]);
    }

    /**
     * Loads the profile bar image used for the status bar.
     */
    addProBar() {
        for (let i = 0; i < 1; i++) {
            this.PRO_BAR.push('./img/PNG/User_Interfaces/ProfileBar.png');
        }
    }

}
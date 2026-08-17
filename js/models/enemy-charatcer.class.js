class Enemy extends movableCharacters {
    x = 550 + Math.random() * 500;
    y = 275 + Math.random() * 60;
    width = 375;
    height = 375;


    constructor() {
        super();
        this.loadImages('./img/PNG/Enemy Characters/Enemy Character01/Idle/Idle_00.png');
       
    }

    moveLeft() {

    }
    moveRight() {

    }
}

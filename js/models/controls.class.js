class Controls {
    up = false;
    back = false;
    down = false;
    forward = false;
    space = false;
    usePotion = false;
    mouseClickLeft = false;
    mouseClickRight = false;


    /**
     * Sets up all keyboard and mouse events.
     */
    constructor() {

        window.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        });

        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                window.location.href = './controls-game.html';
                return;
            }
            (event.key === 'w') ? this.up = true : false;
            (event.key === 'a') ? this.back = true : false;
            (event.key === 's') ? this.down = true : false;
            (event.key === 'd') ? this.forward = true : false;
        });

        window.addEventListener('keyup', (event) => {
            (event.key === 'w') ? this.up = false : false;
            (event.key === 'a') ? this.back = false : false;
            (event.key === 's') ? this.down = false : false;
            (event.key === 'd') ? this.forward = false : false;
        });


        window.addEventListener('mousedown', (event) => {
            (event.button === 0) ? this.mouseClickLeft = true : false;
            (event.button === 2) ? this.mouseClickRight = true : false;
        });

        window.addEventListener('mouseup', (event) => {
            (event.button === 0) ? this.mouseClickLeft = false : false;
            (event.button === 2) ? this.mouseClickRight = false : false;
        });
        window.addEventListener('keydown', (event) => {
            if (event.repeat) return;
            if (event.key === 'r') {
                this.usePotion = true;
            }
            (event.code === 'Space') ? this.space = true : false;
        });

        window.addEventListener('keyup', (event) => {
            (event.code === 'Space') ? this.space = false : false;
        });


    }






}

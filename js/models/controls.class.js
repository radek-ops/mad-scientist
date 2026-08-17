class Controls {
    up = false;
    back = false;
    down = false;
    foward = false;
    
    space = false;

    mouseClickLeft = false;
    mouseClickRight = false;


    constructor() {

        window.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        });

        window.addEventListener('keydown', (event) => {
            (event.key === 'w') ? this.up = true : false;
            (event.key === 'a') ? this.back = true : false;
            (event.key === 's') ? this.down = true : false;
            (event.key === 'd') ? this.foward = true : false;
        });

        window.addEventListener('keyup', (event) => {
            (event.key === 'w') ? this.up = false : false;
            (event.key === 'a') ? this.back = false : false;
            (event.key === 's') ? this.down = false : false;
            (event.key === 'd') ? this.foward = false : false;
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
            (event.code === 'Space') ? this.space = true : false;
        });

         window.addEventListener('keyup', (event) => {
            (event.code === 'Space') ? this.space = false : false;
        });


    }

 
 



}

class Controls {
    up = false;
    back = false;
    down = false;
    foward = false;
    backward = false;
    mouseClickLeft = false;
    mouseClickRight = false;
    mainCharacter;




    constructor() {
        window.addEventListener('keydown', (event) => {
            (event.key === 'w') ? this.mainCharacter.up = true : false;
            (event.key === 'a') ? this.mainCharacter.back = true : false;
            (event.key === 's') ? this.mainCharacter.down = true : false;
            (event.key === 'd') ? this.mainCharacter.foward = true : false;
        });

        window.addEventListener('keyup', (event) => {
            (event.key === 'w') ? this.mainCharacter.up = false : false;
            (event.key === 'a') ? this.mainCharacter.back = false : false;
            (event.key === 's') ? this.mainCharacter.down = false : false;
            (event.key === 'd') ? this.mainCharacter.foward = false : false;
        });


        window.addEventListener('mousedown', (event) => {
            (event.button === 0) ? this.mainCharacter.mouseClickLeft = true : false;
            (event.button === 2) ? this.mainCharacter.mouseClickRight = true : false;
        });

        window.addEventListener('mouseup', (event) => {
            (event.button === 0) ? this.mainCharacter.mouseClickLeft = false : false;
            (event.button === 2) ? this.mainCharacter.mouseClickRight = false : false;
        });

    }

}

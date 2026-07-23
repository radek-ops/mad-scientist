class Controls {
    up = false; // W-Taste
    back = false; // A-Taste
    down = false; // S-Taste
    foward = false; // D-Taste
    
    space = false; // Leertaste (Springen)

    mouseClickLeft = false; // Linksklick (Schießen)
    mouseClickRight = false; // Rechtsklick (Bombe)


    constructor() {
        // Rechtsklick-Menü unterdrücken
        window.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        });

        // Tasten gedrückt ⇒ true
        window.addEventListener('keydown', (event) => {
            (event.key === 'w') ? this.up = true : false;
            (event.key === 'a') ? this.back = true : false;
            (event.key === 's') ? this.down = true : false;
            (event.key === 'd') ? this.foward = true : false;
        });

        // Tasten losgelassen ⇒ false
        window.addEventListener('keyup', (event) => {
            (event.key === 'w') ? this.up = false : false;
            (event.key === 'a') ? this.back = false : false;
            (event.key === 's') ? this.down = false : false;
            (event.key === 'd') ? this.foward = false : false;
        });


        // Maus gedrückt ⇒ true
        window.addEventListener('mousedown', (event) => {
            (event.button === 0) ? this.mouseClickLeft = true : false;
            (event.button === 2) ? this.mouseClickRight = true : false;
        });

        // Maus losgelassen ⇒ false
        window.addEventListener('mouseup', (event) => {
            (event.button === 0) ? this.mouseClickLeft = false : false;
            (event.button === 2) ? this.mouseClickRight = false : false;
        });
        // Space-Taste gedrückt ⇒ true
        window.addEventListener('keydown', (event) => {
            (event.code === 'Space') ? this.space = true : false;
        });

         // Space-Taste losgelassen ⇒ false
         window.addEventListener('keyup', (event) => {
            (event.code === 'Space') ? this.space = false : false;
        });


    }





}

class Controls {
    up = false;
    back = false;
    down = false;
    forward = false;
    space = false;
    usePotion = false;
    mouseClickLeft = false;
    mouseClickRight = false;
    isPaused = false;


    /**
     * Sets up all keyboard and mouse listeners that set the control flags.
     */
    constructor() {

        window.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        });

        window.addEventListener('keydown', (event) => {

            if (event.key === 'Escape') {
                this.isPaused = !this.isPaused;
                window.location.href = './controls-game.html';
                return;
            }else  {
               this.isPaused = false;

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

        this.setupTouchControls();
    }


    /**
     * Sets up the on-screen touch controls for mobile and tablet.
     */
    setupTouchControls() {
        let bind = (id, onStart, onEnd) => {
            let btn = document.getElementById(id);
            if (!btn) {
                return;
            }
            btn.addEventListener('touchstart', (event) => {
                event.preventDefault();
                onStart();
            }, { passive: false });
            btn.addEventListener('touchend', (event) => {
                event.preventDefault();
                onEnd();
            }, { passive: false });
            btn.addEventListener('touchcancel', (event) => {
                onEnd();
            });
            btn.addEventListener('mousedown', (event) => {
                event.preventDefault();
                event.stopPropagation();
                onStart();
            });
            btn.addEventListener('mouseup', (event) => {
                onEnd();
            });
            btn.addEventListener('mouseleave', (event) => {
                onEnd();
            });
        };

        bind('btn-up', () => { this.up = true; }, () => { this.up = false; });
        bind('btn-down', () => { this.down = true; }, () => { this.down = false; });
        bind('btn-left', () => { this.back = true; }, () => { this.back = false; });
        bind('btn-right', () => { this.forward = true; }, () => { this.forward = false; });
        bind('btn-jump', () => { this.space = true; }, () => { this.space = false; });
        bind('btn-shoot', () => { this.mouseClickLeft = true; }, () => { this.mouseClickLeft = false; });
        bind('btn-bomb', () => { this.mouseClickRight = true; }, () => { this.mouseClickRight = false; });

        let potionBtn = document.getElementById('btn-potion');
        if (potionBtn) {
            potionBtn.addEventListener('touchstart', (event) => {
                event.preventDefault();
                this.usePotion = true;
            }, { passive: false });
            potionBtn.addEventListener('mousedown', (event) => {
                event.preventDefault();
                event.stopPropagation();
                this.usePotion = true;
            });
        }
    }

}

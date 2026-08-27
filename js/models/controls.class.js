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
        this.setupContextMenu();
        this.setupMovementKeys();
        this.setupActionKeys();
        this.setupMouseInput();
        this.setupBlurReset();
        this.setupTouchControls();
    }

    /**
     * Prevents the context menu inside the game and starts a bomb throw.
     */
    setupContextMenu() {
        window.addEventListener('contextmenu', (event) => {
            if (event.target && event.target.closest && event.target.closest('#game-overlay')) {
                event.preventDefault();
                this.mouseClickRight = true;
            }
        });
    }

    /**
     * Sets up the movement and pause keyboard listeners.
     */
    setupMovementKeys() {
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.togglePause();
                return
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
    }

    /**
     * Sets up the action keyboard listeners (jump and potion).
     */
    setupActionKeys() {
        window.addEventListener('keydown', (event) => {
            if (event.repeat) return;
            if (event.key === 'r') {
                this.usePotion = true;
            }
            if (event.code === 'Space') {
                event.preventDefault();
                this.space = true;
            }
        });
        window.addEventListener('keyup', (event) => {
            (event.code === 'Space') ? this.space = false : false;
        });
    }

    /**
     * Sets up the mouse and pointer listeners for shooting.
     */
    setupMouseInput() {
        window.addEventListener('pointerdown', (event) => {
            if (event.target && event.target.closest && event.target.closest('.touch-btn')) {
                return;
            }
            (event.button === 0) ? this.mouseClickLeft = true : false;
        });
        window.addEventListener('pointerup', (event) => {
            (event.button === 0) ? this.mouseClickLeft = false : false;
            (event.button === 2) ? this.mouseClickRight = false : false;
        });
        window.addEventListener('pointercancel', () => {
            this.mouseClickLeft = false;
            this.mouseClickRight = false;
        });
        document.documentElement.addEventListener('mouseleave', () => {
            this.mouseClickLeft = false;
            this.mouseClickRight = false;
        });
    }

    /**
     * Resets all control flags when the window loses focus.
     */
    setupBlurReset() {
        window.addEventListener('blur', () => {
            this.up = false;
            this.back = false;
            this.down = false;
            this.forward = false;
            this.space = false;
            this.usePotion = false;
            this.mouseClickLeft = false;
            this.mouseClickRight = false;
        });
    }

    /**
     * Toggles the pause state and shows/hides the controls menu.
     */
    togglePause() {
        this.isPaused = !this.isPaused;
        const overlay = document.getElementById('controls-overlay');
        if (overlay) {
            overlay.hidden = !this.isPaused;
            document.getElementById('btnBackToGame').hidden = !this.isPaused;
            document.getElementById('btnExitGame').hidden = !this.isPaused;
            document.getElementById('btnTryAgain').hidden = !this.isPaused;
            document.getElementById('controls-back').hidden = this.isPaused;
        }
    }


    /**
     * Sets up the on-screen touch controls for mobile and tablet.
     */
    setupTouchControls() {
        this.setupDpadButtons();
        this.setupActionButtons();
        this.setupPotionButton();
        this.setupGearButtons();
    }

    /**
     * Binds the touch and mouse events of one button.
     * @param {string} id - The button id
     * @param {Function} onStart - Called when the button is pressed
     * @param {Function} onEnd - Called when the button is released
     */
    bindTouchButton(id, onStart, onEnd) {
        let btn = document.getElementById(id);
        if (!btn) {
            return;
        }
        this.addTouchButtonEvents(btn, onStart, onEnd);
        this.addMouseButtonEvents(btn, onStart, onEnd);
    }

    /**
     * Adds the touch listeners of one button.
     */
    addTouchButtonEvents(btn, onStart, onEnd) {
        btn.addEventListener('touchstart', (event) => {
            if (event.cancelable) {
                event.preventDefault();
            }
            onStart();
        }, { passive: false });
        btn.addEventListener('touchend', (event) => {
            if (event.cancelable) {
                event.preventDefault();
            }
            onEnd();
        }, { passive: false });
        btn.addEventListener('touchcancel', (event) => {
            onEnd();
        });
    }

    /**
     * Adds the mouse listeners of one button.
     */
    addMouseButtonEvents(btn, onStart, onEnd) {
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
    }

    /**
     * Binds the four movement buttons.
     */
    setupDpadButtons() {
        this.bindTouchButton('btn-up', () => { this.up = true; }, () => { this.up = false; });
        this.bindTouchButton('btn-down', () => { this.down = true; }, () => { this.down = false; });
        this.bindTouchButton('btn-left', () => { this.back = true; }, () => { this.back = false; });
        this.bindTouchButton('btn-right', () => { this.forward = true; }, () => { this.forward = false; });
    }

    /**
     * Binds the jump, shoot and bomb buttons.
     */
    setupActionButtons() {
        this.bindTouchButton('btn-jump', () => { this.space = true; }, () => { this.space = false; });
        this.bindTouchButton('btn-shoot', () => { this.mouseClickLeft = true; }, () => { this.mouseClickLeft = false; });
        this.bindTouchButton('btn-bomb', () => { this.mouseClickRight = true; }, () => { this.mouseClickRight = false; });
    }

    /**
     * Sets up the potion button.
     */
    setupPotionButton() {
        let potionBtn = document.getElementById('btn-potion');
        if (potionBtn) {
            potionBtn.addEventListener('touchstart', (event) => {
                if (event.cancelable) {
                    event.preventDefault();
                }
                this.usePotion = true;
            }, { passive: false });
            potionBtn.addEventListener('mousedown', (event) => {
                event.preventDefault();
                event.stopPropagation();
                this.usePotion = true;
            });
        }
    }

    /**
     * Sets up the gear buttons (touch and desktop).
     */
    setupGearButtons() {
        let gearBtn = document.getElementById('btn-gear');
        if (gearBtn) {
            gearBtn.addEventListener('click', () => {
                this.togglePause();
            });
        }
        let gearDesktopBtn = document.getElementById('btn-gear-desktop');
        if (gearDesktopBtn) {
            gearDesktopBtn.addEventListener('click', () => {
                this.togglePause();
            });
        }
    }

}

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
     * Prevents the browser context menu inside the game.
     */
    setupContextMenu() {
        window.addEventListener('contextmenu', (event) => {
            if (event.target && event.target.closest && event.target.closest('#game-overlay')) {
                event.preventDefault();
            }
        });
    }

    /**
     * Sets up the movement and pause keyboard listeners.
     */
    setupMovementKeys() {
        window.addEventListener('keydown', (event) => this.onMovementKeyDown(event));
        window.addEventListener('keyup', (event) => this.onMovementKeyUp(event));
    }

    /**
     * Handles the movement and pause keydown events.
     * @param {KeyboardEvent} event - The key event
     */
    onMovementKeyDown(event) {
        if (event.key === 'Escape') {
            this.togglePause();
            return;
        }
        if (event.code === 'KeyW') this.up = true;
        if (event.code === 'KeyA') this.back = true;
        if (event.code === 'KeyS') this.down = true;
        if (event.code === 'KeyD') this.forward = true;
    }

    /**
     * Handles the movement keyup events.
     * @param {KeyboardEvent} event - The key event
     */
    onMovementKeyUp(event) {
        if (event.code === 'KeyW') this.up = false;
        if (event.code === 'KeyA') this.back = false;
        if (event.code === 'KeyS') this.down = false;
        if (event.code === 'KeyD') this.forward = false;
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
        window.addEventListener('pointerdown', (event) => this.onPointerDown(event));
        window.addEventListener('pointerup', (event) => this.onPointerUp(event));
        window.addEventListener('pointercancel', () => this.resetMouseButtons());
        document.documentElement.addEventListener('mouseleave', () => this.resetMouseButtons());
    }

    /**
     * Starts shooting or throwing a bomb when a mouse button is pressed.
     * @param {PointerEvent} event - The pointer event
     */
    onPointerDown(event) {
        if (event.target && event.target.closest && event.target.closest('.touch-btn')) {
            return;
        }
        if (event.button === 0) this.mouseClickLeft = true;
        if (event.button === 2) this.mouseClickRight = true;
    }

    /**
     * Stops shooting when the mouse button is released.
     * @param {PointerEvent} event - The pointer event
     */
    onPointerUp(event) {
        (event.button === 0) ? this.mouseClickLeft = false : false;
        (event.button === 2) ? this.mouseClickRight = false : false;
    }

    /**
     * Resets both mouse button flags.
     */
    resetMouseButtons() {
        this.mouseClickLeft = false;
        this.mouseClickRight = false;
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
        this.addButtonPointerEvents(btn, onStart, onEnd);
    }

    /**
     * Adds pointer listeners (mouse and touch) of one button.
     * Pointer events avoid the double firing of touch + synthetic mouse events.
     */
    addButtonPointerEvents(btn, onStart, onEnd) {
        btn.addEventListener('pointerdown', (event) => this.onButtonPointerDown(event, onStart));
        btn.addEventListener('pointerup', () => onEnd());
        btn.addEventListener('pointercancel', () => onEnd());
        btn.addEventListener('pointerleave', () => onEnd());
    }

    /**
     * Starts the button action on a left press.
     * @param {PointerEvent} event - The pointer event
     * @param {Function} onStart - Called when the button is pressed
     */
    onButtonPointerDown(event, onStart) {
        if (event.button !== 0) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        onStart();
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
            potionBtn.addEventListener('pointerdown', (event) => {
                if (event.button !== 0) {
                    return;
                }
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


/**
 * Waits for the DOM to fully load, then initializes references 
 * to all main menu buttons, game buttons, and UI overlays.
 */
document.addEventListener('DOMContentLoaded', () => {
    const startGameButton = document.getElementById('start-btn');
    const gameOverlay = document.getElementById('game-overlay');
    const controlsButton = document.getElementById('controls-btn');
    const overlayControls = document.getElementById('controls-overlay');
    const descriptionButton = document.getElementById('description-btn');
    const overlayDescription = document.getElementById('description-overlay');
    const impressumButton = document.getElementById('impressum-btn');
    const overlayImpressum = document.getElementById('overlay-impressum');
    const controlsBackButton = document.getElementById('controls-back');
    const descriptionBackButton = document.getElementById('description-back');
    const impressumBackButton = document.getElementById('impressum-back');
    let tryAgain = document.getElementById('btnTryAgain');
    let backToGame = document.getElementById('btnBackToGame');
    const exitGame = document.getElementById('btnExitGame');

    /**
     * Resets the controls overlay to its default "info" mode:
     * only the "Back" button is visible.
     */
    function resetControlsToInfoMode() {
        document.getElementById('controls-back').hidden = false;
        document.getElementById('btnTryAgain').hidden = true;
        document.getElementById('btnBackToGame').hidden = true;
        document.getElementById('btnExitGame').hidden = true;
    }

    /**
 * Event listener for the "Exit Game" button.
 * Hides all active overlays, stops the game loop, unpauses controls, 
 * and resets the control mode back to default.
 */
    exitGame.addEventListener("click", () => {
        document.getElementById('controls-overlay').hidden = true;
        gameOverlay.hidden = true;
        overlayImpressum.hidden = true;
        overlayDescription.hidden = true;
        if (world) {
            world.isRunning = false;
            if (world.controls) {
                world.controls.isPaused = false;
            }
            if (world.sound) {
                world.sound.stopAll();
            }
        }
        resetControlsToInfoMode();
    });

   /**
 * Event listener for the "Try Again" button on the Game Over screen.
 * Hides the game over overlay, shows the main game overlay, and restarts the game.
 */
const gameOverTryAgain = document.getElementById('btnGameOverTryAgain');
gameOverTryAgain.addEventListener("click", () => {
    document.getElementById('gameOverOverlay').classList.remove('show');
    gameOverlay.hidden = false;
    if (gameOverlay) {
        init();
    }
});

/**
 * Event listener for the "Exit Game" button on the Game Over screen.
 * Hides the game over overlay, hides the game container, and stops the game loop.
 */
const gameOverExitGame = document.getElementById('btnGameOverExitGame');
gameOverExitGame.addEventListener("click", () => {
    document.getElementById('gameOverOverlay').classList.remove('show');
    gameOverlay.hidden = true;
    if (world) {
        world.isRunning = false;
        if (world.sound) {
            world.sound.stopAll();
        }
    }
});

/**
 * Event listener for the "Exit Game" button on the Win screen.
 * Hides the win overlay, hides the game container, and stops the game loop.
 */
const winExitGame = document.getElementById('btnWinExitGame');
winExitGame.addEventListener("click", () => {
    document.getElementById('winOverlay').classList.remove('show');
    gameOverlay.hidden = true;
    if (world) {
        world.isRunning = false;
        if (world.sound) {
            world.sound.stopAll();
        }
    }
});

/**
 * Event listener for the main "Start Game" button.
 * Displays the game overlay and initializes the game.
 */
startGameButton.addEventListener('click', () => {
    gameOverlay.hidden = false;
    if (gameOverlay) {
        init();
    }
});

/**
 * Event listener for the "Controls" menu button.
 * Resets the controls display and shows the controls overlay.
 */
controlsButton.addEventListener('click', () => {
    resetControlsToInfoMode();
    overlayControls.hidden = false;
});

/**
 * Event listener for the back button inside the controls overlay.
 * Hides the controls overlay and resets the controls mode.
 */
controlsBackButton.addEventListener('click', () => {
    overlayControls.hidden = true;
    resetControlsToInfoMode();
});

/**
 * Event listener for the "Description" menu button.
 * Shows the game description overlay.
 */
descriptionButton.addEventListener('click', () => {
    overlayDescription.hidden = false;
});

/**
 * Event listener for the back button inside the description overlay.
 * Hides the game description overlay.
 */
descriptionBackButton.addEventListener('click', () => {
    overlayDescription.hidden = true;
});

/**
 * Event listener for the "Impressum" (legal info) menu button.
 * Shows the impressum overlay.
 */
impressumButton.addEventListener('click', () => {
    overlayImpressum.hidden = false;
});

/**
 * Event listener for the back button inside the impressum overlay.
 * Hides the impressum overlay.
 */
impressumBackButton.addEventListener('click', () => {
    overlayImpressum.hidden = true;
});

/**
 * Event listener for a secondary "Try Again" button (found in the controls menu).
 * Hides the controls overlay, resets controls, and restarts the game.
 */
tryAgain.addEventListener("click", () => {
    document.getElementById('controls-overlay').hidden = true;
    resetControlsToInfoMode();
    gameOverlay.hidden = false;
    if (gameOverlay) {
        init();
    }
});

/**
 * Event listener for the "Back to Game" button.
 * Hides the controls overlay, resets controls, and unpauses the ongoing game.
 */
backToGame.addEventListener("click", () => {
    document.getElementById('controls-overlay').hidden = true;
    resetControlsToInfoMode();
    gameOverlay.hidden = false;
    if (world && world.controls) {
        world.controls.isPaused = false;
    }
});

});

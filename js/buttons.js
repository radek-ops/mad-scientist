/**
 * Global button and overlay references, filled once the DOM is ready.
 */
let startGameButton;
let gameOverlay;
let controlsButton;
let overlayControls;
let descriptionButton;
let overlayDescription;
let impressumButton;
let overlayImpressum;
let controlsBackButton;
let descriptionBackButton;
let impressumBackButton;
let tryAgain;
let backToGame;
let exitGame;


/**
 * Waits for the DOM to fully load, then initializes references
 * and wires up all buttons.
 */
document.addEventListener('DOMContentLoaded', initButtons);

/**
 * Stores the element references and registers all event listeners.
 */
function initButtons() {
    cacheElements();
    setupMenuButtons();
    setupGameOverButtons();
    setupWinButtons();
    setupControlsButtons();
}

/**
 * Stores the references to all buttons and overlays.
 */
function cacheElements() {
    startGameButton = document.getElementById('start-btn');
    gameOverlay = document.getElementById('game-overlay');
    controlsButton = document.getElementById('controls-btn');
    overlayControls = document.getElementById('controls-overlay');
    descriptionButton = document.getElementById('description-btn');
    overlayDescription = document.getElementById('description-overlay');
    impressumButton = document.getElementById('impressum-btn');
    overlayImpressum = document.getElementById('overlay-impressum');
    controlsBackButton = document.getElementById('controls-back');
    descriptionBackButton = document.getElementById('description-back');
    impressumBackButton = document.getElementById('impressum-back');
    tryAgain = document.getElementById('btnTryAgain');
    backToGame = document.getElementById('btnBackToGame');
    exitGame = document.getElementById('btnExitGame');
}

/**
 * Registers the listeners for the main menu buttons.
 */
function setupMenuButtons() {
    startGameButton.addEventListener('click', startGame);
    controlsButton.addEventListener('click', openControls);
    descriptionButton.addEventListener('click', openDescription);
    impressumButton.addEventListener('click', openImpressum);
}

/**
 * Registers the listeners for the Game Over screen.
 */
function setupGameOverButtons() {
    document.getElementById('btnGameOverTryAgain').addEventListener('click', restartGame);
    document.getElementById('btnGameOverExitGame').addEventListener('click', exitGameFromGameOver);
}

/**
 * Registers the listeners for the Win screen.
 */
function setupWinButtons() {
    document.getElementById('btnWinExitGame').addEventListener('click', exitGameFromWin);
}

/**
 * Registers the listeners for the controls overlay.
 */
function setupControlsButtons() {
    controlsBackButton.addEventListener('click', closeControls);
    descriptionBackButton.addEventListener('click', closeDescription);
    impressumBackButton.addEventListener('click', closeImpressum);
    tryAgain.addEventListener('click', restartFromControls);
    backToGame.addEventListener('click', resumeGame);
    exitGame.addEventListener('click', exitToMenu);
}

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
 * Stops the game loop and all sounds.
 */
function stopWorld() {
    if (world) {
        world.isRunning = false;
        if (world.sound) {
            world.sound.stopAll();
        }
    }
}

/**
 * Starts the game and shows the game overlay.
 */
function startGame() {
    gameOverlay.hidden = false;
    if (gameOverlay) {
        init();
    }
}

/**
 * Restarts the game from the Game Over screen.
 */
function restartGame() {
    document.getElementById('gameOverOverlay').classList.remove('show');
    startGame();
}

/**
 * Restarts the game from the controls overlay.
 */
function restartFromControls() {
    overlayControls.hidden = true;
    resetControlsToInfoMode();
    startGame();
}

/**
 * Resumes the paused game from the controls overlay.
 */
function resumeGame() {
    overlayControls.hidden = true;
    resetControlsToInfoMode();
    gameOverlay.hidden = false;
    if (world && world.controls) {
        world.controls.isPaused = false;
    }
}

/**
 * Exits the game from the controls overlay back to the main menu.
 */
function exitToMenu() {
    overlayControls.hidden = true;
    gameOverlay.hidden = true;
    overlayImpressum.hidden = true;
    overlayDescription.hidden = true;
    if (world && world.controls) {
        world.controls.isPaused = false;
    }
    stopWorld();
    resetControlsToInfoMode();
}

/**
 * Exits the game from the Game Over screen.
 */
function exitGameFromGameOver() {
    document.getElementById('gameOverOverlay').classList.remove('show');
    gameOverlay.hidden = true;
    stopWorld();
}

/**
 * Exits the game from the Win screen.
 */
function exitGameFromWin() {
    document.getElementById('winOverlay').classList.remove('show');
    gameOverlay.hidden = true;
    stopWorld();
}

/**
 * Shows the controls overlay.
 */
function openControls() {
    resetControlsToInfoMode();
    overlayControls.hidden = false;
}

/**
 * Hides the controls overlay.
 */
function closeControls() {
    overlayControls.hidden = true;
    resetControlsToInfoMode();
}

/**
 * Shows the description overlay.
 */
function openDescription() {
    overlayDescription.hidden = false;
}

/**
 * Hides the description overlay.
 */
function closeDescription() {
    overlayDescription.hidden = true;
}

/**
 * Shows the impressum overlay.
 */
function openImpressum() {
    overlayImpressum.hidden = false;
}

/**
 * Hides the impressum overlay.
 */
function closeImpressum() {
    overlayImpressum.hidden = true;
}

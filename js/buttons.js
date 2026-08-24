

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

    exitGame.addEventListener("click", () => {
        document.getElementById('controls-overlay').hidden = true;
        gameOverlay.hidden = true;
    });

    const gameOverTryAgain = document.getElementById('btnGameOverTryAgain');
    gameOverTryAgain.addEventListener("click", () => {
        document.getElementById('gameOverOverlay').classList.remove('show');
        gameOverlay.hidden = false;
        if (gameOverlay) {
            init();
        }
    });

    const gameOverExitGame = document.getElementById('btnGameOverExitGame');
    gameOverExitGame.addEventListener("click", () => {
        document.getElementById('gameOverOverlay').classList.remove('show');
        gameOverlay.hidden = true;
        if (world) {
            world.isRunning = false;
        }
    });

    const winExitGame = document.getElementById('btnWinExitGame');
    winExitGame.addEventListener("click", () => {
        document.getElementById('winOverlay').classList.remove('show');
        gameOverlay.hidden = true;
        if (world) {
            world.isRunning = false;
        }
    });

    startGameButton.addEventListener('click', () => {
        gameOverlay.hidden = false;
        if (gameOverlay) {
            init();
        } 
        });
    controlsButton.addEventListener('click', () => {
        overlayControls.hidden = false;
    });
    controlsBackButton.addEventListener('click', () => {
        overlayControls.hidden = true;
    });
    descriptionButton.addEventListener('click', () => {
        overlayDescription.hidden = false;
    });
    descriptionBackButton.addEventListener('click', () => {
        overlayDescription.hidden = true;
    });
    impressumButton.addEventListener('click', () => {
        overlayImpressum.hidden = false;
    });
    impressumBackButton.addEventListener('click', () => {
        overlayImpressum.hidden = true;
    });

    
    tryAgain.addEventListener("click", () => {
        document.getElementById('controls-overlay').hidden = true;
        gameOverlay.hidden = false;
        if (gameOverlay) {
            init();
        } 

}); 


  backToGame.addEventListener("click", () => {
        document.getElementById('controls-overlay').hidden = true;
        gameOverlay.hidden = false;
        if (world && world.controls) {
            world.controls.isPaused = false;
        }
        

});


});




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


     startGameButton.addEventListener('click', () => {
       gameOverlay.hidden = false;
       if(gameOverlay){
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





});

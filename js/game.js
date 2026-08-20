let canvas;
let world;





/**
 * Starts the game by creating the World.
 * This function is called when the page loads.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);
}

document.getElementById('btnTryAgain').addEventListener('click', () => {
    document.getElementById('DEIN_DIV_KASTEN_ID').style.display = 'none';


    init();
});

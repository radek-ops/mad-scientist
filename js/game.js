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
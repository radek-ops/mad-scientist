let canvas;
let world;

/**
 * Starts the game by creating the World.
 * This function is called when the page loads.
 */
function init() {
    canvas = document.getElementById('canvas');
    if (world) {
        world.isRunning = false;
        if (world.sound) {
            world.sound.stopAll();
        }
    }
    world = new World(canvas);
}
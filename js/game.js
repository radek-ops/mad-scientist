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





// Wenn man auf "Spiel starten" klickt:
document.getElementById('btnStartGame').addEventListener('click', () => {
    document.getElementById('ansicht-start').style.display = 'none'; // Startseite ausblenden
    document.getElementById('ansicht-spiel').style.display = 'block'; // Spiel anzeigen
    init(); // Dein Spiel startet frisch!
});

// Wenn man im Spiel "Try Again" klickt:
document.getElementById('btnTryAgain').addEventListener('click', () => {
    document.getElementById('ansicht-menue').style.display = 'none'; // Menü ausblenden
    init(); // Die Welt wird neu gezeichnet – komplett ohne Neuladen!
});

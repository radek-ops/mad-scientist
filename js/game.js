let canvas; // Canvas-Element
let world; // Welt-Objekt (Spiel-Logik)

// Startpunkt: wird beim Laden aufgerufen
function init() {
    canvas = document.getElementById('canvas'); // Canvas aus HTML holen
    world = new World(canvas); // Neue Welt mit Canvas erstellen
    
}

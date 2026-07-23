class Background extends Moveables {




  // Hintergrund-Bild erstellen
  constructor(bgImgPath, x) {
    super();
    this.loadImages(bgImgPath); // Bild laden
    this.x = x; // X-Position (1280er-Schritte)
    this.y = 0; // Oben starten
    this.width = 1280; // Volle Bildschirmbreite
    this.height = 720; // Volle Bildschirmhöhe

  }





}

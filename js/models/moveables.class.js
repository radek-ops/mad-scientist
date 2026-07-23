class Moveables {
    x; // X-Position
    y; // Y-Position
    img; // Aktuelles Bild
    width; // Breite
    height; // Höhe
    imageCache = {}; // Cache für alle geladenen Bilder


    // Einzelnes Bild laden
    loadImages(path) {
        this.img = new Image();
        this.img.src = path;
    }


    // Mehrere Bilder in den Cache laden
    saveImages(images) {
        images.forEach((imgPath) => {
            let img = new Image();
            img.src = imgPath;
            this.imageCache[imgPath] = img; // Pfad ⇒ Bild im Cache
        });
    }

}

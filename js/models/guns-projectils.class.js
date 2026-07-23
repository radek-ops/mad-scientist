class GunsProjectils extends Moveables {

    LASER = []; // Laser-Bildpfade
    width;
    height;
    controls;
    currentProjectileImages = 0; // Aktuelles Laser-Bild
//    mageCache = {};
    EMPTY_IMG = new Image(); // Leeres Bild (wenn nicht geschossen wird)
    direction = 1; // 1 = rechts, -1 = links

    constructor(controls) {
        super();
        this.controls = controls;
        this.x = -70; // Außerhalb des Bildschirms starten
        this.y = 240;
        this.img = this.EMPTY_IMG;
        this.width = 150;
        this.height = 100;
        this.addLaserGunImages(); // Laser-Pfade sammeln
        this.saveImages(this.LASER); // Laser-Bilder in Cache laden
        this.useProjectil(); // Animation starten
    }

    // Laser-Bildpfade erstellen (00-04)
    addLaserGunImages() {
        for (let i = 0; i < 5; i++) {
            let imgNumber = '0' + i;
            this.LASER.push(`./img/PNG/Projectile/Laser/skeleton-animation_${imgNumber}.png`);
        }
    }

    // Animations-Loop starten (60fps)
    useProjectil() {
        setInterval(() => {
            this.projectilAnimate();
        }, 1000 / 60);
    }

    // Laser-Animation: Bild wechseln während Linksklick
    projectilAnimate() {
        if (this.controls.mouseClickLeft) { // Nur beim Schießen
            this.currentProjectileImages++;
            if (this.currentProjectileImages >= this.LASER.length) {
                this.currentProjectileImages = 0; // Zurück zum ersten Bild
            }
            let imgPath = this.LASER[this.currentProjectileImages];
            this.img = this.imageCache[imgPath]; // Nächstes Laser-Bild
        } else { // Nicht schießen ⇒ leeres Bild (unsichtbar)
            this.currentProjectileImages = 0;
            this.img = this.EMPTY_IMG;
        }
    }
}

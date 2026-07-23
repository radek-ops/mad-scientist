class Enemy extends Moveables {
    IMAGES_IDLE = []; // Stillstand-Bilder
    IMAGES_WALK = []; // Lauf-Bilder
    IMAGES_DEATH = []; // Tod-Bilder
    IMAGES_HIT = []; // Angriff-Bilder
    IMAGES_ELECTRIC = []; // Elektro-Schock-Bilder (vor Tod)
    frameCounter = 0;
    currentImage = 0; // Aktuelles Bild im Loop
    isDead = false; // Tot?
    deathAnimationIndex = 0; // Fortschritt Tod-Animation
    deathInterval; // Timer Tod
    isAttacking = false; // Greift grade an?
    hitAnimationIndex = 0; // Fortschritt Angriff
    hitInterval; // Timer Angriff
    isElectric = false; // Bekommt Elektroschock?
    electricAnimationIndex = 0; // Fortschritt Elektro
    electricInterval; // Timer Elektro

    constructor() {
        super();
        this.width = 375;
        this.height = 375;
        this.addAllImages(); // Alle Bilder laden
        this.img = this.imageCache[this.IMAGES_IDLE[0]]; // Erstes Idle-Bild
        this.startIdleAnimate(); // Idle-Loop starten
        this.startWalkAnimate(); // Lauf-Loop starten
    }

    // Alle Bild-Sets laden & cachen
    addAllImages() {
        this.addIdleEnemyImages();
        this.addDeathImages();
        this.addHitImages();
        this.addElectricImages();
        this.saveImages(this.IMAGES_IDLE);
        this.saveImages(this.IMAGES_WALK);
        this.saveImages(this.IMAGES_DEATH);
        this.saveImages(this.IMAGES_HIT);
        this.saveImages(this.IMAGES_ELECTRIC);
    }

    // Idle- und Lauf-Bildpfade (00-13)
    addIdleEnemyImages() {
        for (let i = 0; i <= 13; i++) {
            let number = i < 10 ? '0' + i : i;
            this.IMAGES_IDLE.push(`./img/PNG/Enemy_Characters/Enemy_Character01/Idle/Idle_${number}.png`);
            this.IMAGES_WALK.push(`./img/PNG/Enemy_Characters/Enemy_Character01/Walk/Walk_${number}.png`);
        }
    }

    // Tod-Bildpfade (00-23)
    addDeathImages() {
        for (let i = 0; i < 24; i++) {
            let number = i < 10 ? '0' + i : i;
            this.IMAGES_DEATH.push(`./img/PNG/Enemy_Characters/Enemy_Character01/Death/Death_${number}.png`);
        }
    }

    // Angriff-Bildpfade (00-13)
    addHitImages() {
        for (let i = 0; i <= 13; i++) {
            let number = i < 10 ? '0' + i : i;
            this.IMAGES_HIT.push(`./img/PNG/Enemy_Characters/Enemy_Character01/Hit/Hit_${number}.png`);
        }
    }

    // Elektro-Bildpfade (0-2)
    addElectricImages() {
        for (let i = 0; i < 3; i++) {
            this.IMAGES_ELECTRIC.push(`./img/PNG/Enemy_Characters/Enemy_Character01/Get Electric/Get Electric_${i}.png`);
        }
    }

    // Idle-Animation: Position setzen + Idle-Bilder loopen
    startIdleAnimate() {
        this.x = 550 + Math.random() * 500; // Zufällige X-Position
        this.y = 275 + Math.random() * 60; // Zufällige Y-Position
        setInterval(() => {
            if (this.isDead) return; // Tot ⇒ keine Idle-Animation
            if (this.isAttacking) return; // Greift an ⇒ keine Idle
            if (this.isElectric) return; // Elektro ⇒ keine Idle
            let path = this.IMAGES_IDLE[this.currentImage];
            this.img = this.imageCache[path];
            this.currentImage++;
            if (this.currentImage == this.IMAGES_IDLE.length) {
                this.currentImage = 0; // Loop
            }
        }, 60);
    }

    // Lauf-Animation: Bilder wechseln + Bewegung
    startWalkAnimate() {
        setInterval(() => {
            if (this.isDead) return;
            if (this.isAttacking) return;
            if (this.isElectric) return;
            let path = this.IMAGES_WALK[this.currentImage];
            this.img = this.imageCache[path];
            this.currentImage++;
            if (this.currentImage == this.IMAGES_WALK.length) {
                this.currentImage = 0; // Loop
            }
        }, 60);
        this.startMoveAnimate(); // Bewegung starten
    }

    // Bewegung: Gegner läuft nach links
    startMoveAnimate() {
        setInterval(() => {
            if (this.isDead) return;
            if (this.isAttacking) return;
            if (this.isElectric) return;
            this.x -= 1.5; // Nach links bewegen
        }, 1000 / 60);
    }

    // Gegner stirbt: erst Elektro-Animation, dann Tod
    die() {
        if (this.isDead) return; // Schon tot ⇒ ignorieren
        this.isElectric = true; // Elektro starten
        this.electricAnimationIndex = 0;
        if (this.electricInterval) clearInterval(this.electricInterval);
        this.electricInterval = setInterval(() => {
            if (this.electricAnimationIndex < this.IMAGES_ELECTRIC.length) {
                this.img = this.imageCache[this.IMAGES_ELECTRIC[this.electricAnimationIndex]];
                this.electricAnimationIndex++; // Nächstes Elektro-Bild
            } else { // Elektro fertig ⇒ Tod-Animation starten
                clearInterval(this.electricInterval);
                this.isElectric = false;
                this.startDeathAnimation();
            }
        }, 60);
    }

    // Tod-Animation abspielen
    startDeathAnimation() {
        this.isDead = true; // Endgültig tot
        this.deathAnimationIndex = 0;
        if (this.deathInterval) clearInterval(this.deathInterval);
        this.deathInterval = setInterval(() => {
            if (this.deathAnimationIndex < this.IMAGES_DEATH.length) {
                this.img = this.imageCache[this.IMAGES_DEATH[this.deathAnimationIndex]];
                this.deathAnimationIndex++; // Nächstes Tod-Bild
            } else { // Tod fertig ⇒ markieren zum Entfernen
                clearInterval(this.deathInterval);
                this.deathComplete = true; // Wird aus der Welt entfernt
            }
        }, 60);
    }

    // Angriff ausführen
    attack() {
        if (this.isDead) return; // Tote Gegner greifen nicht an
        this.isAttacking = true; // Angriff aktiv
        this.hitAnimationIndex = 0;
        if (this.hitInterval) clearInterval(this.hitInterval);
        this.hitInterval = setInterval(() => {
            if (this.hitAnimationIndex < this.IMAGES_HIT.length) {
                this.img = this.imageCache[this.IMAGES_HIT[this.hitAnimationIndex]];
                this.hitAnimationIndex++; // Nächstes Angriffs-Bild
            } else { // Angriff fertig
                clearInterval(this.hitInterval);
                this.isAttacking = false; // Wieder bereit
            }
        }, 60);
    }
}

class Character extends Moveables {

    IMAGES_IDLE = []; // Steh-Animation
    IMAGES_WALK = []; // Lauf-Animation
    IMAGES_SHOOTFX1 = []; // Schuss-Animation
    IMAGES_THROWBOMB = []; // Bombenwurf-Animation
    IMAGES_JUMP = []; // Sprung-Animation
    IMAGES_GETHIT = []; // Getroffen-Animation
    controls; // Steuerung
    currentThrowBombkImages = 0; // Fortschritt Bombenwurf
    currentShootFXImages = 0; // Fortschritt Schuss
    currentWalkImages = 0; // Fortschritt Laufen/Idle
    currentJumpImages = 0; // Fortschritt Sprung
    frameCounter = 0; // Zählt Frames für Timing
    speedY = 0; // Vertikale Geschwindigkeit (Sprung)
    acceleration = 1; // Fall-Beschleunigung
    direction = 1; // Blickrichtung: 1=rechts, -1=links
    isHit = false; // Wird grade getroffen?
    hitAnimationIndex = 0; // Fortschritt Getroffen-Animation
    hitInterval; // Timer für Getroffen-Animation

    constructor(controls) {
        super();
        this.controls = controls;
        this.x = 0; // Startposition links
        this.y = 240;
        this.jumpY = 240; // Boden-Höhe (für Sprung)
        this.width = 475;
        this.height = 475;
        this.loadAllImages(); // Alle Bilder laden
        this.moveCharacter(); // Bewegungs-Loop starten
        this.applyGravity(); // Schwerkraft starten
    }

    // Alle Bild-Sets laden & cachen
    loadAllImages() {
        this.addMoveImages();
        this.addShootFXImages();
        this.addThrowBombImages();
        this.addJumpImages();
        this.addGetHitImages();
        this.saveImages(this.IMAGES_IDLE);
        this.saveImages(this.IMAGES_WALK);
        this.saveImages(this.IMAGES_SHOOTFX1);
        this.saveImages(this.IMAGES_THROWBOMB);
        this.saveImages(this.IMAGES_JUMP);
        this.saveImages(this.IMAGES_GETHIT);
        this.img = this.imageCache[this.IMAGES_IDLE[0]]; // Erstes Idle-Bild
    }

    // Lauf- und Idle-Bildpfade (00-13)
    addMoveImages() {
        for (let i = 0; i < 14; i++) {
            let imgNumber = i < 10 ? '0' + i : i;
            this.IMAGES_IDLE.push(`./img/PNG/Main_Characters/Gun01/Idle/Idle_${imgNumber}.png`);
            this.IMAGES_WALK.push(`./img/PNG/Main_Characters/Gun01/Walk/Walk_${imgNumber}.png`);
        }
    }

    // Schuss-Bildpfade (00-03)
    addShootFXImages() {
        for (let i = 0; i < 4; i++) {
            let imgNumber = '0' + i;
            this.IMAGES_SHOOTFX1.push(`./img/PNG/Main_Characters/Gun01/ShootFX1/ShootFX1_${imgNumber}.png`);
        }
    }

    // Bombenwurf-Bildpfade (00-19)
    addThrowBombImages() {
        for (let i = 0; i < 20; i++) {
            let imgNumber = i < 10 ? '0' + i : i;
            this.IMAGES_THROWBOMB.push(`./img/PNG/Main_Characters/Gun01/ThrowBomb/ThrowBomb_${imgNumber}.png`);
        }
    }

    // Sprung-Bildpfade (00-08)
    addJumpImages() {
        for (let i = 0; i < 9; i++) {
            let imgNumber = '0' + i;
            this.IMAGES_JUMP.push(`./img/PNG/Main_Characters/Gun01/Jump/Jump_${imgNumber}.png`);
        }
    }

    // Getroffen-Bildpfade (00-09)
    addGetHitImages() {
        for (let i = 0; i < 10; i++) {
            let imgNumber = i < 10 ? '0' + i : i;
            this.IMAGES_GETHIT.push(`./img/PNG/Main_Characters/Gun01/GetHit/GetHit_${imgNumber}.png`);
        }
    }

    // Wird getroffen ⇒ Getroffen-Animation abspielen
    getHit() {
        if (this.isHit) return; // Schon getroffen ⇒ ignorieren
        this.isHit = true; // Flag setzen (keine neuen Treffer)
        this.hitAnimationIndex = 0; // Animation zurücksetzen
        if (this.hitInterval) clearInterval(this.hitInterval);
        this.hitInterval = setInterval(() => {
            if (this.hitAnimationIndex < this.IMAGES_GETHIT.length) {
                this.img = this.imageCache[this.IMAGES_GETHIT[this.hitAnimationIndex]];
                this.hitAnimationIndex++; // Nächstes Bild
            } else {
                clearInterval(this.hitInterval); // Animation zu Ende
                this.isHit = false; // Wieder bereit für Treffer
            }
        }, 60); // Alle 60ms
    }

    // Haupt-Loop: Bewegung + Animation (60fps)
    moveCharacter() {
        setInterval(() => {
            this.movement();
            this.animate();
        }, 1000 / 60);
    }

    // Tasteneingaben ⇒ Position ändern
    movement() {
        if (this.controls.up && this.y > 190) {
            this.y -= 10; // Nach oben
        }
        if (this.controls.down && this.y < 270) {
            this.y += 10; // Nach unten
        }
        if (this.controls.back) {
            this.x -= 10; // Nach links
            this.direction = -1; // Blickrichtung links
        }
        if (this.controls.foward) {
            this.x += 10; // Nach rechts
            this.direction = 1; // Blickrichtung rechts
        }
    }

    // Richtige Animation je nach Aktion wählen
    animate() {
        if (this.isHit) return; // Getroffen ⇒ keine andere Animation
        if (this.controls.mouseClickLeft) {
            this.shootFxAnimate(); // Schießen
        } else if (this.controls.mouseClickRight) {
            this.startThrowBomb(); // Bombe werfen
        } else if (this.currentThrowBombkImages > 0) {
            this.throwBombAnimate(); // Bombenwurf läuft noch
        } else if (this.controls.space) {
            this.handleJump(); // Springen
        } else if (this.isAboveGround() || this.speedY > 0) {
            this.jumpAnimate(); // In der Luft ⇒ Sprungbild
        } else {
            this.walkAnimate(); // Laufen oder Idle
        }
    }

    // Bombenwurf starten
    startThrowBomb() {
        this.controls.mouseClickRight = false; // Einmalig auslösen
        this.currentThrowBombkImages = 0; // Animation zurücksetzen
        this.throwBombAnimate();
    }

    // Sprung auslösen
    handleJump() {
        this.jump();
        this.controls.space = false; // Einmalig auslösen
    }

    // Lauf- / Idle-Animation (jedes 3. Bild wechseln)
    walkAnimate() {
        this.frameCounter++;
        if (this.frameCounter % 3 !== 0) return; // Nur jedes 3. Mal
        let isMoving = this.controls.up || this.controls.back || this.controls.down || this.controls.foward;
        let images;
        if (isMoving) {
            images = this.IMAGES_WALK; // Bewegung ⇒ Laufbilder
        } else {
            images = this.IMAGES_IDLE; // Stillstand ⇒ Idle-Bilder
        }
        this.currentWalkImages++;
        if (this.currentWalkImages >= images.length) {
            this.currentWalkImages = 0; // Loop
        }
        let imgPath = images[this.currentWalkImages];
        this.img = this.imageCache[imgPath];
    }

    // Schuss-Animation (jedes 2. Bild wechseln)
    shootFxAnimate() {
        this.frameCounter++;
        if (this.frameCounter % 2 !== 0) return; // Nur jedes 2. Mal
        let imgPath = this.IMAGES_SHOOTFX1[this.currentShootFXImages];
        this.img = this.imageCache[imgPath];
        this.currentShootFXImages++;
        if (this.currentShootFXImages >= this.IMAGES_SHOOTFX1.length) {
            this.currentShootFXImages = 0; // Zurück zu Idle
            this.walkAnimate();
        }
    }

    // Bombenwurf-Animation
    throwBombAnimate() {
        let imgPath = this.IMAGES_THROWBOMB[this.currentThrowBombkImages];
        this.img = this.imageCache[imgPath];
        this.currentThrowBombkImages++;
        if (this.currentThrowBombkImages >= this.IMAGES_THROWBOMB.length) {
            this.currentThrowBombkImages = 0; // Zurück zu Idle
            this.walkAnimate();
        }
    }

    // Schwerkraft (60fps): Figur fällt nach Sprung
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.jumpY -= this.speedY; // Y-Position ändern
                this.speedY -= this.acceleration; // Nach unten beschleunigen
            } else { // Am Boden
                this.speedY = 0;
                this.jumpY = 240; // Boden-Höhe
            }
        }, 1000 / 60);
    }

    // Prüft ob Figur in der Luft ist
    isAboveGround() {
        return this.jumpY < 240;
    }

    // Sprung starten
    jump() {
        if (!this.isAboveGround()) { // Nur am Boden springen
            this.speedY = 18; // Aufwärts-Impuls
            this.currentJumpImages = 0; // Animation zurücksetzen
        }
        this.jumpAnimate();
    }

    // Sprung-Animation (einmal durchlaufen)
    jumpAnimate() {
        if (this.currentJumpImages >= this.IMAGES_JUMP.length) {
            return; // Fertig ⇒ kein Bild mehr wechseln
        }
        let imgPath = this.IMAGES_JUMP[this.currentJumpImages];
        this.img = this.imageCache[imgPath];
        this.currentJumpImages++;
    }
}

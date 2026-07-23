class World {
    ctx; // Canvas-2D-Kontext (zum Zeichnen)
    canvas; // Canvas-Element
    enemies = []; // Array aller Gegner
    controls; // Steuerung
    mainCharacter; // Spieler-Figur
    gunsProjectils; // Waffe/Laser
    IMAGES_BACKGROUND = []; // Alle Hintergrund-Bilder
    cameraX = 0; // Kameraposition
    worldWidth = 3 * 1280; // Weltbreite (3 Segmente à 1280px)

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.controls = new Controls(); // Steuerung initialisieren
        this.mainCharacter = new Character(this.controls); // Spieler erstellen
        this.gunsProjectils = new GunsProjectils(this.controls); // Waffe erstellen
        this.addBackgroundImages(); // Hintergründe anlegen
        this.createEnemies(); // Gegner spawnen
        this.draw(); // Erster Zeichen-Durchlauf
    }

    // 9 Gegner erstellen
    createEnemies() {
        for (let i = 0; i < 9; i++) {
            let enemy = new Enemy();
            this.enemies.push(enemy);
        }
    }

    // Haupt-Zeichen-Loop (requestAnimationFrame)
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Canvas leeren
        this.keepCharacterInLevel(); // Figur in der Welt halten
        this.updateCamera(); // Kamera positionieren
        this.ctx.save();
        this.ctx.translate(-this.cameraX, 0); // Kamera-Verschiebung
        let drawY = this.calculateDrawY(); // Y-Position für Sprung
        let tempY = this.mainCharacter.y;
        this.mainCharacter.y = drawY; // Temporäre Y-Änderung für Zeichnung
        this.positionWeapon(drawY); // Waffe an Figur ausrichten
        this.checkCollisions(); // Kollisionsprüfung
        this.removeDeadEnemies(); // Tote Gegner entfernen
        this.renderAll(); // Alles zeichnen
        this.mainCharacter.y = tempY; // Y zurücksetzen
        this.ctx.restore();
        this.nextFrame(); // Nächsten Frame anfordern
    }

    // Nächsten Animations-Frame anfordern
    nextFrame() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    // Figur darf die Welt nicht verlassen
    keepCharacterInLevel() {
        if (this.mainCharacter.x < 0) {
            this.mainCharacter.x = 0; // Linke Grenze
        }
        if (this.mainCharacter.x > this.worldWidth - this.mainCharacter.width) {
            this.mainCharacter.x = this.worldWidth - this.mainCharacter.width; // Rechte Grenze
        }
    }

    // Kamera folgt der Figur (100px Versatz)
    updateCamera() {
        let offset = this.mainCharacter.x - 100;
        this.cameraX = offset;
        if (this.cameraX < 0) {
            this.cameraX = 0; // Linke Grenze
        }
        if (this.cameraX > this.worldWidth - this.canvas.width) {
            this.cameraX = this.worldWidth - this.canvas.width; // Rechte Grenze
        }
    }

    // Y-Höhe für Sprung berechnen
    calculateDrawY() {
        return this.mainCharacter.y - (240 - this.mainCharacter.jumpY);
    }

    // Waffe an Figur ausrichten (Position + Richtung)
    positionWeapon(drawY) {
        if (this.mainCharacter.direction === 1) {
            this.gunsProjectils.x = this.mainCharacter.x + 350; // Rechts von der Figur
        } else {
            this.gunsProjectils.x = this.mainCharacter.x - 30; // Links von der Figur
        }
        this.gunsProjectils.y = drawY + 240;
        this.gunsProjectils.direction = this.mainCharacter.direction; // Richtung übernehmen
    }

    // Alle Kollisionen prüfen
    checkCollisions() {
        if (this.controls.mouseClickLeft) {
            this.checkLaserCollisions(); // Laser trifft Gegner?
        }
        this.checkCharacterCollisions(); // Gegner trifft Spieler?
    }

    // Alle Objekte zeichnen
    renderAll() {
        this.addObjectToMap(this.IMAGES_BACKGROUND); // Hintergründe
        this.addObjectToMap(this.enemies); // Gegner
        this.addToMap(this.gunsProjectils); // Waffe
        this.addToMap(this.mainCharacter); // Spieler
    }

    // Tote Gegner (deathComplete) aus dem Array entfernen
    removeDeadEnemies() {
        let aliveEnemies = [];
        for (let i = 0; i < this.enemies.length; i++) {
            let enemy = this.enemies[i];
            if (!enemy.deathComplete) {
                aliveEnemies.push(enemy); // Nur lebende behalten
            }
        }
        this.enemies = aliveEnemies;
    }

    // Ein Objekt auf die Canvas zeichnen (mit Rotation oder Spiegelung)
    addToMap(value) {
        if (value.rotation) { // 180° gedreht zeichnen (z.B. unteres Hintergrund-Bild)
            this.ctx.save();
            this.ctx.translate(value.x + value.width / 2, value.y + value.height / 2);
            this.ctx.rotate((value.rotation * Math.PI) / 180);
            this.ctx.drawImage(
                value.img,
                -value.width / 2,
                -value.height / 2,
                value.width,
                value.height
            );
            this.ctx.restore();
        } else if (value.direction === -1) { // Nach links gespiegelt zeichnen
            this.ctx.save();
            this.ctx.translate(value.x + value.width, value.y);
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(value.img, 0, 0, value.width, value.height);
            this.ctx.restore();
        } else { // Normal zeichnen
            this.ctx.drawImage(
                value.img,
                value.x,
                value.y,
                value.width,
                value.height
            );
        }
    }

    // Array von Objekten zeichnen
    addObjectToMap(objects) {
        for (let i = 0; i < objects.length; i++) {
            let object = objects[i];
            this.addToMap(object);
        }
    }

    // Prüft ob der Laser einen Gegner trifft
    checkLaserCollisions() {
        let laserTip = this.createLaserTip(); // Laser-Spitze (1x1px)
        for (let i = 0; i < this.enemies.length; i++) {
            let enemy = this.enemies[i];
            if (enemy.isDead) {
                continue; // Tote ignorieren
            }
            let enemyBox = this.createEnemyHitbox(enemy);
            if (this.isColliding(laserTip, enemyBox)) { // Laser trifft?
                enemy.die(); // Gegner stirbt
                break; // Nur ein Treffer pro Schuss
            }
        }
    }

    // Prüft ob ein Gegner den Spieler berührt
    checkCharacterCollisions() {
        for (let i = 0; i < this.enemies.length; i++) {
            let enemy = this.enemies[i];
            if (enemy.isDead || enemy.isAttacking) {
                continue; // Tote/angreifende ignorieren
            }
            let charBox = this.createCharacterHitbox(); // Spieler-Hitbox
            let enemyBox = this.createEnemyHitbox(enemy); // Gegner-Hitbox
            if (this.isColliding(charBox, enemyBox)) { // Berühren sie sich?
                enemy.attack(); // Gegner greift an
                this.mainCharacter.getHit(); // Spieler wird getroffen
            }
        }
    }

    // Laser-Spitze als winzige Box (1x1px)
    createLaserTip() {
        let laserTipX;
        if (this.gunsProjectils.direction === 1) {
            laserTipX = this.gunsProjectils.x + this.gunsProjectils.width - 10; // Rechts
        } else {
            laserTipX = this.gunsProjectils.x; // Links
        }
        return {
            x: laserTipX,
            y: this.gunsProjectils.y + this.gunsProjectils.height / 2 - 5,
            w: 1,
            h: 1
        };
    }

    // Spieler-Hitbox (etwas kleiner als die Figur)
    createCharacterHitbox() {
        return {
            x: this.mainCharacter.x + this.mainCharacter.width * 0.3,
            y: this.mainCharacter.y + this.mainCharacter.height * 0.3,
            w: this.mainCharacter.width * 0.4,
            h: this.mainCharacter.height * 0.4
        };
    }

    // Gegner-Hitbox (kleiner als das Bild)
    createEnemyHitbox(enemy) {
        return {
            x: enemy.x + enemy.width * 0.4,
            y: enemy.y + enemy.height * 0.4,
            w: enemy.width * 0.2,
            h: enemy.height * 0.2
        };
    }

    // Kollisionserkennung: Überschneiden sich zwei Boxen?
    isColliding(box1, box2) {
        return (
            box1.x + box1.w > box2.x &&
            box1.x < box2.x + box2.w &&
            box1.y + box1.h > box2.y &&
            box1.y < box2.y + box2.h
        );
    }

    // 3 Hintergrund-Segmente mit jeweiligen Overlay-Bildern erstellen
    addBackgroundImages() {
        for (let i = 0; i < 3; i++) {
            let x = 1280 * i; // Position (0, 1280, 2560)
            let bg = new Background(
                `./img/PNG/Backgrounds/${i}.png`,
                x
            );
            this.IMAGES_BACKGROUND.push(bg); // Haupt-Hintergrund

            // Oberes Overlay (gerade Nummer: 00, 02, 04)
            let topImg = new Background(
                `./img/PNG/Backgrounds2/0${i * 2}.png`,
                x
            );
            topImg.y = 0; // Oben
            topImg.width = 1282; // 2px Überlappung gegen sichtbare Übergänge
            topImg.height = [151, 103, 215][i]; // Unterschiedliche Höhen
            this.IMAGES_BACKGROUND.push(topImg);

            // Unteres Overlay (ungerade Nummer: 01, 03, 05)
            let bottomImg = new Background(
                `./img/PNG/Backgrounds2/0${i * 2 + 1}.png`,
                x
            );
            bottomImg.width = 1282; // 2px Überlappung
            bottomImg.height = [98, 787, 204][i]; // Unterschiedliche Höhen
            bottomImg.y = 720 - bottomImg.height; // Unten ausrichten
            if (i === 2) { // Letztes Segment: 180° gedreht
                bottomImg.rotation = 180;
            }
            this.IMAGES_BACKGROUND.push(bottomImg);
        }
    }
}

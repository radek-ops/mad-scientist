class World {
    ctx;
    canvas;
    background = new Background();
    enemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];
    controls;
    mainCharacter;
    gunsProjectils;
    IMAGES_BACKGROUND = [];
    cameraX = 0;
    worldWidth = 3 * 1280; // 3 Hintergründe × 1280px


    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.controls = new Controls();
        this.mainCharacter = new Character(this.controls);
        this.gunsProjectils = new GunsProjectils(this.controls);
        this.addBackgroundImages();
        this.draw();
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Character in der Welt begrenzen
        this.mainCharacter.x = Math.max(0, Math.min(this.mainCharacter.x, this.worldWidth - this.mainCharacter.width));
        
        // Kamera berechnen - Character in der Bildmitte halten
        let targetCameraX = this.mainCharacter.x - this.canvas.width / 2;
        this.cameraX = Math.max(0, Math.min(targetCameraX, this.worldWidth - this.canvas.width));

        this.ctx.save();
        this.ctx.translate(-this.cameraX, 0);

        // Y-Position mit Sprung-Höhe berechnen
        let drawY = this.mainCharacter.y - (240 - this.mainCharacter.jumpY);
        
        // Temporär Y setzen fürs Zeichnen (Sprung!)
        let tempY = this.mainCharacter.y;
        this.mainCharacter.y = drawY;

        // Laser-Position je nach Richtung
        if (this.mainCharacter.direction === 1) {
            this.gunsProjectils.x = this.mainCharacter.x + 350;
        } else {
            this.gunsProjectils.x = this.mainCharacter.x - 150;
        }
        this.gunsProjectils.y = drawY + 240;
        this.gunsProjectils.direction = this.mainCharacter.direction;

        this.addObjectToMap(this.IMAGES_BACKGROUND);
        this.addObjectToMap(this.enemies);
        this.addToMap(this.gunsProjectils);
        this.addToMap(this.mainCharacter);
        
        // Y zurücksetzen für movement()-Logik
        this.mainCharacter.y = tempY;

        this.ctx.restore();

       
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });


    }


    addToMap(value) {
        if (value.direction === -1) {
            this.ctx.save();
            this.ctx.translate(value.x + value.width, value.y);
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(value.img, 0, 0, value.width, value.height);
            this.ctx.restore();
        } else {
            this.ctx.drawImage(
                value.img,
                value.x,
                value.y,
                value.width,
                value.height);
        }
    }


    addObjectToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        });

    }


    addBackgroundImages() {
        for (let i = 0; i < 3; i++) {
            let imgNumber = i;
            let nextBackground = 1280 * i;
            this.IMAGES_BACKGROUND.push(new Background(`./img/PNG/Backgrounds/${imgNumber}.png`, nextBackground));
        }

    }

}


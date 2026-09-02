/**
 * Flying enemy (enemy type 09).
 */
class FlyingEnemy extends Enemy {
    FLYING_GET_ELECTRIC = [];
    FLYING_DEATH = [];
    currentFlyingElectricImages = 0;
    currentFlyingDeathImages = 0;
    enemyType = 'flyingEnemy';

    constructor(controls) {
        super(controls, '09');
        this.loadTypeImages();
    }

    setStartPosition() {
        this.x = 900 + Math.random() * 500;
        this.y = -10 + Math.random() * 60;
        this.speed = 4;
    }

    loadTypeImages() {
        this.addFlyingEnemyGetElectricImages();
        this.addFlyingEnemyDeathImages();
    }

    addFlyingEnemyGetElectricImages() {
        for (let i = 0; i <= 2; i++) {
            this.FLYING_GET_ELECTRIC.push(`./img/PNG/Enemy_Characters/Enemy_Character09/Get Electric/Get Electric_${i}.png`);
        }
        this.saveImages(this.FLYING_GET_ELECTRIC);
    }

    flyingEnemyGetElectric() {
        let imgPath = this.FLYING_GET_ELECTRIC[this.currentFlyingElectricImages];
        let img = this.imageCache[imgPath];
        if (img && img.complete) {
            this.img = img;
        }
        this.currentFlyingElectricImages++;
        if (this.currentFlyingElectricImages >= this.FLYING_GET_ELECTRIC.length) {
            this.currentFlyingElectricImages = 0;
            return true;
        }
        return false;
    }

    addFlyingEnemyDeathImages() {
        for (let i = 0; i <= 13; i++) {
            let number = i < 10 ? '0' + i : i;
            this.FLYING_DEATH.push(`./img/PNG/Enemy_Characters/Enemy_Character09/Destroy/Destroy_${number}.png`);
        }
        this.saveImages(this.FLYING_DEATH);
    }

    flyingEnemyDeath() {
        let imgPath = this.FLYING_DEATH[this.currentFlyingDeathImages];
        let img = this.imageCache[imgPath];
        if (img && img.complete) {
            this.img = img;
        }
        this.currentFlyingDeathImages++;
        if (this.currentFlyingDeathImages >= this.FLYING_DEATH.length) {
            this.currentFlyingDeathImages = 0;
            return true;
        }
        return false;
    }
}
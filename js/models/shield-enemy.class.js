/**
 * Enemy with a shield (enemy type 01).
 */
class ShieldEnemy extends Enemy {
    SHIELD_GET_HIT = [];
    SHIELD_DEATH = [];
    SHIELD_HIT = [];
    currentShieldGetHitImages = 0;
    currentShieldDeathImages = 0;
    currentShieldHitImages = 0;
    enemyType = 'shieldEnemy';

    constructor(controls) {
        super(controls, '01');
        this.loadTypeImages();
    }

    loadTypeImages() {
        this.addShieldEnemyGetHitImages();
        this.addShieldEnemyDeathImages();
        this.addShieldEnemyHitImages();
    }

    addShieldEnemyGetHitImages() {
        for (let i = 0; i <= 9; i++) {
            let number = i < 10 ? '0' + i : i;
            this.SHIELD_GET_HIT.push(`./img/PNG/Enemy_Characters/Enemy_Character01/Get_Hit/Get_Hit_${number}.png`);
        }
        this.saveImages(this.SHIELD_GET_HIT);
    }

    shieldEnemyGetHit() {
        let imgPath = this.SHIELD_GET_HIT[this.currentShieldGetHitImages];
        let img = this.imageCache[imgPath];
        if (img && img.complete) {
            this.img = img;
        }
        this.currentShieldGetHitImages++;
        if (this.currentShieldGetHitImages >= this.SHIELD_GET_HIT.length) {
            this.currentShieldGetHitImages = 0;
        }
    }

    addShieldEnemyDeathImages() {
        for (let i = 0; i <= 23; i++) {
            let number = i < 10 ? '0' + i : i;
            this.SHIELD_DEATH.push(`./img/PNG/Enemy_Characters/Enemy_Character01/Death/Death_${number}.png`);
        }
        this.saveImages(this.SHIELD_DEATH);
    }

    shieldEnemyDeath() {
        let imgPath = this.SHIELD_DEATH[this.currentShieldDeathImages];
        let img = this.imageCache[imgPath];
        if (img && img.complete) {
            this.img = img;
        }
        this.currentShieldDeathImages++;
        if (this.currentShieldDeathImages >= this.SHIELD_DEATH.length) {
            this.currentShieldDeathImages = 0;
            return true;
        }
        return false;
    }

    addShieldEnemyHitImages() {
        for (let i = 0; i <= 13; i++) {
            let number = i < 10 ? '0' + i : i;
            this.SHIELD_HIT.push(`./img/PNG/Enemy_Characters/Enemy_Character01/Hit/Hit_${number}.png`);
        }
        this.saveImages(this.SHIELD_HIT);
    }

    shieldEnemyAttack() {
        let imgPath = this.SHIELD_HIT[this.currentShieldHitImages];
        let img = this.imageCache[imgPath];
        if (img && img.complete) {
            this.img = img;
        }
        this.currentShieldHitImages++;
        if (this.currentShieldHitImages >= this.SHIELD_HIT.length) {
            this.currentShieldHitImages = 0;
            this.isAttacking = false;
            return true;
        }
        return false;
    }
}
/**
 * Enemy without a shield (enemy type 07).
 */
class UnshieldedEnemy extends Enemy {
    UNSHIELDED_GET_ELECTRIC = [];
    UNSHIELDED_DEATH = [];
    UNSHIELDED_HIT = [];
    currentUnshieldedElectricImages = 0;
    currentUnshieldedDeathImages = 0;
    currentUnshieldedHitImages = 0;
    enemyType = 'unshieldedEnemy';

    constructor(controls) {
        super(controls, '07');
        this.loadTypeImages();
    }

    loadTypeImages() {
        this.addUnshieldedEnemyGetElectricImages();
        this.addUnshieldedEnemyDeathImages();
        this.addUnshieldedEnemyHitImages();
    }

    addUnshieldedEnemyGetElectricImages() {
        for (let i = 0; i <= 2; i++) {
            this.UNSHIELDED_GET_ELECTRIC.push(`./img/PNG/Enemy_Characters/Enemy_Character07/Get Electric/Get Electric_${i}.png`);
        }
        this.saveImages(this.UNSHIELDED_GET_ELECTRIC);
    }

    unshieldedEnemyGetElectric() {
        let imgPath = this.UNSHIELDED_GET_ELECTRIC[this.currentUnshieldedElectricImages];
        let img = this.imageCache[imgPath];
        if (img && img.complete) {
            this.img = img;
        }
        this.currentUnshieldedElectricImages++;
        if (this.currentUnshieldedElectricImages >= this.UNSHIELDED_GET_ELECTRIC.length) {
            this.currentUnshieldedElectricImages = 0;
            return true;
        }
        return false;
    }

    addUnshieldedEnemyDeathImages() {
        for (let i = 0; i <= 23; i++) {
            let number = i < 10 ? '0' + i : i;
            this.UNSHIELDED_DEATH.push(`./img/PNG/Enemy_Characters/Enemy_Character07/Death/Death_${number}.png`);
        }
        this.saveImages(this.UNSHIELDED_DEATH);
    }

    unshieldedEnemyDeath() {
        let imgPath = this.UNSHIELDED_DEATH[this.currentUnshieldedDeathImages];
        let img = this.imageCache[imgPath];
        if (img && img.complete) {
            this.img = img;
        }
        this.currentUnshieldedDeathImages++;
        if (this.currentUnshieldedDeathImages >= this.UNSHIELDED_DEATH.length) {
            this.currentUnshieldedDeathImages = 0;
            return true;
        }
        return false;
    }

    addUnshieldedEnemyHitImages() {
        for (let i = 0; i <= 13; i++) {
            let number = i < 10 ? '0' + i : i;
            this.UNSHIELDED_HIT.push(`./img/PNG/Enemy_Characters/Enemy_Character07/Hit/Hit_${number}.png`);
        }
        this.saveImages(this.UNSHIELDED_HIT);
    }

    unshieldedEnemyAttack() {
        let imgPath = this.UNSHIELDED_HIT[this.currentUnshieldedHitImages];
        let img = this.imageCache[imgPath];
        if (img && img.complete) {
            this.img = img;
        }
        this.currentUnshieldedHitImages++;
        if (this.currentUnshieldedHitImages >= this.UNSHIELDED_HIT.length) {
            this.currentUnshieldedHitImages = 0;
            this.isAttacking = false;
            return true;
        }
        return false;
    }
}
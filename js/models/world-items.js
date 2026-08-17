Object.assign(World.prototype, {
    /**
     * Collects a bomb when the character touches it.
     */
    checkBombCollection() {
        this.bombs.forEach((bomb) => {
            if (bomb.isCollected || this.collectedBombCount >= 3) {
                return;
            }
            if (this.characterTouchesObject(bomb)) {
                bomb.collect(this.collectedBombCount);
                this.collectedBombCount++;
                this.sound.play('key');

            }
        });
    },

    /**
     * Collects a potion when the character touches it.
     */
    checkPotionCollection() {
        this.potions.forEach((potion) => {
            if (potion.isCollected || potion.isConsumed || this.collectedPotionCount >= 3) {
                return;
            }
            if (this.characterTouchesObject(potion)) {
                potion.collect(this.collectedPotionCount);
                this.collectedPotionCount++;
                this.sound.play('key');

            }
        });
    },

    /**
     * Checks if the character touches a collectible object.
     * @param {Object} object - The collectible to check
     * @returns {boolean} True when the character touches it
     */
    characterTouchesObject(object) {
        let charY = this.mainCharacter.getJumpY();
        let charLeft = this.mainCharacter.x + 106;
        let charRight = this.mainCharacter.x + 106 + (this.mainCharacter.width - 266);
        let charHead = charY + 150;
        let charFeet = charY + 150 + (this.mainCharacter.height - 244);
        let objectLeft = object.x;
        let objectRight = object.x + object.width;
        let objectHead = object.y;
        let objectFeet = object.y + object.height;
        return charRight > objectLeft &&
            charFeet > objectHead &&
            charLeft < objectRight &&
            charHead < objectFeet;
    },

    /**
     * Uses a potion to refill health when the R key is pressed.
     */
    usePotion() {
        if (!this.controls.usePotion) {
            return;
        }
        this.controls.usePotion = false;
        if (this.collectedPotionCount <= 0) {
            return;
        }
        this.consumePotion();
        this.hpbar.currentHP = this.hpbar.maxHP;

    },

    /**
     * Removes one potion from the collected potions.
     */
    consumePotion() {
        this.collectedPotionCount--;
        let collectedPotions = this.potions.filter(potion => potion.isCollected);
        if (collectedPotions.length > 0) {
            collectedPotions[collectedPotions.length - 1].isCollected = false;
            collectedPotions[collectedPotions.length - 1].isConsumed = true;
        }
    },

    /**
     * Throws a bomb in the direction the character looks.
     */
    throwBomb() {
        if (this.collectedBombCount <= 0) {
            return;
        }
        let flyDirection = this.mainCharacter.otherDirection ? -1 : 1;
        let startX = this.mainCharacter.x + (flyDirection === 1 ? 120 : 180);
        let startY = this.mainCharacter.getJumpY() + (flyDirection === 1 ? 100 : 130);
        this.thrownBombs.push(new ThrownBomb(startX, startY, flyDirection));
        this.consumeBomb();
    },

    /**
     * Removes one bomb from the collected bombs.
     */
    consumeBomb() {
        this.collectedBombCount--;
        let collectedBombs = this.bombs.filter(bomb => bomb.isCollected);
        if (collectedBombs.length > 0) {
            collectedBombs[collectedBombs.length - 1].isCollected = false;
            collectedBombs[collectedBombs.length - 1].isConsumed = true;
        }
    },

    /**
     * Moves all thrown bombs and plays their explosion.
     */
    updateThrownBombs() {
        this.thrownBombs.forEach((bomb, index) => {
            if (bomb.hasExploded) {
                let done = bomb.explode();
                if (done) {
                    this.thrownBombs.splice(index, 1);
                }
            } else {
                bomb.moveForward();
            }
        });
    },

    /**
     * Damages all enemies and the boss in the explosion area.
     */
    checkBombExplosionDamage() {
        this.thrownBombs.forEach((bomb) => {
            if (!bomb.hasExploded || bomb.hasDamaged) {
                return;
            }
            bomb.hasDamaged = true;
            this.sound.play('explosion');

            this.enemies.forEach((enemy) => {
                if (enemy.isDead || enemy.isHit) {
                    return;
                }
                if (this.explosionHitsEnemy(bomb, enemy)) {
                    this.killEnemyWithBomb(enemy);
                }
            });
            if (this.explosionHitsBoss(bomb)) {
                this.damageBoss(5);
            }
        });
    },

    /**
     * Checks if an explosion touches an enemy.
     * @param {ThrownBomb} bomb - The exploding bomb
     * @param {Enemy} enemy - The enemy to check
     * @returns {boolean} True when the explosion hits the enemy
     */
    explosionHitsEnemy(bomb, enemy) {
        let explosionLeft = bomb.x;
        let explosionRight = bomb.x + bomb.width;
        let explosionTop = bomb.y;
        let explosionBottom = bomb.y + bomb.height;
        let enemyLeft = enemy.x + 111;
        let enemyRight = enemy.x + 111 + (enemy.width - 226);
        let enemyTop = enemy.y + 148;
        let enemyBottom = enemy.y + 148 + (enemy.height - 226);
        return explosionRight > enemyLeft &&
            explosionBottom > enemyTop &&
            explosionLeft < enemyRight &&
            explosionTop < enemyBottom;
    },

    /**
     * Checks if an explosion touches the boss.
     * @param {ThrownBomb} bomb - The exploding bomb
     * @returns {boolean} True when the explosion hits the boss
     */
    explosionHitsBoss(bomb) {
        let explosionLeft = bomb.x;
        let explosionRight = bomb.x + bomb.width;
        let explosionTop = bomb.y;
        let explosionBottom = bomb.y + bomb.height;
        let bossLeft = this.finalBoss.x + 650;
        let bossRight = this.finalBoss.x + 650 + (this.finalBoss.width - 1300);
        let bossTop = this.finalBoss.y + 1150;
        let bossBottom = this.finalBoss.y + 1150 + (this.finalBoss.height - 1500);
        return explosionRight > bossLeft &&
            explosionBottom > bossTop &&
            explosionLeft < bossRight &&
            explosionTop < bossBottom;
    },

    /**
     * Kills an enemy with the bomb explosion.
     * @param {Enemy} enemy - The enemy to kill
     */
    killEnemyWithBomb(enemy) {
        enemy.isHit = true;
        this.sound.play('enemyDeath');
        let deathInterval = setInterval(() => {
            let done;
            if (enemy.enemyType === '01') {
                done = enemy.enemy01Death();
            } else if (enemy.enemyType === '07') {
                done = enemy.enemy07Death();
            } else if (enemy.enemyType === '09') {
                done = enemy.enemy09Death();
            }
            if (done) {
                clearInterval(deathInterval);
                enemy.isDead = true;

            }
        }, 60);
    },
});

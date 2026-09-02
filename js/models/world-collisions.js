Object.assign(World.prototype, {
    /**
     * Kills enemy type 01 when the character jumps on its head.
     */
    checkShieldEnemyCollision() {
        this.enemies.forEach((enemy) => {
            if (this.collision(this.mainCharacter, enemy) && enemy.enemyType === 'shieldEnemy') {
                let charFeet = this.mainCharacter.getJumpY() + 281;
                let enemyHead = enemy.y + 148;
                let isFalling = this.mainCharacter.speedY < 0;
                let isStomping = isFalling && (charFeet - enemyHead > -10 && charFeet - enemyHead < 30);
                if (isStomping && !enemy.isHit) {
                    this.laserKillShieldEnemy(enemy);
                }
            }
        });
    },

    /**
     * Damages the character when its head hits enemy type 09.
     */
    checkFlyingEnemyHeadBump() {
        if (this.mainCharacter.isDead) return;
        if (this.headBumpCooldown > 0) {
            this.headBumpCooldown--;
            return;
        }
        this.enemies.forEach((enemy) => this.bumpHeadOnFlyingEnemy(enemy));
    },

    /**
     * Damages the character when its head bumps one flying enemy.
     * @param {Enemy} enemy - The enemy to check
     */
    bumpHeadOnFlyingEnemy(enemy) {
        if (enemy.enemyType !== 'flyingEnemy' || enemy.isDead) {
            return;
        }
        if (this.isHeadBumpingEnemy(enemy)) {
            this.damageCharacter(10);
            this.headBumpCooldown = 30;
        }
    },

    /**
     * Checks if the character head is touching the feet of an enemy.
     * @param {Enemy} enemy - The enemy to check
     * @returns {boolean} True when the head bumps the enemy
     */
    isHeadBumpingEnemy(enemy) {
        let { left: charLeft, right: charRight, top: charHead } = this.mainCharacter.getCollisionBox();
        let { left: enemyLeft, right: enemyRight, bottom: enemyFeet } = enemy.getCollisionBox();
        let isMovingUp = this.mainCharacter.speedY > 0;
        let touchesSide = charRight > enemyLeft && charLeft < enemyRight;
        let headNearFeet = enemyFeet - charHead > -20 && enemyFeet - charHead < 30;
        return isMovingUp && touchesSide && headNearFeet;
    },

    /**
     * Removes health from the character and plays an animation.
     * @param {number} amount - How much health to remove
     */
    damageCharacter(amount) {
        if (this.mainCharacter.isDead) {
            return;
        }
        this.hpBar.currentHP -= amount;
        if (this.hpBar.currentHP < 0) {
            this.hpBar.currentHP = 0;
        }
        if (this.hpBar.currentHP <= 0) {
            this.killCharacter();
        } else {
            this.playCharacterGetHit();
        }
    },

    /**
     * Plays the death animation and shows the game over screen.
     */
    killCharacter() {
        this.mainCharacter.isDead = true;
        this.sound.stopMusic();
        this.sound.play('playerDeath');
        this.runDeathAnimation();
    },

    /**
     * Plays the death animation and finishes the death when done.
     */
    runDeathAnimation() {
        let deathInterval = setInterval(() => {
            if (!this.isRunning) {
                clearInterval(deathInterval);
                return;
            }
            let done = this.mainCharacter.characterDeath();
            if (done) {
                clearInterval(deathInterval);
                this.finishDeath();
            }
        }, 60);
    },

    /**
     * Plays the game over sound and shows the game over overlay.
     */
    finishDeath() {
        this.sound.play('gameOver');
        document.getElementById('gameOverOverlay').classList.add('show');
    },

    /**
     * Plays the get-hit animation of the character.
     */
    playCharacterGetHit() {
        this.mainCharacter.isHit = true;
        this.sound.play('hit');
        let getHitInterval = setInterval(() => {
            let done = this.mainCharacter.characterGetHit();
            if (done) {
                clearInterval(getHitInterval);
            }
        }, 60);
    },

    /**
     * Starts the attack of enemies that touch the character.
     */
    checkEnemyAttack() {
        if (this.mainCharacter.isDead) {
            return;
        }
        this.enemies.forEach((enemy) => {
            if (this.canEnemyAttack(enemy)) {
                this.startEnemyAttack(enemy);
            }
        });
    },

    /**
     * Checks if an enemy is allowed to attack.
     * @param {Enemy} enemy - The enemy to check
     * @returns {boolean} True when the enemy can attack
     */
    canEnemyAttack(enemy) {
        if (enemy.isDead || enemy.isHit) {
            return false;
        }
        if (enemy.enemyType !== 'shieldEnemy' && enemy.enemyType !== 'unshieldedEnemy') {
            return false;
        }
        if (!this.collision(this.mainCharacter, enemy)) {
            return false;
        }
        return !enemy.isAttacking;
    },

    /**
     * Plays the attack animation and damages the character.
     * @param {Enemy} enemy - The attacking enemy
     */
    startEnemyAttack(enemy) {
        enemy.isAttacking = true;
        this.startEnemyAttackAnimation(enemy);
        this.damageCharacter(2);
    },

    /**
     * Starts the attack animation of the matching enemy type.
     * @param {Enemy} enemy - The attacking enemy
     */
    startEnemyAttackAnimation(enemy) {
        if (enemy.enemyType === 'shieldEnemy') {
            this.runEnemyAttack(enemy, 'shieldEnemyAttack');
        } else {
            this.runEnemyAttack(enemy, 'unshieldedEnemyAttack');
        }
    },

    /**
     * Runs the attack animation of an enemy on an interval.
     * @param {Enemy} enemy - The attacking enemy
     * @param {string} method - The attack method name
     */
    runEnemyAttack(enemy, method) {
        let attackInterval = setInterval(() => {
            let done = enemy[method]();
            if (done) clearInterval(attackInterval);
        }, 60);
    },

    /**
     * Kills enemy type 07 when the laser hits it.
     */
    checkLaserUnshieldedEnemyCollision() {
        if (!this.controls.mouseClickLeft) return;
        this.enemies.forEach((enemy) => {
            if (enemy.enemyType === 'unshieldedEnemy' && this.laserHitEnemy(enemy) && !enemy.isHit) {
                this.laserKillEnemy(enemy, 'unshieldedEnemy');
            }
        });
    },

    /**
     * Kills enemy type 09 when the laser hits it.
     */
    checkLaserFlyingEnemyCollision() {
        if (!this.controls.mouseClickLeft) return;
        this.enemies.forEach((enemy) => {
            if (enemy.enemyType === 'flyingEnemy' && this.laserHitEnemy(enemy) && !enemy.isHit) {
                this.laserKillEnemy(enemy, 'flyingEnemy');
            }
        });
    },

    /**
     * Kills enemy type 01 when the laser hits it from behind.
     */
    checkLaserShieldEnemyCollision() {
        if (!this.controls.mouseClickLeft) return;
        this.enemies.forEach((enemy) => {
            if (enemy.enemyType === 'shieldEnemy' && !enemy.isHit && !enemy.isDead) {
                if (this.laserHitEnemy(enemy)) {
                    if (this.mainCharacter.x > enemy.x) {
                        this.laserKillShieldEnemy(enemy);
                    } else {
                        this.playShieldEnemyGetHit(enemy);
                    }
                }
            }
        });
    },

    /**
     * Plays the death animation for enemy type 01.
     * @param {Enemy} enemy - The enemy to kill
     */
    laserKillShieldEnemy(enemy) {
        enemy.isHit = true;
        let deathInterval = setInterval(() => {
            let done = enemy.shieldEnemyDeath();
            if (done) {
                clearInterval(deathInterval);
                enemy.isDead = true;
                this.sound.play('enemyDeath');
            }
        }, 60);
    },

    /**
     * Plays the get-hit animation for enemy type 01 without killing it.
     * @param {Enemy} enemy - The enemy that gets hit
     */
    playShieldEnemyGetHit(enemy) {
        enemy.isHit = true;
        enemy.currentShieldGetHitImages = 0;
        let hitInterval = setInterval(() => {
            enemy.shieldEnemyGetHit();
            if (enemy.currentShieldGetHitImages === 0) {
                clearInterval(hitInterval);
                enemy.isHit = false;
            }
        }, 60);
    },

    /**
     * Plays the electric animation and then the death animation.
     * @param {Enemy} enemy - The enemy that gets hit
     * @param {string} type - The enemy type ('07' or '09')
     */
    laserKillEnemy(enemy, type) {
        enemy.isHit = true;
        let electricInterval = setInterval(() => {
            let done = type === 'unshieldedEnemy' ? enemy.unshieldedEnemyGetElectric() : enemy.flyingEnemyGetElectric();
            if (done) {
                clearInterval(electricInterval);
                setTimeout(() => {
                    this.playEnemyDeath(enemy, type);
                }, 300);
            }
        }, 100);
    },

    /**
     * Plays the death animation of an enemy.
     * @param {Enemy} enemy - The dying enemy
     * @param {string} type - The enemy type ('07' or '09')
     */
    playEnemyDeath(enemy, type) {
        let deathInterval = setInterval(() => {
            let done = type === 'unshieldedEnemy' ? enemy.unshieldedEnemyDeath() : enemy.flyingEnemyDeath();
            if (done) {
                clearInterval(deathInterval);
                enemy.isDead = true;
                this.sound.play('enemyDeath');
            }
        }, 60);
    },

    /**
     * Checks if the laser beam touches an enemy.
     * @param {Enemy} enemy - The enemy to check
     * @returns {boolean} True when the laser hits the enemy
     */
    laserHitEnemy(enemy) {
        let { left: laserLeft, right: laserRight, top: laserTop, bottom: laserBottom } = this.gunsProjectiles.getCollisionBox();
        let { left: enemyLeft, right: enemyRight, top: enemyTop, bottom: enemyBottom } = enemy.getCollisionBox();
        return laserRight > enemyLeft &&
            laserBottom > enemyTop &&
            laserLeft < enemyRight &&
            laserTop < enemyBottom;
    },
    /**
     * Plays the laser sound while shooting, with a cooldown.
     */
    checkLaserSound() {
        if (!this.controls.mouseClickLeft) {
            return;
        }
        if (this.laserSoundCooldown > 0) {
            this.laserSoundCooldown--;
            return;
        }
        this.sound.play('lazer');
        this.laserSoundCooldown = 30;
    },

});
Object.assign(World.prototype, {
    /**
     * Kills enemy type 01 when the character jumps on its head.
     */
    checkEnemyCollision01() {
        this.enemies.forEach((enemy) => {
            if (this.collision(this.mainCharacter, enemy) && enemy.enemyType === '01') {
                let charFeet = this.mainCharacter.getJumpY() + 281;
                let enemyHead = enemy.y + 148;
                let isFalling = this.mainCharacter.speedY < 0;
                let isStomping = isFalling && (charFeet - enemyHead > -10 && charFeet - enemyHead < 30);
                if (isStomping && !enemy.isHit) {
                    this.laserKillEnemy01(enemy);
                }
            }
        });
    },

    /**
     * Damages the character when its head hits enemy type 09.
     */
    checkEnemyHeadBump09() {
        if (this.mainCharacter.isDead) {
            return;
        }
        if (this.headBumpCooldown > 0) {
            this.headBumpCooldown--;
            return;
        }
        this.enemies.forEach((enemy) => {
            if (enemy.enemyType !== '09' || enemy.isDead) {
                return;
            }
            if (this.isHeadBumpingEnemy(enemy)) {
                this.damageCharacter(10);
                this.headBumpCooldown = 30;
            }
        });
    },

    /**
     * Checks if the character head is touching the feet of an enemy.
     * @param {Enemy} enemy - The enemy to check
     * @returns {boolean} True when the head bumps the enemy
     */
    isHeadBumpingEnemy(enemy) {
        let charY = this.mainCharacter.getJumpY();
        let charLeft = this.mainCharacter.x + 106;
        let charRight = this.mainCharacter.x + 106 + (this.mainCharacter.width - 266);
        let charHead = charY + 150;
        let enemyLeft = enemy.x + 111;
        let enemyRight = enemy.x + 111 + (enemy.width - 226);
        let enemyFeet = enemy.y + 148 + (enemy.height - 226);
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
        this.hpbar.currentHP -= amount;
        if (this.hpbar.currentHP < 0) {
            this.hpbar.currentHP = 0;
        }
        if (this.hpbar.currentHP <= 0) {
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

        let deathInterval = setInterval(() => {
            let done = this.mainCharacter.characterDeath();
            if (done) {
                clearInterval(deathInterval);
                this.sound.play('gameOver');
                document.getElementById('gameOverOverlay').classList.add('show');
            }
        }, 60);
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
        if (enemy.enemyType !== '01' && enemy.enemyType !== '07') {
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
        if (enemy.enemyType === '01') {
            let attackInterval = setInterval(() => {
                let done = enemy.enemy01Attack();
                if (done) clearInterval(attackInterval);
            }, 60);
        } else {
            let attackInterval = setInterval(() => {
                let done = enemy.enemy07Attack();
                if (done) clearInterval(attackInterval);
            }, 60);
        }
        this.damageCharacter(2);
    },

    /**
     * Checks the stomp collision for enemy types 07 and 09.
     */
    checkEnemyCollision07And09() {
        this.enemies.forEach((enemy) => {
            if (this.collision(this.mainCharacter, enemy) && (enemy.enemyType === '07' || enemy.enemyType == '09')) {
                let charFeet = this.mainCharacter.getJumpY() + 281;
                let enemyHead = enemy.y + 148;
                let isFalling = this.mainCharacter.speedY < 0;
                let isStomping = isFalling && (charFeet - enemyHead < 50);
                if (isStomping) {
                    return;
                }
            }
        });
    },

    /**
     * Kills enemy type 07 when the laser hits it.
     */
    checkLaserEnemyCollision07() {
        if (!this.controls.mouseClickLeft) return;
        this.enemies.forEach((enemy) => {
            if (enemy.enemyType === '07' && this.laserHitEnemy(enemy) && !enemy.isHit) {
                this.laserKillEnemy(enemy, '07');
            }
        });
    },

    /**
     * Kills enemy type 09 when the laser hits it.
     */
    checkLaserEnemyCollision09() {
        if (!this.controls.mouseClickLeft) return;
        this.enemies.forEach((enemy) => {
            if (enemy.enemyType === '09' && this.laserHitEnemy(enemy) && !enemy.isHit) {
                this.laserKillEnemy(enemy, '09');
            }
        });
    },

    /**
     * Kills enemy type 01 when the laser hits it from behind.
     */
    checkLaserEnemyCollision01() {
        if (!this.controls.mouseClickLeft) return;
        this.enemies.forEach((enemy) => {
            if (enemy.enemyType === '01' && !enemy.isHit && !enemy.isDead) {
                if (this.laserHitEnemy(enemy)) {
                    if (this.mainCharacter.x > enemy.x) {
                        this.laserKillEnemy01(enemy);
                    } else {
                        this.playEnemy01GetHit(enemy);
                    }
                }
            }
        });
    },

    /**
     * Plays the death animation for enemy type 01.
     * @param {Enemy} enemy - The enemy to kill
     */
    laserKillEnemy01(enemy) {
        enemy.isHit = true;
        this.sound.play('enemyDeath');
        let deathInterval = setInterval(() => {
            let done = enemy.enemy01Death();
            if (done) {
                clearInterval(deathInterval);
                enemy.isDead = true;
            }
        }, 60);
    },

    /**
     * Plays the get-hit animation for enemy type 01 without killing it.
     * @param {Enemy} enemy - The enemy that gets hit
     */
    playEnemy01GetHit(enemy) {
        enemy.isHit = true;
        enemy.currentGetHitImages01 = 0;
        this.sound.play('enemyDeath');
        let hitInterval = setInterval(() => {
            enemy.enemy01GetHit();
            if (enemy.currentGetHitImages01 === 0) {
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
        this.sound.play('enemyDeath');
        let electricInterval = setInterval(() => {
            let done = type === '07' ? enemy.enemy07GetElectric() : enemy.enemy09GetElectric();
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
            let done = type === '07' ? enemy.enemy07Death() : enemy.enemy09Death();
            if (done) {
                clearInterval(deathInterval);
                enemy.isDead = true;

            }
        }, 60);
    },

    /**
     * Checks if the laser beam touches an enemy.
     * @param {Enemy} enemy - The enemy to check
     * @returns {boolean} True when the laser hits the enemy
     */
    laserHitEnemy(enemy) {
        let laserLeft = this.gunsProjectiles.x + 10;
        let laserRight = this.gunsProjectiles.x + 10 + (this.gunsProjectiles.width - 20);
        let laserTop = this.gunsProjectiles.y + 10;
        let laserBottom = this.gunsProjectiles.y + 10 + (this.gunsProjectiles.height - 20);
        let enemyLeft = enemy.x + 111;
        let enemyRight = enemy.x + 111 + (enemy.width - 226);
        let enemyTop = enemy.y + 148;
        let enemyBottom = enemy.y + 148 + (enemy.height - 226);
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

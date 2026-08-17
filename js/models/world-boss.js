Object.assign(World.prototype, {
    /**
     * Checks if the laser beam touches the boss.
     * @returns {boolean} True when the laser hits the boss
     */
    laserHitsBoss() {
        let laserLeft = this.gunsProjectiles.x + 10;
        let laserRight = this.gunsProjectiles.x + 10 + (this.gunsProjectiles.width - 20);
        let laserTop = this.gunsProjectiles.y + 10;
        let laserBottom = this.gunsProjectiles.y + 10 + (this.gunsProjectiles.height - 20);
        let bossLeft = this.finalBoss.x + 650;
        let bossRight = this.finalBoss.x + 650 + (this.finalBoss.width - 1300);
        let bossTop = this.finalBoss.y + 1150;
        let bossBottom = this.finalBoss.y + 1150 + (this.finalBoss.height - 1500);
        return laserRight > bossLeft &&
            laserBottom > bossTop &&
            laserLeft < bossRight &&
            laserTop < bossBottom;
    },

    /**
     * Removes health from the boss and shows win screen at zero.
     * @param {number} amount - How much health to remove
     */
    damageBoss(amount) {
        if (this.finalBoss.isDead) {
            return;
        }
        this.bossHpBar.loseHP(amount);
        this.sound.play('bossHit');

        if (this.bossHpBar.currentHP <= 0) {
            this.finalBoss.isDead = true;
            this.playBossDestroy();
        } else if (!this.finalBoss.isHit) {
            this.playBossGetHit();
        }
    },

    /**
     * Plays the get-hit animation of the boss.
     */
    playBossGetHit() {
        this.finalBoss.isHit = true;
        let getHitInterval = setInterval(() => {
            let done = this.finalBoss.getHit();
            if (done) {
                clearInterval(getHitInterval);
            }
        }, 60);
    },

    /**
     * Plays the destroy animation of the boss and shows the win screen.
     */
    playBossDestroy() {
        let destroyInterval = setInterval(() => {
            let done = this.finalBoss.destroy();
            if (done) {
                clearInterval(destroyInterval);
                this.sound.stopMusic();
                this.sound.play('win');
                document.getElementById('winOverlay').classList.add('show');
            }
        }, 60);
    },

    /**
     * Damages the boss when the laser hits it.
     */
    checkLaserHitsBoss() {
        if (!this.controls.mouseClickLeft) {
            return;
        }
        if (this.bossLaserCooldown > 0) {
            this.bossLaserCooldown--;
            return;
        }
        if (this.laserHitsBoss()) {
            this.damageBoss(5);
            this.bossLaserCooldown = 20;
        }
    },

    /**
     * Triggers the boss boxing (punch) animation every 4 seconds.
     */
    checkBossBoxing() {
        if (this.finalBoss.isDead) {
            return;
        }
        if (this.boxingCooldown > 0) {
            this.boxingCooldown--;
            return;
        }
        this.boxing.start();
        this.boxingCooldown = 240;
    },

    /**
     * Damages the character when the boxing fist hits it.
     */
    checkBoxingHitsCharacter() {
        if (!this.boxing.isActive || this.boxing.hasDamaged) {
            return;
        }
        if (this.boxingHitsCharacter()) {
            this.boxing.hasDamaged = true;
            this.damageCharacter(this.hpbar.maxHP * 0.25);
        }
    },

    /**
     * Checks if the boxing fist touches the character.
     * @returns {boolean} True when the fist hits the character
     */
    boxingHitsCharacter() {
        let boxingLeft = this.boxing.x;
        let boxingRight = this.boxing.x + this.boxing.width;
        let boxingTop = this.boxing.y;
        let boxingBottom = this.boxing.y + this.boxing.height;
        let charY = this.mainCharacter.getJumpY();
        let charLeft = this.mainCharacter.x + 106;
        let charRight = this.mainCharacter.x + 106 + (this.mainCharacter.width - 266);
        let charHead = charY + 150;
        let charFeet = charY + 150 + (this.mainCharacter.height - 244);
        return boxingRight > charLeft &&
            boxingBottom > charHead &&
            boxingLeft < charRight &&
            boxingTop < charFeet;
    },

    /**
     * Spawns new enemies when the character reaches a new section.
     */
    spawnNewEnemies() {
        let section = Math.floor(this.mainCharacter.x / 1280);
        if (section > this.lastSection && section < 2) {
            this.lastSection = section;
            let offset = section * 1280;
            for (let i = 0; i < 5; i++) {
                let e = new Enemy(this.controls);
                e.x += offset;
                if (e.x > 2400) {
                    e.x = 1600 + Math.random() * 700;
                }
                this.enemies.push(e);
            }
        }
    },

    /**
     * Spawns enemies in front of the boss area.
     */
    spawnBossAreaEnemies() {
        if (this.hasSpawnedBossEnemies || this.mainCharacter.x < 1800) {
            return;
        }
        this.hasSpawnedBossEnemies = true;
        for (let i = 0; i < 5; i++) {
            let enemy = new Enemy(this.controls);
            enemy.x = 2000 + (i * 80);
            this.enemies.push(enemy);
        }
    },
});

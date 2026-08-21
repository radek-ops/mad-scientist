class World {
    ctx;
    canvas;
    enemies;
    mainCharacter;
    finalBoss;
    gunsProjectiles;
    IMAGES_BACKGROUND = [];
    map_scroll_x = 0;
    statusBar;
    hpbar;
    bossHpBar;
    sound;

    potions;
    bombs;
    thrownBombs;
    collectedBombCount;
    collectedPotionCount;
    lastSection;
    hasSpawnedBossEnemies;
    controls;
    headBumpCooldown;
    bossLaserCooldown;
    laserSoundCooldown;
    boxing;
    boxingCooldown;

    drawY;
    isRunning = true;

    /**
     * Creates a new World and starts the game loop.
     * @param {HTMLCanvasElement} canvas - The canvas element where the game is drawn
     */
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.initWorld();
        this.draw();
    }

    /**
     * Sets up all starting values and objects of the world.
     */
    initWorld() {
        this.lastSection = 0;
        this.hasSpawnedBossEnemies = false;
        this.headBumpCooldown = 0;
        this.bossLaserCooldown = 0;
        this.laserSoundCooldown = 0;
        this.boxingCooldown = 0;

        this.addBackgroundImages();
        this.addBackgroundLayer();
        this.initBars();
        this.initPotions();
        this.initBombs();
        this.initEntities();
    }

    /**
     * Creates the status bar and health bars.
     */
    initBars() {
        this.statusBar = new StatusBar();
        this.hpbar = new HPBar();
        this.bossHpBar = new BossHPBar();
        this.sound = new Sound();
        this.sound.playMusic('mainTheme');
    }

    /**
     * Creates the potions and places them in the world.
     */
    initPotions() {
        this.potions = [
            new Potion(600 + Math.random() * 400, 420),
            new Potion(1600 + Math.random() * 400, 420),
            new Potion(0, 0)
        ];
        this.potions[2].collect(0);
        this.collectedPotionCount = 1;
    }

    /**
     * Creates the bombs and places them in the world.
     */
    initBombs() {
        this.bombs = [
            new Bomb(1000, 360, 0),
            new Bomb(1400, 360, 1),
            new Bomb(1800, 360, 2),
            new Bomb(2200, 360, 0),
            new Bomb(2450, 360, 1)
        ];
        this.collectedBombCount = 0;
        this.thrownBombs = [];
    }

    /**
     * Creates the character, enemies and boss.
     */
    initEntities() {
        this.controls = new Controls();
        this.gunsProjectiles = new GunsProjectiles(this.controls);
        this.mainCharacter = new Character(this.controls, this.gunsProjectiles);
        this.mainCharacter.world = this;
        this.initEnemies();
        this.finalBoss = new FinalBoss();
        this.boxing = new Boxing(this.finalBoss.x + 450, 450);
    }

    /**
     * Creates the enemies and spreads them across the level.
     */
    initEnemies() {
        this.enemies = [];
        for (let i = 0; i < 15; i++) {
            let enemy = new Enemy(this.controls);
            enemy.x = 400 + (i * 130);
            this.enemies.push(enemy);
        }
    }

    /**
     * Checks if two objects touch each other (collision box).
     * @param {Character} mainCharacter - The player character
     * @param {Enemy} enemies - The enemy object
     * @returns {boolean} True when they touch, otherwise false
     */
    collision(mainCharacter, enemies) {
        let charY = mainCharacter.getJumpY();
        let charLeft = mainCharacter.x + 106;
        let charRight = mainCharacter.x + 106 + (mainCharacter.width - 266);
        let charHead = charY + 150;
        let charFeet = charY + 150 + (mainCharacter.height - 244);
        let enemyLeft = enemies.x + 111;
        let enemyRight = enemies.x + 111 + (enemies.width - 226);
        let enemyHead = enemies.y + 148;
        let enemyFeet = enemies.y + 148 + (enemies.height - 226);
        if (charRight > enemyLeft &&
            charFeet > enemyHead &&
            charLeft < enemyRight &&
            charHead < enemyFeet) {
            return true;
        }
        return false;
    }

    /**
     * Clears the canvas and draws the next frame.
     */
    draw() {
        if (!this.isRunning) {
            return;
        }
        if (this.controls && this.controls.isPaused) {
            this.nextFrame();
            return;
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.map_scroll_x, 0);
        this.updateGunPosition();
        this.allfunctions();
    }

    /**
     * Places the gun in the hand of the character.
     */
    updateGunPosition() {
        let gunOffsetY = this.mainCharacter.isAboveGround() ? 70 : 180;
        this.gunsProjectiles.otherDirection = this.mainCharacter.otherDirection;
        if (this.gunsProjectiles.otherDirection) {
            this.gunsProjectiles.x = this.mainCharacter.x - 10;
            this.gunsProjectiles.y = this.calcJumpPos() + gunOffsetY;
        } else {
            this.gunsProjectiles.x = this.mainCharacter.x + 280;
            this.gunsProjectiles.y = this.calcJumpPos() + gunOffsetY;
        }
    }

    /**
     * Runs all drawing and checking steps of one frame.
     */
    allfunctions() {
        this.drawWorld();
        this.runChecks();
        this.drawUI();
        this.drawEntities();
        this.nextFrame();
    }

    /**
     * Draws the background, enemies and collectibles.
     */
    drawWorld() {
        this.addObjectToMap(this.IMAGES_BACKGROUND);
        this.addObjectToMap(this.enemies);
        this.addObjectToMap(this.bombs.filter(bomb => !bomb.isCollected));
        this.addObjectToMap(this.potions.filter(potion => !potion.isCollected && !potion.isConsumed));
    }

    /**
     * Runs all collision and spawn checks.
     */
    runChecks() {
        if (this.controls.isPaused) return; 
        this.spawnNewEnemies();
        this.spawnBossAreaEnemies();
        this.checkEnemyCollision01();
        this.checkEnemyHeadBump09();
        this.checkEnemyAttack();
        this.checkLaserEnemyCollision07();
        this.checkLaserEnemyCollision09();
        this.checkLaserEnemyCollision01();
        this.checkLaserHitsBoss();
        this.checkLaserSound();
        this.checkBossBoxing();
        this.checkBoxingHitsCharacter();

        this.checkBombCollection();
        this.checkPotionCollection();
        this.usePotion();
        this.updateThrownBombs();
        this.checkBombExplosionDamage();
    }

    /**
     * Draws the status bars and collected items at the top.
     */
    drawUI() {
        this.ctx.translate(-this.map_scroll_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.hpbar);
        this.addToMap(this.bossHpBar);
        this.addObjectToMap(this.potions.filter(potion => potion.isCollected));
        this.addObjectToMap(this.bombs.filter(bomb => bomb.isCollected));
        this.ctx.translate(this.map_scroll_x, 0);
    }

    /**
     * Draws the character, boss and gun.
     */
    drawEntities() {
        this.addToMap(this.finalBoss);
        this.addToMap(this.boxing);
        this.addToMap(this.mainCharacter);
        this.addToMap(this.gunsProjectiles);
        this.addObjectToMap(this.thrownBombs);
        this.ctx.translate(-this.map_scroll_x, 0);
    }

    /**
     * Asks the browser for the next frame.
     */
    nextFrame() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Draws one object on the canvas. Flips the image horizontally when the object faces left.
     * @param {Object} value - The object to draw
     */
    addToMap(value) {
        if (value.otherDirection) {
            this.ctx.save();
            this.ctx.translate(value.width, 0);
            this.ctx.scale(-1, 1);
            value.x = value.x * -1;
        }
        this.drawY = (value === this.mainCharacter) ? this.calcJumpPos() : value.y;
        if (value.draw) {
            value.draw(this.ctx);
        } else {
            this.ctx.drawImage(value.img, value.x, this.drawY, value.width, value.height);
        }
        if (value.otherDirection) {
            value.x = value.x * -1;
            this.ctx.restore();
        }
    }

    /**
     * Returns the y position of the character while jumping.
     * @returns {number} The current y position
     */
    calcJumpPos() {
        return this.mainCharacter.getJumpY();
    }

    /**
     * Draws a list of objects on the canvas.
     * @param {Object[]} objects - The list of objects to draw
     */
    addObjectToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        });
    }

    /**
     * Loads the level background images.
     */
    addBackgroundImages() {
        for (let i = 0; i < 3; i++) {
            let x = 1278 * i;
            this.IMAGES_BACKGROUND.push(new Background(`./img/PNG/Backgrounds/layerLevel1/${i}.png`, x));
        }
    }

    /**
     * Loads the top and bottom background layers.
     */
    addBackgroundLayer() {
        for (let i = 0; i < 3; i++) {
            let x = 1278 * i;
            this.IMAGES_BACKGROUND.push(new Background(`./img/PNG/Backgrounds/layerTop/${i}.png`, x, 0, 1920, 180));
            this.IMAGES_BACKGROUND.push(new Background(`./img/PNG/Backgrounds/layerBottom/${i}.png`, x, 600, 1920, 120));
        }
    }
}

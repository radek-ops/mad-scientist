class Sound {

    audioList = {};
    music;
    musicVolume = 0.3;


    /**
     * Creates the sound manager and loads all sounds.
     */
    constructor() {
        this.load('lazer', 'sounds/Shoot51.wav');
        this.load('explosion', 'sounds/explosion.mp3');
        this.load('jump', 'sounds/freesound_community-jump-sound-14839.mp3');
        this.load('hit', 'sounds/freesound_community-thump-105302.mp3');
        this.load('key', 'sounds/key.wav');
        this.load('playerDeath', 'sounds/player_death.wav');
        this.load('bossHit', 'sounds/freesound_community-kick-004-82333.mp3');
        this.load('enemyDeath', 'sounds/alien_death1.wav');
        this.load('mainTheme', 'sounds/01_Main_Theme_Rate.mp3');
        this.load('gameOver', 'sounds/02_Ending.mp3');
        this.load('win', 'sounds/02_Ending.mp3');
        this.setVolume('lazer', 0.5);
    }


    /**
     * Loads one sound and stores it by name.
     * @param {string} name - The name of the sound
     * @param {string} path - The path to the sound file
     */
    load(name, path) {
        this.audioList[name] = new Audio(path);
    }


    /**
     * Sets the volume of one sound.
     * @param {string} name - The name of the sound
     * @param {number} volume - The volume between 0.0 and 1.0
     */
    setVolume(name, volume) {
        if (this.audioList[name]) {
            this.audioList[name].volume = volume;
        }
    }


    /**
     * Plays a sound by its name.
     * @param {string} name - The name of the sound to play
     */
    play(name) {
        if (isMuted() || !this.audioList[name]) {
            return;
        }
        this.audioList[name].currentTime = 0;
        this.audioList[name].play();
    }


    /**
     * Starts looping background music.
     * @param {string} name - The name of the music to play
     */
    playMusic(name) {
        this.stopMusic();
        if (isMuted() || !this.audioList[name]) {
            return;
        }
        this.music = this.audioList[name];
        this.music.loop = true;
        this.music.volume = this.musicVolume;
        this.music.currentTime = 0;
        let music = this.music;
        let playPromise = music.play();
        if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(() => {
                let unlock = () => {
                    if (this.music === music) {
                        music.play();
                    }
                    document.removeEventListener('pointerdown', unlock);
                    document.removeEventListener('keydown', unlock);
                };
                document.addEventListener('pointerdown', unlock);
                document.addEventListener('keydown', unlock);
            });
        }
    }


    /**
     * Stops the current background music.
     */
    stopMusic() {
        if (this.music) {
            this.music.pause();
            this.music.currentTime = 0;
            this.music = null;
        }
    }
}
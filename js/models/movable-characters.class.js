class movableCharacters {
    x;
    y;
    img;
    characterImg;
    width;
    height;
        

    loadMainCharacterImages(path) {
        this.characterImg = new Image();
        this.characterImg.src = path;
    }

    loadImages(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {
        console.log('Moving left');

    }


}


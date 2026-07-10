class moveableCharacters {
    x;
    y;
    img;
    shootImg;    
    gunImg;
    throwBombImg;
    characterImg;
    width;
    height;
         

    loadImages(path) {
        this.img = new Image();
        this.img.src = path;
    }

    
}


class Moveables {
    x;
    y;
    img;
    shootFxImg;
    gunImg;
    throwBombImg;
    characterImg;
    width;
    height;


    loadImages(path) {
        this.img = new Image();
        this.img.src = path;
    }


    saveImages(images) {
        images.forEach((imgPath) => {
            let img = new Image();
            img.src = imgPath;
            this.imagesCache[imgPath] = img;
        });
    }

}


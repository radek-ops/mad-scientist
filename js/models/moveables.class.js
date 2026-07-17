class Moveables {
    x;
    y;
    img;
    width;
    height;
    imageCache = {};


    loadImages(path) {
        this.img = new Image();
        this.img.src = path;
    }


    saveImages(images) {
        images.forEach((imgPath) => {
            let img = new Image();
            img.src = imgPath;
            this.imageCache[imgPath] = img;
        });
    }

}


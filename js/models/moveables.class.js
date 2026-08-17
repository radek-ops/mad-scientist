class Moveables {
    x;
    y;
    img;
    width;
    height;
    imageCache = {};


    loadImages(imgPath) {
        this.img = new Image();
        this.img.src = imgPath;
    }


    saveImages(images) {
        images.forEach((imgPath) => {
            let img = new Image();
            img.src = imgPath;
            this.imageCache[imgPath] = img;
        });
    }

         

}


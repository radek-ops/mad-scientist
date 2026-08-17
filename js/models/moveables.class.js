class Moveables {
    x;
    y;
    img;
    width;
    height;
    imageCache = {};
  
    currentIdleImages = 0;
    currentWalkImages = 0;


    /**
     * Loads one single image.
     * @param {string} imgPath - The path to the image
     */
    loadImages(imgPath) {
        this.img = new Image();
        this.img.src = imgPath;
    }


    /**
     * Loads many images and stores them in the cache.
     * @param {string[]} images - The list of image paths
     */
    saveImages(images) {
        images.forEach((imgPath) => {
            let img = new Image();
            img.src = imgPath;
            this.imageCache[imgPath] = img;
        });
    }

     /**
     * Starts the animation loop at 60 frames per second.
     */
    startAnimation() {
        setInterval(() => {
            this.startAnimationUpdate();
        }, 1000 / 60);
    }
         

}


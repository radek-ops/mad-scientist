class Moveables {
    x;
    y;
    img;
    width;
    height;
    imageCache = {};
  
    currentIdleImages = 0;
    currentWalkImages = 0;


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

     startAnimation() {
        setInterval(() => {
            this.startAnimationUpdate();
        }, 1000 / 60);
    }
         

}


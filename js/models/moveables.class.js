class Moveables {
    x;
    y;
    img;
    width;
    height;
    imageCache = {};
    currentIdleImages = 0;
    currentWalkImages = 0;
    COLLISION = { left: 0, shrinkX: 0, top: 0, shrinkY: 0 };

    /**
     * Returns the collision box (left, right, top, bottom) of this object.
     * The box is shrunk by the offsets defined in COLLISION.
     * @returns {{left:number, right:number, top:number, bottom:number}} The box
     */
    getCollisionBox() {
        let o = this.COLLISION;
        let topY = this.getJumpY ? this.getJumpY() : this.y;
        let boxLeft = this.x + o.left;
        return {
            left: boxLeft,
            right: boxLeft + (this.width - o.shrinkX),
            top: topY + o.top,
            bottom: topY + o.top + (this.height - o.shrinkY)
        };
    }

    /**
     * Loads a single image and sets it as the current image of this object.
     * @param {string} imgPath - The path to the image file
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
       window.startAnimation =  setInterval(() => {
            this.startAnimationUpdate();
        }, 1000 / 60);
    }

}
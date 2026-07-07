class Shoot extends moveableCharacters {

    
    controls;

    constructor(controls) {
        super();
        this.controls = controls;
        
        
        this.characterShoots();
        
    }

   
    characterShoots() {
        setInterval(() => {
            let mouseClickLeft = (this.mouseClickLeft) ? this.IMAGES_PROJECTILE : false;
            let mouseClickRight = (this.mouseClickRight) ? this.IMAGES_THROWBOMB : false;
            if (this.mouseClickLeft) {
            }

        }, 100);
    }
}
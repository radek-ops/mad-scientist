class KeyInput {



    constructor() {
        this.keys = {};
        window.addEventListener('keydown', (event) => {
            this.keys[event.key] = true;
            



        });



    }

}

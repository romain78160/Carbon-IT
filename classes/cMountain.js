

module.exports =  class cMountain {
    //propriétés privées
    #posX;
    #posY;

    constructor(_X = 0, _Y = 0) {
        this.#posX = _X;
        this.#posY = _Y;
    }

    get X(){
        return this.#posX;
    }
    set X(_X){
        this.#posX = _X;
    }

    get Y(){
        return this.#posY;
    }
    set Y(_Y){
        this.#posY = _Y;
    }

    toString() {
        return "M - "+this.#posX+" - "+this.#posY;
    }

 }
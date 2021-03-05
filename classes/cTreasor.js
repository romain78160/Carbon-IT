

module.exports =  class cMountain {

    //propriétés privées
    #posX;
    #posY;
    #nb; //nombre de tresors sur la mm coordonnées

    constructor(_X = 0, _Y = 0, _nb = 0) {
        this.#posX = _X;
        this.#posY = _Y;
        this.#nb = _nb;
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

    get nb(){
        return this.#nb;
    }
    set nb(_nb){
        this.#nb = _nb;
    }
    toString() {
        return "T - "+this.#posX+" - "+this.#posY+" - "+this.#nb;
    }

 }
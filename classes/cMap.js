const { result } = require("underscore");


module.exports =  class cMap {

    //propriétés privées
    #height;
    #width;
    #mountainList;
    #treasorList;
    #adventurerList;

    constructor(_height = 0, _width = 0) {
        this.#height = _height;
        this.#width  = _width;
        this.#mountainList = new Array(0);
        this.#treasorList = new Array(0);
        this.#adventurerList = new Array(0);
    }

    get height(){
        return this.#height;
    }
    set height(_height){
        this.#height = _height;
    }

    get width(){
        return this.#width;
    }
    set width(_width){
        this.#width = _width;
    }

    get mountainList(){
        return this.mountainList;
    }
    addMountain(aMountain){
        this.#mountainList.push(aMountain);
    }

    get treasorList(){
        return this.#treasorList;
    }
    addTreasor(aTreasor){
        this.#treasorList.push(aTreasor);
    }

    get adventurerList(){
        return this.#adventurerList;
    }
    addAdventurer(aAdventurer){
        this.#adventurerList.push(aAdventurer);
    }

    moveAdventurer(){
        //deplacement des aventuriers
        this.#adventurerList
        .filter(aAdventurer => {
            return aAdventurer.mouv.length > 0;
        })
        .forEach(aAdventurer => {
            var nextPos = aAdventurer.nextPos();

            //check de sortie de carte
            let bStayInMap = (nextPos.X <= this.#width) && (nextPos.Y <= this.#height);
            if (bStayInMap) {

                //check de la nextPos avec une position de montagne
                let aMountain = this.#mountainList.find(m => m.X == nextPos.X && m.Y == nextPos.Y);
                if(!aMountain){// si montagne est NON définie alors peut avancer

                    //check de la nextPos avec une position d'un aventurier
                    //recup de tous les aventuriers sauf lui mm
                    let adventTempList = this.#adventurerList.filter(ad => ad !== aAdventurer);

                    let otherAdventurer = adventTempList.find(ad => ad.X == aAdventurer.X && ad.Y == aAdventurer.Y);
                    if(!otherAdventurer){
                        aAdventurer.deplacer(nextPos.X, nextPos.Y);

                        if(this.#treasorList.length > 0){
                            //test position trésors
                            let aTreasor = this.#treasorList.find(t => t.X == aAdventurer.X && t.Y == aAdventurer.Y);
                            if (aTreasor) {//si aTreasor est définie alors le personnage se trouve sur un trésors
                                //ramasse le trésors
                                aAdventurer.nbTreasor++;
                                //suppression du trésors
                                aTreasor.nb--;

                                if (aTreasor.nb == 0) {
                                    //suppression du trésors de la carte
                                    this.#treasorList = this.#treasorList.filter(t => t !== aTreasor);
                                }
                            }
                        }
                    }

                }



            }//sinon ne peut pas se deplacer alors mouvement suivant


        });
    }

    toString() {

        var linesArray = [];
        linesArray.push("C - "+this.#width+" - "+this.#height);

        this.#mountainList.forEach(aMountain => {
            linesArray.push(aMountain.toString());
        });

        this.#treasorList.forEach(aTreasor => {
            linesArray.push(aTreasor.toString());
        });

        this.#adventurerList.forEach(aAdventurer => {
            linesArray.push(aAdventurer.toString());
        });

        return linesArray.join("\n");

    }

 }
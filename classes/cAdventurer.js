
const dirList = ['N','E','S','O'];

module.exports =  class cAdventurer {

    #name;
    #posX;
    #posY;
    #dir;// orientation
    #mouv;// liste des déplacements
    #nbTreasor; // nombre de trésors ramassé

    constructor(_name = '', _X=0, _Y=0, _dir='', _mouv='') {
        this.#name = _name;
        this.#posX = _X;
        this.#posY = _Y;
        this.#dir = _dir; // 'N','E','S','O'
        this.#mouv = _mouv; // AADADA
        this.#nbTreasor = 0;
    }

    get name(){
        return this.#name;
    }
    set name(_name){
        this.#name = _name;
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

    get dir(){
        return this.#dir;
    }
    set dir(_dir){
        this.#dir = _dir;
    }

    get mouv(){
        return this.#mouv;
    }
    set mouv(_mouv){
        this.#mouv = _mouv;
    }

    get nbTreasor(){
        return this.#nbTreasor;
    }
    set nbTreasor(_nbTreasor){
        this.#nbTreasor = _nbTreasor;
    }

    nextPos(){

        //init des coordonnée avec celle en cours
        var result = {
            X : this.#posX,
            Y : this.#posY
        };

        if(this.#mouv[0] == 'A'){
            //alors Avancer d'une case
            switch (this.#dir) {
                case 'N':
                    if(result.Y > 0){
                        result.Y--;
                    }
                    break;
    
                case 'E':
                    result.X++;
                    break;
    
                case 'S':
                    result.Y++;
                    break;
    
                case 'O':
                    if(result.X > 0){
                        result.X--;
                    }
                    break;
                default:
                    break;
            }
            //TODO : suppression du mouvement effetcué
            this.#mouv = this.#mouv.substring(1);
        }else{
            //sinon tourner à gauche ou a droite et changer la dirs
            let idxDir = dirList.indexOf(this.#dir);

            if(this.#mouv[0] == 'D'){
                idxDir++;
            }else{
                if (this.#mouv[0] == 'G'){
                    idxDir--;
                }
            }

            if(idxDir > dirList.length-1)
            {
                idxDir = 0;
            }else{
                if (idxDir < 0) {
                    idxDir = dirList.length-1;
                }
            }
            this.#dir = dirList[idxDir];

            //TODO : suppression du mouvement effetcué
            this.#mouv = this.#mouv.substring(1);

            return this.nextPos();
        }

        return result;
    }

    deplacer(X, Y){
        this.#posX = X;
        this.#posY = Y;
    }

    toString() {
        return "A - "+this.#name+" - "+this.#posX+" - "+this.#posY+" - "+this.#dir+" - "+this.#nbTreasor;
    }

 }
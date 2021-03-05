// Imports

var env       = process.env.NODE_ENV || 'development';
var config    = require('../config/config.json')[env];


const fs = require("fs");
const readline = require("readline");

const map = require("../classes/cMap");
const mountain = require("../classes/cMountain");
const treasor = require("../classes/cTreasor");
const adventurer = require("../classes/cAdventurer");


// Routes
module.exports = {

  homePage : function(req, res, next){
    res.render("index", { title: 'Carbon-IT | Test', messageFlash: '', baseurl: config.baseurl });
  },

  launch : function(req, res, next){

    // Lecture du fichier d'entrée (inputFile.txt)

    async function processInputFile() {
      const fileStream = fs.createReadStream('Inputfile.txt');

      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      });

      //map par defaut (w:0, h:0)
      var aMap = new map();

      for await (const line of rl) {

        var lineTab = line.split(' - ');

        //test de la 1ere lettre pour connaitre le type
        switch (lineTab[0]) {

          case 'C'://map
            aMap.width = parseInt(lineTab[1]);
            aMap.height = parseInt(lineTab[2]);
            break;

          case 'M'://mountain
            var aMountain = new mountain(parseInt(lineTab[1]), parseInt(lineTab[2]));
            aMap.addMountain(aMountain);
            break;

          case 'T'://treasor
            var aTreasor = new treasor(parseInt(lineTab[1]), parseInt(lineTab[2]), parseInt(lineTab[3]));
            aMap.addTreasor(aTreasor);
            break;

          case 'A'://adventurer
            var aAdventurer = new adventurer(lineTab[1], parseInt(lineTab[2]), parseInt(lineTab[3]), 
                                            lineTab[4], lineTab[5]);
            aMap.addAdventurer(aAdventurer);
            break;
  
          case '#'://commentaires
            //commentaire -> ligne ignoré
            break;
            
          default:
            console.log("type of "+lineTab[0]+" not found :"+line);
            break;
        }

      }


      do {
        
        aMap.moveAdventurer();

        var curList = aMap.adventurerList.filter(aAdventurer => {
          return aAdventurer.mouv.length > 0;
        });

      } while (curList.length > 0);//tant que il y a des aventuriers qui ont des mouvements

      
      var resultStr = aMap.toString();

      fs.writeFile('OutputFile.txt', resultStr, function (err) {

        if (err){
          res.status(200).json(err);
          throw err;
        }
        
        res.status(200).json({});
     });

    }

    processInputFile();

  }

}
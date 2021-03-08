// Imports

var env       = process.env.NODE_ENV || 'development';
var config    = require('../config/config.json')[env];


const fs = require("fs");
const readline = require("readline");
const moment    = require('moment');

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

    var dir = __dirname + '/../games';

    if (!fs.existsSync(dir)) 
      {fs.mkdirSync(dir);}
    const lengthGame = fs.readdirSync(dir).length;

    //creation d'un dossier de jeu avec la date du moment
    var currentDate = moment().format("DDMMYYYY_HHmmss");  
    var rootDir = dir+"/"+lengthGame+"_"+currentDate;
    if (!fs.existsSync(rootDir)) 
      {fs.mkdirSync(rootDir);}

    //écriture du fichier d'entrée
    async function writeInputfile(_rootDir, data){
      var writer = fs.createWriteStream(rootDir+"/Inputfile.txt", {flags:'a'});
      
      //map
      writer.write(`C - ${data.map.w} - ${data.map.h}\n`);

      //mountains
      data.mountainList.forEach(aMount => {
        writer.write(`M - ${aMount.X} - ${aMount.Y}\n`);
      });

      //treasors
      data.treasorList.forEach(aTreasor => {
        writer.write(`T - ${aTreasor.X} - ${aTreasor.Y} - ${aTreasor.nb}\n`);
      });

      //adventurers
      data.adventurerList.forEach(aAdventurer => {
        writer.write(`A - ${aAdventurer.name} - ${aAdventurer.X} - ${aAdventurer.Y} - ${aAdventurer.dir} - ${aAdventurer.mouv}\n`);
      });

      writer.end();
    }
    writeInputfile(rootDir, req.body);
    

    async function processInputFile(_inputFile) {
      const fileStream = fs.createReadStream(_inputFile);

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

      var dir = require('path').dirname(_inputFile);
      fs.writeFile(dir+'/OutputFile.txt', resultStr, function (err) {

        if (err){
          res.status(200).json(err);
          throw err;
        }
        
        res.status(200).json({});
     });

    }

    processInputFile(rootDir+"/Inputfile.txt");

  }

}
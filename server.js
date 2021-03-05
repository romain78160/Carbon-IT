// Imports
const express = require('express');
const path = require('path');
const bodyParser  = require('body-parser');
const ent = require('ent'); // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)

const env         = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];

const router   = require('./router').router;

const app = express();

app.use(express.static(__dirname + '/public'));

app.use(express.static(__dirname + '/utils'));//ajoute le dossier dans les recherche de ressources (fichiers .js)

app.set('views', [
                        path.join(__dirname, 'views'),
                        path.join(__dirname, 'utils')//permet le chargment des ejs
                    ]
        );
app.set('view engine', 'ejs');

// Body Parser configuration
app.use(bodyParser.urlencoded({ extended: true }));//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.json());// support parsing of application/json type post data

// Router
app.use(router);

// Launch server
app.listen(config.serverport, function() {
    console.log('Serveur en écoute sur : http://localhost:'+ config.serverport);
});

// module.exports = app; //pour les test
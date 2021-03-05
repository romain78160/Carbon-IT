// Imports
var express         = require('express');

const MainCtrl = require('./controllers/MainCtrl');

// Router
exports.router = (function() {
  var router = express.Router();

  // homepage
  router.route('/').get(MainCtrl.homePage);
  router.route('/launch').post(MainCtrl.launch);

  return router;
})();

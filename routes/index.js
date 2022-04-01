var express = require('express');
var router = express.Router();
const bookController = require('../controllers/bookController');

/* GET home page. */
router.get('/', function(request, response, next){
    response.render('index', {title : "Express"});
});

module.exports = router;

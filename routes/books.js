var express = require('express');
var router = express.Router();
const bookController = require('../controllers/bookController');

var multer = require('multer');
let dateNow = Date.now();
let storageFile = multer.diskStorage({

    destination: function(request, file, callback){
        callback(null, './public/images/');
    },
    filename: function(request, file, callback){
        console.log(file);
        callback(null, dateNow+"_"+file.originalname);
    }
});

var upload = multer({storage: storageFile});

/* GET home page. */
router.get('/', bookController.index);

router.get('/create', bookController.create);

router.post('/', upload.single("image"),  bookController.saveData);

router.post('/delete/:id', bookController.deleteData);

router.get('/edit/:id', bookController.editData);

router.post('/update', upload.single('image'), bookController.update);

module.exports = router;

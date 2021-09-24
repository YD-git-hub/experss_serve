var express=require("express");
var router = express.Router();
var cate =require('../controllers/cateControsign');

router.post('/sign',cate._sign);

module.exports = router;
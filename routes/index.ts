var express = require('express');
var router = express.Router();
var cate =require('../controllers/cateController')

/* GET home page. */
router.post('/login',cate.Login);
router.get('/Code',cate.Code);

module.exports = router;

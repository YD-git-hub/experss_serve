var express = require('express');
var router = express.Router();
var cate =require('../controllers/cateController')

/* GET home page. */
router.post('/login',cate.Login);

module.exports = router;

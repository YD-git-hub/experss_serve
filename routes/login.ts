var express = require('express');
var router = express.Router();
var cate =require('../controllers/cateContrologin')

/* GET home page. */
router.post('/login',cate._Login);
router.get('/Code',cate._Code);

module.exports = router;

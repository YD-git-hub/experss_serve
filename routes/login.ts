import express from "express"
var router = express.Router();
import * as cate from "../controllers/cateContrologin"

/* GET home page. */
router.post('/login',cate._Login);
router.get('/code',cate._Code);

export default router;

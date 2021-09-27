import express from "express"
var router = express.Router();
import * as cate from "../controllers/cateControsign"

router.post('/sign',cate._sign);

// module.exports = router;
export default router;
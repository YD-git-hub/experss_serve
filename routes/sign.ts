import express from "express"
var router = express.Router();
import * as cate from "../controllers/cateControsign"

router.post('/sign',cate._sign);
router.post('/aa',cate._aa);

// module.exports = router;
export default router;
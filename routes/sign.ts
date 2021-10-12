import express from "express"
const router = express.Router();
import * as cate from "../controllers/cateControsign"

router.post('/sign',cate._sign);
router.post('/aa',cate._aa);

export default router;
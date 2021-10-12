import multer from "multer";
import path from "path";
import express from "express"
import {_uploder} from "../controllers/cateControUploder"
const router = express.Router();
const uploader =multer({dest:path.join(path.dirname(__dirname),'public','images')});
router.post('/uploadimg',uploader.single('photoImg'),_uploder);

export default router;
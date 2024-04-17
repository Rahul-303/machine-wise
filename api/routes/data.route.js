import express from'express';
import {getData} from '../controllers/data.controller.js';
const router = express.Router();

// router.get('/', test);
router.get('/', getData);
export default router;
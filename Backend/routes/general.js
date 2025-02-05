import express from 'express';
import { messMenu } from '../controllers/general.js';

const router = express.Router();

router.get("/mess-menu", messMenu);

export default router;
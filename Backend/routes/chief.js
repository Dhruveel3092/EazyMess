import express from 'express';
import { addAccountant, changeMenu } from '../controllers/chief.js';

const router = express.Router();

router.post('/add-accountant', addAccountant);
router.put("/change-menu/:day", changeMenu);

export default router;
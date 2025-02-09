import express from 'express';
import { addAccountant, changeMenu, getSignatureForUpload, uploadNotice } from '../controllers/chief.js';

const router = express.Router();

router.post('/add-accountant', addAccountant);
router.post('/upload-notice', uploadNotice);
router.put("/change-menu/:day", changeMenu);
router.get("/get-signature", getSignatureForUpload);

export default router;
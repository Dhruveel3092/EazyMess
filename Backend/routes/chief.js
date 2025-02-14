import express from 'express';
import { addAccountant, changeMenu, getSignatureForUpload, uploadNotice, resolveComplaint } from '../controllers/chief.js';

const router = express.Router();

router.post('/add-accountant', addAccountant);
router.post('/upload-notice', uploadNotice);
router.put("/change-menu/:day", changeMenu);
router.get("/get-signature", getSignatureForUpload);
router.post("/resolve-complaint", resolveComplaint);

export default router;
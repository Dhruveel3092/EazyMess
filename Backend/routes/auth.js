import express from 'express';
import { googleLogin, login, register, forgotPassword, resetPassword, chiefWardenRegister } from '../controllers/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google-login', googleLogin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/chief-warden-register", chiefWardenRegister);
router.post("/logout", (req, res) => {
  res.clearCookie("accessToken", { sameSite: 'none', secure: true });
  res.clearCookie("refreshToken", { sameSite: 'none', secure: true });
  res.json({ message: "Logged out successfully." });
});

export default router;
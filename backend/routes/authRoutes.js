import express from "express";
import { getMe, loginUser, registerUser, requestRegistrationOTP, updateProfile, verifyRegistrationOTP } from "../controllers/authController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/register/request-otp', requestRegistrationOTP);
router.post('/register/verify-otp', verifyRegistrationOTP);
router.post('/login', loginUser);
router.get('/me', auth, getMe);
router.put('/profile', auth, updateProfile);

export default router;
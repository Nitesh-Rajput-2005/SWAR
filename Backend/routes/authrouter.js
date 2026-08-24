import express from "express";

import {
    login,
    signup,
    verifyOTP,
    resendOTP
} from "../controllers/authcontroller.js";

const router = express.Router();

import {
    signupvalidation,
    loginvalidation
} from "../middlewares/authvalidation.js";

router.post("/login", loginvalidation, login);

router.post("/signup", signupvalidation, signup);

router.post("/verify-otp", verifyOTP);

router.post("/resend-otp", resendOTP);

export default router;
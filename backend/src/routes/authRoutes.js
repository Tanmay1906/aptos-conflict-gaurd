
import { Router } from "express";
import { register, login, getMe, logout, updateWalletAddress } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import { registerValidation, loginValidation, validate } from "../middleware/validation.js";
import { loginLimiter } from "../middleware/rateLimiter.js";

const router = Router();

// Debug route to test JSON body parsing
router.post('/test-body', (req, res) => {
  res.json({ receivedBody: req.body });
});

router.post("/register", validate(registerValidation), register);

router.post(
  "/login",
  loginLimiter,
  validate(loginValidation),
  login
);

// GET login (for browser clarity)
router.get("/login", (req, res) => {
  res.status(405).json({
    success: false,
    message: "Use POST /api/v1/auth/login to log in."
  });
});

router.get("/me", protect, getMe);
router.get("/logout", protect, logout);
router.put("/wallet", protect, updateWalletAddress);

export default router;

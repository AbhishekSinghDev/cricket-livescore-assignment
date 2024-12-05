import express from "express";
import { logIn, signUp } from "../controller/auth";
import { refreshTokenMiddleware } from "../middleware/auth";
import { userLoginSignupRateLimiterMiddleware } from "../middleware";

const router = express.Router();

router.post("/signup", userLoginSignupRateLimiterMiddleware, signUp);
router.post("/login", userLoginSignupRateLimiterMiddleware, logIn);
router.post(
  "/refresh-token",
  userLoginSignupRateLimiterMiddleware,
  refreshTokenMiddleware
);

export default router;

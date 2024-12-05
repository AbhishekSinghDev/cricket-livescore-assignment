import express from "express";
import { authenticateToken } from "../middleware/auth";
import { getProfile } from "../controller/user";

const router = express.Router();

router.get("/profile", authenticateToken, getProfile);

export default router;

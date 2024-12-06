import express from "express";
import {
  getAllMatchesId,
  getLastBallsDetails,
  getMatchDetails,
  updateBallDetails,
} from "../controller/match";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

router.get("/all-matches", getAllMatchesId);
router.post("/last-balls", getLastBallsDetails);
router.post("/match-details", getMatchDetails);
router.post("/update-ball-details", authenticateToken, updateBallDetails);

export default router;

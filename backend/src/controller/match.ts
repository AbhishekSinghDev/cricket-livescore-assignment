import { Request, Response } from "express";
import { AuthRequest } from "../types";
import { BallDetailsValidationSchema } from "../validations/match";
import Match from "../model/match";
import BallDetails from "../model/ball-detail";
import { io } from "../index";
import SocketEvents from "../lib/socket-events";

const getMatchDetails = async (req: Request, res: Response) => {
  const { matchId } = req.body;

  if (!matchId) {
    res.status(400).json({
      success: false,
      message: "matchId not provided",
    });
    return;
  }

  try {
    const match = await Match.findById(matchId);

    if (!match) {
      res.status(404).json({
        success: false,
        message: "match not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "match found",
      data: {
        match: match,
      },
    });

    return;
  } catch (err) {
    console.log("[server]: ", err);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
    return;
  }
};

const getLastBallsDetails = async (req: Request, res: Response) => {
  const { balls } = req.body;

  if (balls && typeof balls !== "number") {
    res.status(400).json({
      success: false,
      message: "expected number received someother type",
    });
    return;
  }

  try {
    const ballsCount = Number(balls ?? 24);

    const ballsData = await BallDetails.find()
      .limit(ballsCount)
      .sort({ _id: -1 });

    io.emit(SocketEvents.lastballs_update, { balls: ballsData });

    res.status(200).json({
      success: true,
      message: "balls fetched successfully",
      data: {
        balls: ballsData,
      },
    });

    return;
  } catch (err) {
    console.log("[server]: ", err);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
    return;
  }
};

const updateBallDetails = async (req: AuthRequest, res: Response) => {
  try {
    const result = BallDetailsValidationSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: "validation failed",
        errors: result.error.flatten(),
      });
      return;
    }

    const { matchId, runs, wicket, extras, wicketType, extraType } =
      result.data;

    // check weither match exists or not
    const match = await Match.findById(matchId);
    if (!match) {
      res.status(404).json({
        success: false,
        message: "match not found",
      });
      return;
    }

    const currentInnings =
      match.currentInnings === "team1" ? match.team1 : match.team2;

    if (!currentInnings) return;

    const newBallDetail = new BallDetails({
      matchId: matchId,
      runs: runs,
      wicket: wicket,
      extras: extras,
      wicketType: wicketType,
      extraType: extraType,
    });

    await newBallDetail.save();

    currentInnings.score += runs + (extras || 0);

    const striker = match.currentBatsmen.find((item) => item.isOnStrike);
    if (!striker) return;

    if (match.currentBatsmen.length > 0) {
      //   const striker = match.currentBatsmen[0];
      striker.runs += runs;
      striker.ballsFaced += 1;

      if (runs === 4) striker.fours += 1;
      if (runs === 6) striker.sixes += 1;

      striker.strikeRate = (striker.runs / striker.ballsFaced) * 100;

      // if runs are odd then swtich the strikers
      if (runs % 2) {
        striker.isOnStrike = false;
        const otherBatsmen = match.currentBatsmen.find(
          (item) => item._id !== striker._id
        );

        // by the way this is compulsory that other batsman with isOnStrike will be present there this condition will never be hitted. just for typescript safety adding this.
        if (!otherBatsmen) return;
        otherBatsmen.isOnStrike = true;
      }
    }

    if (match.currentBowler) {
      match.currentBowler.runsConceded += runs + (extras || 0);

      match.currentBowler.overs += 1;

      if (wicket) {
        match.currentBowler.wickets += 1;
        currentInnings.wickets += 1;
      }

      match.currentBowler.economy =
        match.currentBowler.runsConceded / match.currentBowler.overs;
    }

    // Add commentary
    const msg = `${match.currentBowler?.name} To ${
      striker.name
    }: ${runs} run. ${extras ? `+ ${extras} ${extraType}` : ""} ${
      wicket && `wicket: ${wicketType}`
    }`;

    match.ballByBallCommentary.push({
      runs: runs,
      ball: match.ballByBallCommentary.length + 1,
      commentry: msg,
      timestamp: new Date(),
    });

    await match.save();

    io.emit("matchUpdate", match);

    res.json({
      success: true,
      message: "Ball details updated successfully",
      data: match,
    });
  } catch (err) {
    console.log("[server]: ", err);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
    return;
  }
};

const getAllMatchesId = async (req: Request, res: Response) => {
  try {
    const matches = await Match.find({});

    let ids: string[] = [];
    matches.map((item) => ids.push(item._id.toString()));

    res.status(200).json({
      success: true,
      message: "machtes fetched successfully",
      data: ids,
    });

    return;
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
    return;
  }
};

export {
  getAllMatchesId,
  getMatchDetails,
  getLastBallsDetails,
  updateBallDetails,
};

import mongoose from "mongoose";

const BallDetailsSchema = new mongoose.Schema({
  matchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match",
    required: true,
  },
  runs: {
    type: Number,
    default: 0,
  },
  extras: {
    type: Number,
    default: 0,
  },
  extraType: {
    type: String,
    enum: ["wide", "no-ball", "bye", "leg-bye", null],
    default: null,
  },
  wicket: {
    type: Boolean,
    default: false,
  },
  wicketType: {
    type: String,
    enum: ["bowled", "caught", "lbw", "run-out", "stumped", null],
    default: null,
  },
});

const BallDetails = mongoose.model("BallDetails", BallDetailsSchema);
export default BallDetails;

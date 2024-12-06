import mongoose from "mongoose";

const BowlerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  overs: {
    type: Number,
    default: 0,
  },
  runsConceded: {
    type: Number,
    default: 0,
  },
  wickets: {
    type: Number,
    default: 0,
  },
  economy: {
    type: Number,
    default: 0,
  },
});

const BatsmanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  runs: {
    type: Number,
    default: 0,
  },
  ballsFaced: {
    type: Number,
    default: 0,
  },
  fours: {
    type: Number,
    default: 0,
  },
  sixes: {
    type: Number,
    default: 0,
  },
  strikeRate: {
    type: Number,
    default: 0,
  },
  isOnStrike: {
    type: Boolean,
    default: false,
  },
});

const MatchSchema = new mongoose.Schema({
  team1: {
    name: String,
    score: {
      type: Number,
      default: 0,
    },
    wickets: {
      type: Number,
      default: 0,
    },
  },
  team2: {
    name: String,
    score: {
      type: Number,
      default: 0,
    },
    wickets: {
      type: Number,
      default: 0,
    },
  },

  currentBatsmen: [BatsmanSchema],
  currentBowler: BowlerSchema,
  ballByBallCommentary: [
    {
      runs: Number,
      ball: Number,
      commentry: String,
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  currentInnings: {
    type: String,
    enum: ["team1", "team2"],
    required: true,
  },
  status: {
    type: String,
    enum: ["ongoing", "completed"],
    default: "ongoing",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Match = mongoose.model("Match", MatchSchema);
export default Match;

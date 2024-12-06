import "dotenv/config";

import mongoose from "mongoose";
import User from "./model/user";
import Match from "./model/match";
import { hashPassword } from "./utils";
import Env, { verifyEnv } from "./lib/env";
import connectDatabase from "./lib/connect-db";

// Seed data
const seedData = {
  users: [
    {
      email: "admin@cricket.com",
      password: "$2a$10$/6koV/equz.ushOVdj3MnuChyNaxRL4BB2RbN3A08QW6KkKPZGhHu", // password1
    },
    {
      email: "scorer@cricket.com",
      password: "$2a$10$xEe8rHuTm674cQ8qLlSO9eHp2Vd8VElpyRrot1halXvFlYWNjrlMi", // password2
    },
  ],
  matches: [
    {
      team1: {
        name: "Mumbai Indians",
        score: 0,
        wickets: 0,
      },
      team2: {
        name: "Chennai Super Kings",
        score: 0,
        wickets: 0,
      },
      currentBatsmen: [
        {
          name: "Rohit Sharma",
          runs: 0,
          ballsFaced: 0,
          fours: 0,
          sixes: 0,
          strikeRate: 0,
          isOnStrike: true,
        },
        {
          name: "Ishan Kishan",
          runs: 0,
          ballsFaced: 0,
          fours: 0,
          sixes: 0,
          strikeRate: 0,
          isOnStrike: false,
        },
      ],
      currentBowler: {
        name: "Deepak Chahar",
        overs: 0,
        runsConceded: 0,
        wickets: 0,
        economy: 0,
      },
      ballByBallCommentary: [],
      currentInnings: "team1",
      status: "ongoing",
    },
  ],
  batsmen: [
    {
      name: "Rohit Sharma",
      runs: 0,
      ballsFaced: 0,
      fours: 0,
      sixes: 0,
      strikeRate: 0,
      isOnStrike: true,
    },
    {
      name: "Ishan Kishan",
      runs: 0,
      ballsFaced: 0,
      fours: 0,
      sixes: 0,
      strikeRate: 0,
      isOnStrike: false,
    },
    {
      name: "MS Dhoni",
      runs: 0,
      ballsFaced: 0,
      fours: 0,
      sixes: 0,
      strikeRate: 0,
      isOnStrike: false,
    },
    {
      name: "Ruturaj Gaikwad",
      runs: 0,
      ballsFaced: 0,
      fours: 0,
      sixes: 0,
      strikeRate: 0,
      isOnStrike: false,
    },
  ],
  bowlers: [
    {
      name: "Deepak Chahar",
      overs: 0,
      runsConceded: 0,
      wickets: 0,
      economy: 0,
    },
    {
      name: "Jasprit Bumrah",
      overs: 0,
      runsConceded: 0,
      wickets: 0,
      economy: 0,
    },
    {
      name: "Ravindra Jadeja",
      overs: 0,
      runsConceded: 0,
      wickets: 0,
      economy: 0,
    },
    {
      name: "Shardul Thakur",
      overs: 0,
      runsConceded: 0,
      wickets: 0,
      economy: 0,
    },
  ],
};

// Seed database function
async function seedDatabase() {
  try {
    verifyEnv();
    await connectDatabase();

    // Clear existing data
    await User.deleteMany({});
    await Match.deleteMany({});

    // Seed users
    const seedUsers = await User.insertMany(seedData.users);
    console.log("Users seeded:", seedUsers.length);

    // Seed matches
    const seedMatches = await Match.insertMany(seedData.matches);
    console.log("Matches seeded:", seedMatches.length);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Seeding error:", error);
  } finally {
    await mongoose.connection.close();
  }
}

seedDatabase();

// Export for potential module usage
export default seedDatabase;

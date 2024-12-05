import mongoose from "mongoose";
import Env from "./env";

const connectDatabase = async () => {
  const DB_URL = Env.DB_URL;
  try {
    const conn = await mongoose.connect(DB_URL, {
      dbName: "cricket-live-score",
    });
    console.log(
      `[server]: Database connected successfully. Host: ${conn.connection.host}`
    );
  } catch (err) {
    console.log("[server]: ", err);
    throw new Error("Failed to connect database");
  }
};

export default connectDatabase;

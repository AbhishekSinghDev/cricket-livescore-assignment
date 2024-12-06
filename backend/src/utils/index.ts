import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Env from "../lib/env";
import { Request, Response, NextFunction } from "express";

const ACCESS_TOKEN_SECRET = Env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = Env.REFRESH_TOKEN_SECRET;

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateAccessToken = (userId: string, email: string): string => {
  return jwt.sign({ userId, email }, ACCESS_TOKEN_SECRET, { expiresIn: "7h" });
};

export const generateRefreshToken = (userId: string, email: string): string => {
  return jwt.sign({ userId, email }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

// Error handling middleware
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong",
    message: err.message,
  });
};

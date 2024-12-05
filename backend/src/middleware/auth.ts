import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AuthRequest, TokenPayload } from "../types";
import Env from "../lib/env";
import User from "../model/user";
import { generateAccessToken, generateRefreshToken } from "../utils";

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const ACCESS_TOKEN_SECRET = Env.ACCESS_TOKEN_SECRET;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Access token required" });
    return;
  }

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as TokenPayload;

    req.user = {
      userId: decoded.userId,
      email: decoded.email,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: "Access token expired" });
      return;
    }
    res.status(403).json({ error: "Invalid access token" });
  }
};

export const refreshTokenMiddleware = async (req: Request, res: Response) => {
  const REFRESH_TOKEN_SECRET = Env.REFRESH_TOKEN_SECRET;
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(401).json({ error: "Refresh token required" });
    return;
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET
    ) as TokenPayload;

    // Check if user exists
    const user = await User.findById(decoded.userId);
    if (!user) {
      res.status(403).json({ error: "User not found" });
      return;
    }

    // Generate new access and refresh tokens
    const newAccessToken = generateAccessToken(user._id.toString(), user.email);
    const newRefreshToken = generateRefreshToken(
      user._id.toString(),
      user.email
    );

    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
    return;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res
        .status(401)
        .json({ error: "Refresh token expired. Please login again." });
      return;
    }

    res.status(403).json({ error: "Invalid refresh token" });
    return;
  }
};

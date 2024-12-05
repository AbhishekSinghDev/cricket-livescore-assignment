import { Request } from "express";

export interface TokenPayload {
  userId: string;
  email: string;
}

export interface RefreshTokenDocument extends Document {
  token: string;
  userId: string;
}

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

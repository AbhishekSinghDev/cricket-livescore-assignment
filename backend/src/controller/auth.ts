import { Request, Response } from "express";
import User from "../model/user";
import { loginSchema, signupSchema } from "../validations/auth";
import {
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
} from "../utils";

const signUp = async (req: Request, res: Response) => {
  try {
    const result = signupSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        success: false,
        errors: result.error.flatten(),
      });
      return;
    }

    const { email, password } = result.data;

    // check weither the user already exists or not
    const user = await User.findOne({
      email: email,
    });

    if (user) {
      res.status(400).json({
        success: false,
        message: "user already exists with the provided email",
      });
      return;
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({ email, password: hashedPassword });

    const accessToken = generateAccessToken(
      newUser._id.toString(),
      newUser.email
    );
    const refreshToken = generateRefreshToken(
      newUser._id.toString(),
      newUser.email
    );

    res.status(201).json({
      success: true,
      message: "signup successfull.",
      data: {
        user: {
          id: newUser._id,
          email: newUser.email,
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
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

const logIn = async (req: Request, res: Response) => {
  try {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        success: false,
        errors: result.error.flatten(),
      });
      return;
    }

    const { email, password } = result.data;

    // check weither user exists or not
    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      res.status(401).json({
        success: false,
        message: "invalid credentials",
      });
      return;
    }

    // verify password
    const verifyPassword = await comparePassword(password, user.password);

    if (!verifyPassword) {
      res.status(401).json({
        success: false,
        message: "invalid credentials",
      });
      return;
    }

    const accessToken = generateAccessToken(user._id.toString(), user.email);
    const refreshToken = generateRefreshToken(user._id.toString(), user.email);

    res.status(200).json({
      success: true,
      message: "login successfull",
      data: {
        user: {
          id: user._id,
          email: user.email,
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      },
    });

    return;
  } catch (err) {
    console.log("[server]: ", err);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

export { signUp, logIn };

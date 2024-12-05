import { Request, Response } from "express";

const getProfile = (req: Request, res: Response) => {
  res.send("profile");
};

export { getProfile };

import { NextFunction, Request, Response } from "express";
import User from "./models/User";

export function checkApiKey(req: Request, res: Response, next: NextFunction) {
  if (req.headers["api-key"] !== process.env.API_KEY)
    return res.status(401).json({ message: "Unauthorized" });
  next();
}

export async function getUserFromTokenId(token: string) {
  try {
    const user = await User.findOne({ "token._id": { $eq: token } });
    return user || null;
  } catch (err: any) {
    console.log(err?.message);
    return null;
  }
}

import { NextFunction, Request, Response } from "express";
import User from "./models/User";
import { v4 as uuid } from "uuid";
import * as bcrypt from "bcrypt";

const hex = ["a", "b", "c", "d", "e", "f"];

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

export async function loginWithUsernameAndPassword(
  username: string,
  password: string
) {
  try {
    const user = await User.findOne({ username });
    if (bcrypt.compareSync(password, user.password)) return user;
    return null;
  } catch {
    return null;
  }
}

export async function loginWithToken(token: string) {
  try {
    const users = await User.find();
    for (const user of users) {
      if (user.token._id === token) return user;
    }
    return null;
  } catch {
    return null;
  }
}

export function generateToken() {
  return {
    _id: uuid().toString(),
    date: new Date(Date.now()),
  };
}

export function generateRandomColor() {
  let color = "#";
  for (let i = 0; i < 6; i++) {
    const rand = Math.floor(Math.random() * 16);
    if (rand < 10) color += rand;
    else color += hex[rand - 10];
  }
  return color;
}

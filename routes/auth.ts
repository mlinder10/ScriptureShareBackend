import express from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import {
  loginWithUsernameAndPassword,
  loginWithToken,
  generateToken,
  generateRandomColor,
} from "../helpers";

const router = express.Router();

router.get("/", async (req, res) => {
  // TODO only return token id
  try {
    const { username, password } = req.query;
    if (typeof username !== "string" || typeof password !== "string")
      return res.status(400).json({ message: "Invalid username or password" });
    const user = await loginWithUsernameAndPassword(username, password);
    if (user === null)
      return res
        .status(400)
        .json({ message: "Incorrect username or password" });
    return res.status(200).json({ user });
  } catch (err: any) {
    console.error(err?.message);
    return res.status(500).json({ message: "Internal service error" });
  }
});

router.get("/:token", async (req, res) => {
  // TODO only return token id
  try {
    const { token } = req.params;
    if (typeof token !== "string")
      return res.status(400).json({ message: "Invalid token" });
    const user = await loginWithToken(token);
    if (user === null)
      return res.status(400).json({ message: "No users with matching token" });
    // TODO check token validity
    return res.status(200).json({ user });
  } catch (err: any) {
    console.error(err?.message);
    return res.status(500).json({ message: "Internal service error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (typeof username !== "string" || typeof password !== "string")
      return res.status(400).json({ message: "Invalid username or password" });
    const existingUsername = await User.findOne({ username });
    if (existingUsername)
      return res.status(400).json({ message: "Existing username" });
    const encryptedPassword = await bcrypt.hash(password, 10);
    const token = generateToken();
    const user = await User.create({
      _id: uuid().toString(),
      "token._id": token._id,
      "token.date": token.date,
      username,
      password: encryptedPassword,
      color: generateRandomColor(),
    });
    return res.status(201).json({ user });
  } catch (err: any) {
    console.error(err?.message);
    return res.status(500).json({ message: "Internal service error" });
  }
});

router.delete("/", async (req, res) => {
  try {
    const { _id } = req.query;
    await User.findOneAndRemove({ _id });
    return res.status(202).json({ message: "Successfully deleted user" });
  } catch (err: any) {
    console.error(err?.message);
    return res.status(500).json({ message: "Internal service error" });
  }
});

router.get("/test/test", async (req, res) => {
  try {
    const users = await User.find();
    for (const user of users) {
      await User.updateOne(
        { _id: user._id },
        { $set: { color: generateRandomColor() } }
      );
    }
    return res.status(200).json({ message: "success" });
  } catch (err: any) {
    console.error(err?.message);
    return res.status(500).json({ message: "Internal service error" });
  }
});

export default router;

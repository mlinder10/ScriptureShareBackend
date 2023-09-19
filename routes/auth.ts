import express from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

const router = express.Router();

async function loginWithUsernameAndPassword(
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

async function loginWithToken(token: string) {
  try {
    const users = await User.find();
    for (const user of users) {
      if (user.token.id === token) return user;
    }
    return null;
  } catch {
    return null;
  }
}

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

router.get("/token", async (req, res) => {
  // TODO only return token id
  try {
    const { token } = req.query;
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
    const user = await User.create({ username, password: encryptedPassword });
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

export default router;

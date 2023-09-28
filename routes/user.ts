import express from "express";
import User from "../models/User";

const router = express.Router();

// users not freinds with user passed by _id
router.get("/nfriends/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findOne({ _id });
    const users = await User.find({ _id: { $nin: [_id, ...user.friends] } });
    return res.status(200).json({ users });
  } catch (err: any) {
    console.error(err?.message);
    return res.status(500).json({ message: "Internal service error" });
  }
});

// freinds of user
router.get("/friends/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findOne({ _id });
    const friends = await User.find({ id: { $in: user.friends } });
    return res.status(200).json({ friends });
  } catch (err: any) {
    console.error(err?.message);
    return res.status(500).json({ message: "Internal service error" });
  }
});

// storing image path in user object
router.patch("/image", async (req, res) => {
  try {
    const { path, _id } = req.body;
    await User.updateOne({ _id }, { profileImage: path });
    return res.status(202).json({ message: "success" });
  } catch (err: any) {
    console.error(err?.message);
    return res.status(500).json({ message: "Internal service error" });
  }
});

// adding freinds
router.patch("/friend", async (req, res) => {
  try {
    const { _id, friend_id } = req.body;
    await User.findOneAndUpdate(
      { _id },
      { $push: { friends: friend_id } },
      { new: true }
    );
    return res.status(202).json({ message: "success" });
  } catch (err: any) {
    console.error(err?.message);
    return res.status(500).json({ message: "Internal service error" });
  }
});

export default router;

import express from "express";
import User from "../models/User";

const router = express.Router();

router.get("/:_id", async (req, res) => {
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

export default router;

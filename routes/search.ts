import express from "express";
import { instanceAPI } from "../config/constants";
import User from "../models/User";
import Note from "../models/Note";

const router = express.Router();

router.get("/:id/:type/:text", async (req, res) => {
  const { id, type, text } = req.params;
  let data: any = {
    verses: [],
    users: [],
    notes: [],
  };

  try {
    if (type === "all" || type === "verses") {
      const response = await instanceAPI.get(
        `bibles/${id}/search?query=${encodeURIComponent(text)}&sort=relevance`
      );
      data.verses = response.data.data.verses;
    }

    if (type === "all" || type === "users") {
      const users = await User.find({}).limit(10);
      data.users = users;
    }

    if (type === "all" || type === "notes") {
      const notes = await Note.find({}).limit(10);
      data.notes = notes;
    }

    return res.status(200).json({ data });
  } catch (err: any) {
    console.error(err?.message);
    return res.status(500).json({ message: "Error" });
  }
});

export default router;

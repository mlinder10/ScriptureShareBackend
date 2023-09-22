import express from "express";
import Note from "../models/Note";
import { v4 as uuid } from "uuid";
import User from "../models/User";

const router = express.Router();

router.get("/:version/:chapter/:_id", async (req, res) => {
  try {
    const { version, chapter, _id } = req.params;
    const user = await User.findOne({ _id });
    const notes = await Note.find({ version, chapter });
    let validNotes = [];
    for (const note of notes) {
      if (note.userId === _id || user.friends.includes(note.userId))
        validNotes.push(note);
    }
    return res.status(200).json({ notes: validNotes });
  } catch (err: any) {
    console.error(err?.message);
    return res.status(500).json({ message: "Internal service error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { lines, userId, version, book, chapter, content, lineNumbers } =
      req.body;
    if (
      !lines ||
      !userId ||
      !version ||
      !book ||
      !chapter ||
      !content ||
      !lineNumbers
    )
      return res.status(400).json({ message: "Invalid request body" });
    const note = await Note.create({
      _id: uuid().toString(),
      lines,
      lineNumbers,
      userId,
      version,
      book,
      chapter,
      content,
    });
    return res.status(201).json({ note });
  } catch (err: any) {
    console.error(err?.message);
    return res.status(500).json({ message: "Internal service error" });
  }
});

export default router;

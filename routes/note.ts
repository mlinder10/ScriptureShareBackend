import express from "express";
import Note from "../models/Note";
import { v4 as uuid } from "uuid";

const router = express.Router();

router.get("/:version/:chapter/:_id", async (req, res) => {
  try {
    const { version, chapter, _id } = req.params;
    const notes = await Note.find({ version, chapter });
    return res.status(200).json({ notes });
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

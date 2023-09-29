import express from "express";
import Note from "../models/Note";
import { v4 as uuid } from "uuid";
import User from "../models/User";

const router = express.Router();

// get notes of current chapter
router.get("/:version/:chapter/:_id", async (req, res) => {
  try {
    const { version, chapter, _id } = req.params;
    const user = await User.findOne({ _id });
    const notes = await Note.find({
      chapter,
      userId: { $in: [_id, ...user.friends] },
    }).then((array) => array.reverse());
    return res.status(200).json({ notes });
  } catch (err: any) {
    console.error(err?.message);
    return res.status(500).json({ message: "Internal service error" });
  }
});

// get friends notes
router.get("/friends/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const { limit, offset } = req.query;
    if (
      (typeof limit !== "string" && limit !== undefined) ||
      (typeof offset !== "string" && offset !== undefined)
    )
      return res.status(400).json({ message: "Invalid limit or offset" });
    let intLimit = parseInt(limit ?? "50");
    let intOffset = parseInt(offset ?? "0");

    const user = await User.findOne({ _id });
    const totalDocuments = await Note.countDocuments({
      userId: { $in: user.friends },
    });

    if (intOffset + intLimit > totalDocuments) {
      intLimit = totalDocuments - intOffset;
      if (intLimit < 0) {
        intLimit = 0; // Ensure a non-negative limit
      }
    }

    const notes = await Note.find({
      userId: { $in: user.friends },
    })
      .sort({ _id: -1 })
      .skip(intOffset)
      .limit(intLimit);
    return res.status(200).json({ notes });
  } catch (err: any) {
    console.error(err?.message);
    return res.status(500).json({ message: "Internal service error" });
  }
});

router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const notes = await Note.find({ userId: _id });
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

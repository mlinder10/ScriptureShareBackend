import mongoose from "mongoose";
import { v4 as uuid } from "uuid";

const noteSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid().toString(),
  },
  lines: {
    type: [String],
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
  book: {
    type: String,
    required: true,
  },
  chapter: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Note || mongoose.model("Note", noteSchema);

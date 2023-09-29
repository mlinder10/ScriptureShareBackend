import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  lines: {
    type: [String],
    required: true,
  },
  lineNumbers: {
    type: [Number],
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

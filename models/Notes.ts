import mongoose from "mongoose";
import { v4 as uuid } from "uuid";

const noteSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid().toString(),
  },
});

export default mongoose.models.Note || mongoose.model("Note", noteSchema);
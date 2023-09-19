import mongoose from "mongoose";
import { v4 as uuid } from "uuid";

const bookmarkSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid().toString(),
  },
});

export default mongoose.models.Bookmark || mongoose.model("Bookmark", bookmarkSchema);
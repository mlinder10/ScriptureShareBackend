import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: Date.now().toString(),
  },
});

export default mongoose.models.Bookmark || mongoose.model("Bookmark", bookmarkSchema);
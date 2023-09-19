import mongoose from "mongoose";
import { v4 as uuid } from "uuid";

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid().toString(),
  },
  token: {
    type: {
      _id: String,
      date: Date,
    },
    default: {
      _id: uuid().toString(),
      date: Date.now(),
    },
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: {
    type: [String],
    default: [],
  },
  notes: {
    type: [String],
    default: [],
  },
  bookmarks: {
    type: [String],
    default: [],
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);

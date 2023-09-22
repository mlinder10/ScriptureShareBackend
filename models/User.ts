import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: Date.now().toString(),
  },
  token: {
    type: {
      _id: String,
      date: Date,
    },
    default: {
      _id: Date.now().toString(),
      date: new Date(),
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

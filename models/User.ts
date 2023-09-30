import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  token: {
    _id: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
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
  profileImage: {
    type: String,
    default: "",
  },
  color: {
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

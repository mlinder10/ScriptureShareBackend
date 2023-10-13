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
  version: {
    id: {
      type: String,
      default: "de4e12af7f28f599-02",
    },
    abbreviation: {
      type: String,
      default: "KJV",
    },
    name: {
      type: String,
      default: "King James (Authorised) Version",
    },
  },
  chapter: {
    type: String,
    default: "GEN.1",
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);

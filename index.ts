import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { checkApiKey } from "./helpers";
dotenv.config();
import authRouter from "./routes/auth"
import noteRouter from "./routes/note"
import userRouter from "./routes/user"
import searchRouter from "./routes/search"

mongoose.connect(process.env.DB_URL || "");
const db = mongoose.connection;
const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(checkApiKey)
app.use("/auth", authRouter)
app.use("/note", noteRouter)
app.use("/user", userRouter)
app.use("/search", searchRouter)

db.once("open", () => {
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
});

db.on("error", (error) => {
  console.log(error?.message);
});

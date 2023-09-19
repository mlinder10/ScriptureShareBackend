import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { checkApiKey } from "./helpers";
dotenv.config();
import authRouter from "./routes/auth"
import chapterRouter from "./routes/chapter"

mongoose.connect("mongodb://localhost/scriptureshare");
const db = mongoose.connection;
const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(checkApiKey)
app.use("/auth", authRouter)
app.use("/chapter", chapterRouter)

db.once("open", () => {
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
});

db.on("error", (error) => {
  console.log(error?.message);
});

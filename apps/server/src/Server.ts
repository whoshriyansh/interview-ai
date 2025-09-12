import express from "express";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import * as path from "path";
import cors from "cors";
import { ConnectDB } from "./db/ConnectDB.js";
import authRoutes from "./routes/Auth.route.js";
import challengeRoutes from "./routes/Challenge.route.js";
import challengeAnalysisRoutes from "./routes/ChallengeAnalysis.route.js";

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.resolve(process.cwd(), ".env") });
}
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS,
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send("Hello From the server");
});
app.use("/api/v1", authRoutes);
app.use("/api/v1", challengeRoutes);
app.use("/api/v1", challengeAnalysisRoutes);

app.listen(process.env.PORT, () => {
  ConnectDB();
  console.log(`App is runing on port ${process.env.PORT}`);
});

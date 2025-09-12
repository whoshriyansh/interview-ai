import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/Auth.route.js";
import challengeRoutes from "./routes/Challenge.route.js";
import challengeAnalysisRoutes from "./routes/ChallengeAnalysis.route.js";
import { ConnectDB } from "./db/ConnectDB.js";

if (process.env.NODE_ENV !== "production") {
  import("dotenv").then((dotenv) => dotenv.config({ path: "./.env" }));
}
const app: express.Application = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS,
    credentials: true,
  })
);

ConnectDB();
app.get("/", (req, res) => {
  res.send("Hello From the server");
});

app.get("/api/v1/health", (req, res) => {
  res.json({ status: "OK" });
});

app.use("/api/v1", authRoutes);
app.use("/api/v1", challengeRoutes);
app.use("/api/v1", challengeAnalysisRoutes);

export default app;

if (typeof process.env.VERCEL !== "undefined") {
  // Vercel env is set, so don't listen
} else {
  const PORT = process.env.PORT || 8001;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

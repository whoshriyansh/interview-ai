import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import { ConnectDB } from "./db/ConnectDB.ts";
import authRoutes from "./routes/Auth.route.ts";
import challengeRoutes from "./routes/Challenge.route.ts";
import challengeAnalysisRoutes from "./routes/ChallengeAnalysis.route.ts";

dotenv.config({ path: ".env" });

const app = express();
app.use(express.json());
app.use(cookieParser());

let allowedOrigins: string[];

if (process.env.NODE_ENV === "production") {
  allowedOrigins = ["https://your-production-domain.com"];
} else {
  allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];
}

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

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

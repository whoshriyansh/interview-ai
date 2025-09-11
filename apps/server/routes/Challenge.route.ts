import express from "express";
import generateCodingChallenge from "../controllers/ChallengeGeneration.controller.ts";

const router = express.Router();

router.post("/challenge-request", generateCodingChallenge);

export default router;

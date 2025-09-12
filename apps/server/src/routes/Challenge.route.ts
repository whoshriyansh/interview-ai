import express, { Router } from "express";
import generateCodingChallenge from "../controllers/ChallengeGeneration.controller.js";

const router: Router = express.Router();

router.post("/challenge-request", generateCodingChallenge);

export default router;

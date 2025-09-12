import express, { Router } from "express";
import generateCodingChallenge from "../controllers/ChallengeGeneration.controller.js";
const router = express.Router();
router.post("/challenge-request", generateCodingChallenge);
export default router;
//# sourceMappingURL=Challenge.route.js.map
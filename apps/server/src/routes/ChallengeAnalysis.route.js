import express, { Router } from "express";
import generateCodeAnalysis from "../controllers/CodeAnalysis.controller.js";
const router = express.Router();
router.post("/challenge-analysis", generateCodeAnalysis);
export default router;
//# sourceMappingURL=ChallengeAnalysis.route.js.map
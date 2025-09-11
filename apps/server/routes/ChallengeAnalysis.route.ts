import express from "express";
import generateCodeAnalysis from "../controllers/CodeAnalysis.controller.ts";

const router = express.Router();

router.post("/challenge-analysis", generateCodeAnalysis);

export default router;

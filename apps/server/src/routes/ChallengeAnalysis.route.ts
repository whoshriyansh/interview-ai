import express, { Router } from "express";
import generateCodeAnalysis from "../controllers/CodeAnalysis.controller.js";

const router: Router = express.Router();

router.post("/challenge-analysis", generateCodeAnalysis);

export default router;

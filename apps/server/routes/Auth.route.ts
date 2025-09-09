import { Router } from "express";
import { SignUp, SignIn, RefreshToken } from "../controllers/Auth.controller";

const router = Router();

router.post("/signup", SignUp);
router.post("/signin", SignIn);
router.post("/refresh", RefreshToken);

export default router;

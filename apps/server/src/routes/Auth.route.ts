import { Router } from "express";
import {
  SignUp,
  SignIn,
  RefreshToken,
} from "../controllers/Auth.controller.js";

const router: Router = Router();

router.post("/signup", SignUp);
router.post("/signin", SignIn);
router.post("/refresh", RefreshToken);

export default router;

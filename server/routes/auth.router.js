import express from "express";
import { signup, signIn, google } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/sign-up", signup);
router.post("/sign-in", signIn);
router.post("/google", google);

export default router;

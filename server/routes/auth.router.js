import express from "express";
import { signup, signIn } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/sign-up", signup);
router.post("/sign-in", signIn);

export default router;

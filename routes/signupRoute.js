import express from "express";

const router = express.Router();
import { signup } from "../controllers/signupController.js";

router.post("/", signup);

export default router;

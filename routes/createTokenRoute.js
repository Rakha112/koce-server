import { createTokenController } from "../controllers/createTokenController.js";
import express from "express";

const router = express.Router();

router.get("/", createTokenController);

export default router;

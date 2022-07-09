import express from "express";

const router = express.Router();
import { getData } from "../controllers/dataController.js";

router.get("/", getData);

export default router;

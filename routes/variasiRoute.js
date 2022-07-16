import express from "express";

const router = express.Router();
import { getVariasi, tambahVariasi } from "../controllers/variasiController.js";

router.get("/", getVariasi);
router.post("/tambah", tambahVariasi);

export default router;

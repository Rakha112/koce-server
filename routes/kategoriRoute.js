import express from "express";

const router = express.Router();
import {
  tambahKategori,
  getKategori,
} from "../controllers/kategoriController.js";

router.get("/", getKategori);
router.post("/tambah", tambahKategori);

export default router;

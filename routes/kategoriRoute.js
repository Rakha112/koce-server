import express from "express";

const router = express.Router();
import {
  tambahKategori,
  getKategori,
  deleteKategori,
} from "../controllers/kategoriController.js";

router.get("/", getKategori);
router.post("/tambah", tambahKategori);
router.delete("/delete", deleteKategori);

export default router;

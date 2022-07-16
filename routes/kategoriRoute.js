import express from "express";

const router = express.Router();
import {
  tambahKategori,
  getKategori,
  deleteKategori,
  editKategori,
} from "../controllers/kategoriController.js";

router.get("/", getKategori);
router.post("/tambah", tambahKategori);
router.delete("/delete", deleteKategori);
router.put("/edit", editKategori);

export default router;

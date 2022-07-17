import express from "express";

const router = express.Router();
import {
  getVariasi,
  tambahVariasi,
  deleteVariasi,
} from "../controllers/variasiController.js";

router.get("/", getVariasi);
router.post("/tambah", tambahVariasi);
router.delete("/delete", deleteVariasi);

export default router;

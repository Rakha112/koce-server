import express from "express";

const router = express.Router();
import {
  tambahKeranjang,
  getKeranjang,
  getSpesifik,
  checkExist,
} from "../controllers/keranjangController.js";

router.get("/", getKeranjang);
router.get("/spesifik", getSpesifik);
router.get("/check", checkExist);
router.post("/tambah", tambahKeranjang);

export default router;

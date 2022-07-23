import express from "express";

const router = express.Router();
import {
  tambahKeranjang,
  getKeranjang,
  getSpesifik,
  checkExist,
  deleteKeranjang,
} from "../controllers/keranjangController.js";

router.get("/", getKeranjang);
router.get("/spesifik", getSpesifik);
router.get("/check", checkExist);
router.post("/tambah", tambahKeranjang);
router.delete("/delete", deleteKeranjang);
export default router;

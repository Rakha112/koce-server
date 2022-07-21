import express from "express";

const router = express.Router();
import {
  tambahKeranjang,
  getKeranjang,
  checkExist,
} from "../controllers/keranjangController.js";

router.get("/", getKeranjang);
router.get("/check", checkExist);
router.post("/tambah", tambahKeranjang);

export default router;

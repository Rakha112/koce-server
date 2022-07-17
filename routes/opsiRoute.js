import express from "express";

const router = express.Router();
import {
  tambahOpsi,
  editStatus,
  deleteOpsi,
} from "../controllers/opsiController.js";

router.post("/tambah", tambahOpsi);
router.put("/status", editStatus);
router.delete("/delete", deleteOpsi);

export default router;

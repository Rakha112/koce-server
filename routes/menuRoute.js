import express from "express";

const router = express.Router();
import {
  tambahMenu,
  getMenu,
  editStatus,
  deleteMenu,
} from "../controllers/menuController.js";

router.get("/", getMenu);
router.post("/tambah", tambahMenu);
router.delete("/delete", deleteMenu);
router.put("/status", editStatus);

export default router;

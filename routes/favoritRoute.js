import express from "express";

const router = express.Router();
import {
  addFavorit,
  deleteFavorit,
  getFavorit,
} from "../controllers/favoritController.js";

router.post("/", addFavorit);
router.delete("/delete", deleteFavorit);
router.get("/get", getFavorit);
// router.get("/mobile", loginMobile);

export default router;

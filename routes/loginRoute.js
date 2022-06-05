import express from "express";

const router = express.Router();
import { login, loginMobile } from "../controllers/loginController.js";

router.post("/", login);
router.post("/mobile", loginMobile);
// router.get("/mobile", loginMobile);

export default router;

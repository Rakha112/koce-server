import express from "express";

const router = express.Router();
import { login, loginMobile } from "../controllers/loginController.js";

router.get("/", login);
router.get("/mobile", loginMobile);
// router.get("/mobile", loginMobile);

export default router;

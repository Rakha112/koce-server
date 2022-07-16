import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import LoginRouter from "./routes/loginRoute.js";
import SignupRouter from "./routes/signupRoute.js";
import FavoritRouter from "./routes/favoritRoute.js";
import DataRouter from "./routes/dataRoute.js";
import KategoriRouter from "./routes/kategoriRoute.js";
import MenuRouter from "./routes/menuRoute.js";
import VariasiRouter from "./routes/variasiRoute.js";
import { validateAccessToken } from "./middleware/validateAccessToken.js";
import { validateRefreshToken } from "./middleware/validateRefreshToken.js";

// UPDATE HEROKU STACK
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://catetin-app.web.app",
      "http://localhost:3000",
      "https://infallible-ramanujan-164fb7.netlify.app",
    ],
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(201).send("INI SERVER APLIKASI KOCE");
});

app.get("/profile", validateAccessToken, (req, res) => {
  res.send({ loggedIn: req.loggedIn, username: req.username });
});
app.get("/refreshToken", validateRefreshToken, (req, res) => {
  res.send(req.headers.authorization);
});
app.use("/login", LoginRouter);
app.use("/signup", SignupRouter);
app.use("/favorit", FavoritRouter);
app.use("/data", DataRouter);
app.use("/kategori", KategoriRouter);
app.use("/menu", MenuRouter);
app.use("/variasi", VariasiRouter);

app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"), function () {
  console.log("App running on port", app.get("port"));
});

import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import LoginRouter from "./routes/loginRoute.js";
import SignupRouter from "./routes/signupRoute.js";
import CreateTokenRouter from "./routes/createTokenRoute.js";
import { validateToken } from "./middleware/userAuth.js";
import { db } from "./configs/dbConfig.js";

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
import jwt from "jsonwebtoken";
const { verify } = jwt;
app.get("/coba", validateToken, (req, res) => {
  const token = req.body.token;
  const username = req.body.username;
  const sql = "SELECT * FROM user WHERE username= ?;";
  db.query(sql, username, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("BERHASI");
    }
  });
});

app.get("/", (req, res) => {
  res.send("INI SERVER APLIKASI KOCE");
});

app.get("/profile", validateToken);
app.use("/login", LoginRouter);
app.use("/signup", SignupRouter);
app.use("/token", CreateTokenRouter);

app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"), function () {
  console.log("App running on port", app.get("port"));
});

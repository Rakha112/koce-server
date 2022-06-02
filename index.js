import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import LoginRouter from "./routes/loginRoute.js";
import SignupRouter from "./routes/signupRoute.js";

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
  res.send("INI SERVER APLIKASI KOCE");
});
app.use("/login", LoginRouter);
app.use("/signup", SignupRouter);

app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"), function () {
  console.log("App running on port", app.get("port"));
});

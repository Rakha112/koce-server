import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import LoginRouter from "./routes/loginRoute.js";
import SignupRouter from "./routes/signupRoute.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/login", LoginRouter);
app.use("/signup", SignupRouter);

app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"), function () {
  console.log("App running on port", app.get("port"));
});

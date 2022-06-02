import "dotenv/config";
import mysql from "mysql";

export const db = mysql.createPool({
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.SERVER_DB,
  port: 3306,
});

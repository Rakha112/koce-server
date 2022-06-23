import "dotenv/config";
import mysql from "mysql";

export const db = mysql.createPool({
  host: process.env.HOST_DB_HEROKU,
  user: process.env.USER_DB_HEROKU,
  password: process.env.PASSWORD_DB_HEROKU,
  database: process.env.DATABASE_DB_HEROKU,
  port: 3306,
});

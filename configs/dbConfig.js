import "dotenv/config";
import mysql from "mysql";

export const db = mysql.createPool({
  host: process.env.HOST_DB_LOCAL,
  user: process.env.USER_DB_LOCAL,
  password: process.env.PASSWORD_DB_LOCAL,
  database: process.env.DATABASE_DB_LOCAL,
  // port: 3306,
});

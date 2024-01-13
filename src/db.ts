import { Pool } from "pg";
import 'dotenv/config' 

const pool = new Pool({
  user: process.env["USER_DB"],
  host: "localhost",
  database: "express-reviews",
  password: process.env["PASS_DB"],
  port: 5432,
});


export const query = (text: string, params?: (string | number | boolean)[]) => {
  return pool.query(text, params);
};

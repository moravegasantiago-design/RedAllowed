import pkg from "pg";

import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "../keysEnv";

const { Pool } = pkg;

export const pool = new Pool({
  host: DB_HOST,
  password: DB_PASSWORD,
  user: DB_USER,
  port: Number(DB_PORT),
  database: DB_NAME,
  ssl: { rejectUnauthorized: false },
});

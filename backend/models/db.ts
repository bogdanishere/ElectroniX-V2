import { createPool } from "mysql2/promise";
import env from "../env";

const pool = createPool({
  host: env.DB_HOST,
  user: env.DB_USER,
  port: 3308,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;

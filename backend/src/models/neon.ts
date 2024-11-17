// models/neon.ts
import postgres from "postgres";
import env from "../../env";
import { PrismaClient } from "@prisma/client";

const sql = postgres({
  host: env.PGHOST,
  database: env.PGDATABASE,
  username: env.PGUSER,
  password: env.PGPASSWORD,
  port: 5432,
  ssl: "require",
  connection: {
    options: `project=${env.ENDPOINT_ID}`,
  },
});

export default sql;

export const prisma = new PrismaClient();

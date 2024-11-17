import "dotenv/config";

import { cleanEnv, port, str } from "envalid";

const env = cleanEnv(process.env, {
  PGHOST: str(),
  PGDATABASE: str(),
  PGUSER: str(),
  PGPASSWORD: str(),
  ENDPOINT_ID: str(),
  POSTGRES_URL: str(),
  PORT: port(),
  MONGO_CONNECTION_STRING: str(),
  SESSION_SECRET: str(),
  STRIPE_SECRET_KEY: str(),
  JWT_SECRET: str(),
  SERVER_URL: str(),
  FRONTEND_URL: str(),
  BACKEND_URL: str(),
  DATABASE_URL: str(),
});

export default env;

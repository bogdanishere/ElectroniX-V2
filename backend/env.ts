import { cleanEnv, port, str } from "envalid";

const env = cleanEnv(process.env, {
  PORT: port(),
  MONGO_CONNECTION_STRING: str(),
  SESSION_SECRET: str(),
  STRIPE_SECRET_KEY: str(),
  JWT_SECRET: str(),
  SERVER_URL: str(),
  DB_HOST: str(),
  DB_USER: str(),
  DB_PASSWORD: str(),
  DB_NAME: str(),
});

export default env;

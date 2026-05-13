import dotenv from "dotenv";

dotenv.config();

const required = (value: string | undefined, key: string): string => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 4000),
  db: {
    client: process.env.DB_CLIENT ?? "mysql2",
    host: required(process.env.DB_HOST, "DB_HOST"),
    port: Number(process.env.DB_PORT ?? 3306),
    user: required(process.env.DB_USER, "DB_USER"),
    password: required(process.env.DB_PASSWORD, "DB_PASSWORD"),
    name: required(process.env.DB_NAME, "DB_NAME")
  },
  auth: {
    jwtSecret: required(process.env.JWT_SECRET, "JWT_SECRET"),
    jwtExpiration: process.env.JWT_EXPIRATION ?? "24h",
    bcryptRounds: Number(process.env.BCRYPT_ROUNDS ?? 10)
  },
  frontendUrl: process.env.FRONTEND_URL ?? "http://localhost:5173"
};


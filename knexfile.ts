import type { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

const required = (value: string | undefined, key: string): string => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

const sharedConfig: Knex.Config = {
  client: process.env.DB_CLIENT ?? "pg",
  connection: {
    host: required(process.env.DB_HOST, "DB_HOST"),
    port: Number(process.env.DB_PORT ?? 5432),
    user: required(process.env.DB_USER, "DB_USER"),
    password: required(process.env.DB_PASSWORD, "DB_PASSWORD"),
    database: required(process.env.DB_NAME, "DB_NAME")
  },
  migrations: {
    directory: "./src/database/migrations",
    extension: "ts"
  },
  seeds: {
    directory: "./src/database/seeds",
    extension: "ts"
  }
};

export default sharedConfig;

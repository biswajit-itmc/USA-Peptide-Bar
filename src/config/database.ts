import type { Knex } from "knex";
import { env } from "./env.js";

export const databaseConfig: Knex.Config = {
  client: env.db.client,
  connection: {
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
    database: env.db.name
  },
  pool: {
    min: 0,
    max: 10
  }
};

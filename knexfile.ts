import type { Knex } from "knex";
import { env } from "./src/config/env.ts";

const sharedConfig: Knex.Config = {
  client: env.db.client,
  connection: {
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
    database: env.db.name
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

import knex from "knex";
import { databaseConfig } from "../config/database.js";

export const db = knex(databaseConfig);

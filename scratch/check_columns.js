import knex from 'knex';
import { databaseConfig } from '../src/config/database.js';

const db = knex(databaseConfig);

async function check() {
  const result = await db('orders').columnInfo();
  console.log(Object.keys(result));
  process.exit(0);
}

check();

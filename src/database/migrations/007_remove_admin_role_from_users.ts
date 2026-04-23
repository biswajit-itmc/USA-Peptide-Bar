import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    DELETE FROM users
    WHERE role = 'admin'
  `);

  await knex.raw(`
    ALTER TABLE users
    DROP CONSTRAINT IF EXISTS users_role_check
  `);

  await knex.raw(`
    ALTER TABLE users
    ADD CONSTRAINT users_role_check
    CHECK (role IN ('retail', 'wholesale'))
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE users
    DROP CONSTRAINT IF EXISTS users_role_check
  `);

  await knex.raw(`
    ALTER TABLE users
    ADD CONSTRAINT users_role_check
    CHECK (role IN ('retail', 'wholesale', 'admin'))
  `);
}

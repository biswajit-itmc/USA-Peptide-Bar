import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    DO $$
    DECLARE
      constraint_name text;
    BEGIN
      SELECT tc.constraint_name
      INTO constraint_name
      FROM information_schema.table_constraints tc
      JOIN information_schema.constraint_column_usage ccu
        ON tc.constraint_name = ccu.constraint_name
       AND tc.table_schema = ccu.table_schema
      WHERE tc.table_name = 'users'
        AND tc.constraint_type = 'CHECK'
        AND ccu.column_name = 'role'
      LIMIT 1;

      IF constraint_name IS NOT NULL THEN
        EXECUTE format('ALTER TABLE users DROP CONSTRAINT %I', constraint_name);
      END IF;

      ALTER TABLE users
      ALTER COLUMN role TYPE TEXT;

      ALTER TABLE users
      ADD CONSTRAINT users_role_check
      CHECK (role IN ('retail', 'wholesale', 'admin'));
    END $$;
  `);
}

export async function down(_knex: Knex): Promise<void> {
  // PostgreSQL enum values are not easily removable in down migrations.
}

import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE wholesale_applications
    DROP COLUMN IF EXISTS address,
    DROP COLUMN IF EXISTS city,
    DROP COLUMN IF EXISTS state,
    DROP COLUMN IF EXISTS pincode,
    DROP COLUMN IF EXISTS gst_number,
    DROP COLUMN IF EXISTS monthly_volume_estimate
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE wholesale_applications
    ADD COLUMN IF NOT EXISTS address VARCHAR(255),
    ADD COLUMN IF NOT EXISTS city VARCHAR(255),
    ADD COLUMN IF NOT EXISTS state VARCHAR(255),
    ADD COLUMN IF NOT EXISTS pincode VARCHAR(255),
    ADD COLUMN IF NOT EXISTS gst_number VARCHAR(255),
    ADD COLUMN IF NOT EXISTS monthly_volume_estimate VARCHAR(255)
  `);
}

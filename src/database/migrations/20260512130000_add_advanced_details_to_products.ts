import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("products", (table) => {
    table.text("intended_use").nullable();
    table.text("storage").nullable();
    table.text("solubility").nullable();
    table.string("vial_size").nullable();
    table.string("shelf_life").nullable();
    table.text("handling").nullable();
    table.text("research_point_1").nullable();
    table.text("research_point_2").nullable();
    table.text("research_point_3").nullable();
    table.text("research_point_4").nullable();
    table.text("research_point_5").nullable();
    table.text("mechanism_of_action").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("products", (table) => {
    table.dropColumns(
      "intended_use",
      "storage",
      "solubility",
      "vial_size",
      "shelf_life",
      "handling",
      "research_point_1",
      "research_point_2",
      "research_point_3",
      "research_point_4",
      "research_point_5",
      "mechanism_of_action"
    );
  });
}

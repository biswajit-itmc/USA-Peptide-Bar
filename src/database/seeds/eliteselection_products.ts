import { randomUUID } from "node:crypto";
import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("eliteselection_products").del();

  await knex("eliteselection_products").insert([
    // Retatrutide
    { id: randomUUID(), name: "Retatrutide 10mg", price: 108.90, image_url: "https://example.com/p1.png" },
    { id: randomUUID(), name: "Retatrutide 20mg", price: 183.70, image_url: "https://example.com/p2.png" },
    { id: randomUUID(), name: "Retatrutide 60mg", price: 308.00, image_url: "https://example.com/p3.png" },

    // Tirzepatide
    { id: randomUUID(), name: "Tirzepatide 10mg", price: 79.20, image_url: "https://example.com/p4.png" },
    { id: randomUUID(), name: "Tirzepatide 60mg", price: 242.00, image_url: "https://example.com/p5.png" },

    // Second row products
    { id: randomUUID(), name: "Semaglutide", price: 88.00, image_url: "https://example.com/p6.png" },
    { id: randomUUID(), name: "Cagrilintide", price: 118.80, image_url: "https://example.com/p7.png" },
    { id: randomUUID(), name: "GLP-2", price: 150.00, image_url: "https://example.com/p8.png" },
    { id: randomUUID(), name: "BPC-157", price: 49.50, image_url: "https://example.com/p9.png" },
    { id: randomUUID(), name: "TB-500", price: 51.70, image_url: "https://example.com/p10.png" },

    // Third row products
    { id: randomUUID(), name: "BPC-157 / TB-500 Blend", price: 60.50, image_url: "https://example.com/p11.png" },
    { id: randomUUID(), name: "BPC-157 / TB-500 Blend 20mg", price: 71.50, image_url: "https://example.com/p12.png" },
    { id: randomUUID(), name: "Selank", price: 36.30, image_url: "https://example.com/p13.png" },
    { id: randomUUID(), name: "Semax", price: 25.30, image_url: "https://example.com/p14.png" },
  ]);
}

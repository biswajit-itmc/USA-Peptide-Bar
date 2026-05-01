import { db } from "../src/db/knex.js";

async function check() {
  try {
    const items = await db("cart_items").select("*");
    console.log("Cart Items:", items);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

check();

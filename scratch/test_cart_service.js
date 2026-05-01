import { cartService } from '../src/modules/cart/cart.service.js';
import { db } from '../src/db/knex.js';

async function test() {
  try {
    const userId = 8; // Existing user ID
    const productId = 10; // Existing product ID
    console.log('Adding to cart...');
    const result = await cartService.addToCart(userId, productId, 1);
    console.log('Result:', result);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await db.destroy();
  }
}

test();

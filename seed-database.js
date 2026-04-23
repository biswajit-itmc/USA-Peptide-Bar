import pkg from 'pg';
import bcrypt from 'bcryptjs';

const { Client } = pkg;

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'qwerty@5432#',
  database: 'usapeptide'
});

async function seedDatabase() {
  try {
    await client.connect();
    console.log('🌱 Seeding database...\n');

    // Clear existing data
    await client.query('DELETE FROM refresh_tokens;');
    await client.query('DELETE FROM wholesale_applications;');
    await client.query('DELETE FROM users;');
    console.log('🗑️  Cleared existing data');

    // Hash password for test users
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Insert users
    console.log('\n👥 Adding test users...');
    
    const retailResult = await client.query(
      `INSERT INTO users (first_name, last_name, email, password_hash, role, is_approved)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, email, role;`,
      ['John', 'Retail', 'retail@example.com', hashedPassword, 'retail', true]
    );
    console.log(`   ✅ Retail user: ${retailResult.rows[0].email}`);

    const wholesaleResult = await client.query(
      `INSERT INTO users (first_name, last_name, email, company, password_hash, role, is_approved)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, email, role;`,
      ['Jane', 'Wholesale', 'wholesale@example.com', 'Wholesale Co', hashedPassword, 'wholesale', true]
    );
    console.log(`   ✅ Wholesale user: ${wholesaleResult.rows[0].email}`);

    // Insert wholesale applications
    console.log('\n📋 Adding wholesale applications...');
    
    const app1 = await client.query(
      `INSERT INTO wholesale_applications 
       (business_name, contact_name, email, phone, business_type, monthly_volume, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, business_name, status;`,
      ['XYZ Distributors', 'Bob Smith', 'bob@xyzdist.com', '+1-555-0001', 'Distributor', 5000, 'pending']
    );
    console.log(`   ✅ App 1: ${app1.rows[0].business_name} [${app1.rows[0].status}]`);

    const app2 = await client.query(
      `INSERT INTO wholesale_applications 
       (business_name, contact_name, email, phone, business_type, monthly_volume, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, business_name, status;`,
      ['Global Supplies Inc', 'Alice Johnson', 'alice@globalsupplies.com', '+1-555-0002', 'Supplier', 10000, 'pending']
    );
    console.log(`   ✅ App 2: ${app2.rows[0].business_name} [${app2.rows[0].status}]`);

    console.log('\n✅ Database seeded successfully!\n');

    // Verify
    const userCount = await client.query('SELECT COUNT(*) as count FROM users;');
    const appCount = await client.query('SELECT COUNT(*) as count FROM wholesale_applications;');
    
    console.log('📊 Verification:');
    console.log(`   Users: ${userCount.rows[0].count}`);
    console.log(`   Applications: ${appCount.rows[0].count}`);
    console.log(`   Refresh Tokens: 0 (will be created on login)`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

seedDatabase();

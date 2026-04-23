import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'qwerty@5432#',
  database: 'usapeptide'
});

async function checkSeeds() {
  try {
    await client.connect();
    console.log('📊 Current Database Data:\n');
    
    // Check users
    const usersResult = await client.query('SELECT id, email, role, first_name, last_name FROM users;');
    console.log('👥 Users:');
    usersResult.rows.forEach(user => {
      console.log(`   ✅ ${user.email} (${user.role}) - ${user.first_name} ${user.last_name}`);
    });
    
    console.log(`\n   Total: ${usersResult.rows.length} users\n`);
    
    // Check wholesale applications
    const appsResult = await client.query('SELECT id, email, business_name, status FROM wholesale_applications;');
    console.log('🏢 Wholesale Applications:');
    appsResult.rows.forEach(app => {
      console.log(`   ✅ ${app.email} - ${app.business_name} [${app.status}]`);
    });
    
    console.log(`\n   Total: ${appsResult.rows.length} applications\n`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

checkSeeds();

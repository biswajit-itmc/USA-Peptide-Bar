import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

async function checkSeeds() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'USAPEPTIDE'
    });

    console.log('📊 Current Database Data:\n');
    
    // Check users
    const [users] = await connection.query('SELECT id, email, role, first_name, last_name FROM users;');
    console.log('👥 Users:');
    users.forEach(user => {
      console.log(`   ✅ ${user.email} (${user.role}) - ${user.first_name} ${user.last_name}`);
    });
    
    console.log(`\n   Total: ${users.length} users\n`);
    
    // Check wholesale applications
    const [apps] = await connection.query('SELECT id, email, business_name, status FROM wholesale_applications;');
    console.log('🏢 Wholesale Applications:');
    apps.forEach(app => {
      console.log(`   ✅ ${app.email} - ${app.business_name} [${app.status}]`);
    });
    
    console.log(`\n   Total: ${apps.length} applications\n`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) await connection.end();
  }
}

checkSeeds();

import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'qwerty@5432#',
  database: 'postgres' // Connect to default postgres database first
});

async function createDatabase() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL');
    
    // Check if database exists
    const result = await client.query(
      "SELECT datname FROM pg_catalog.pg_database WHERE datname = $1",
      ['usapeptide']
    );
    
    if (result.rows.length > 0) {
      console.log('Database "usapeptide" already exists');
    } else {
      await client.query('CREATE DATABASE usapeptide');
      console.log('✅ Database "usapeptide" created successfully');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

createDatabase();

import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'qwerty@5432#',
  database: 'usapeptide'
});

async function setupDatabase() {
  try {
    await client.connect();
    console.log('🔧 Setting up database...\n');

    // Check existing tables
    const tablesCheck = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);
    
    console.log('📋 Current tables:');
    if (tablesCheck.rows.length === 0) {
      console.log('   None found - Creating all tables...\n');
    } else {
      tablesCheck.rows.forEach(row => {
        console.log(`   ✅ ${row.table_name}`);
      });
      console.log('');
    }

    // Drop existing tables if any (for fresh setup)
    console.log('🗑️  Dropping existing tables...');
    await client.query('DROP TABLE IF EXISTS refresh_tokens CASCADE;');
    await client.query('DROP TABLE IF EXISTS wholesale_applications CASCADE;');
    await client.query('DROP TABLE IF EXISTS users CASCADE;');
    console.log('✅ Old tables dropped\n');

    // Create users table
    console.log('📝 Creating users table...');
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(20),
        company VARCHAR(255),
        password_hash VARCHAR(255) NOT NULL,
        role TEXT NOT NULL DEFAULT 'retail' CHECK (role IN ('retail', 'wholesale')),
        is_approved BOOLEAN NOT NULL DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
    `);
    console.log('✅ users table created');

    // Create indexes on users
    await client.query('CREATE INDEX idx_users_email ON users(email);');
    await client.query('CREATE INDEX idx_users_role ON users(role);');
    await client.query('CREATE INDEX idx_users_created_at ON users(created_at);');

    // Create wholesale_applications table
    console.log('📝 Creating wholesale_applications table...');
    await client.query(`
      CREATE TABLE wholesale_applications (
        id SERIAL PRIMARY KEY,
        business_name VARCHAR(255) NOT NULL,
        contact_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        business_type VARCHAR(255) NOT NULL,
        monthly_volume INTEGER NOT NULL,
        source VARCHAR(255),
        status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
        rejection_reason TEXT,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
    `);
    console.log('✅ wholesale_applications table created');

    // Create indexes on wholesale_applications
    await client.query('CREATE INDEX idx_wholesale_email ON wholesale_applications(email);');
    await client.query('CREATE INDEX idx_wholesale_status ON wholesale_applications(status);');
    await client.query('CREATE INDEX idx_wholesale_user_id ON wholesale_applications(user_id);');
    await client.query('CREATE INDEX idx_wholesale_created_at ON wholesale_applications(created_at);');

    // Create refresh_tokens table
    console.log('📝 Creating refresh_tokens table...');
    await client.query(`
      CREATE TABLE refresh_tokens (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        token TEXT NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        is_revoked BOOLEAN NOT NULL DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
    `);
    console.log('✅ refresh_tokens table created');

    // Create indexes on refresh_tokens
    await client.query('CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens(user_id);');
    await client.query('CREATE INDEX idx_refresh_tokens_expires_at ON refresh_tokens(expires_at);');

    console.log('\n✅ All tables created successfully!\n');

    // Verify all tables
    const finalTables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);
    
    console.log('📊 Final database structure:');
    finalTables.rows.forEach(row => {
      console.log(`   ✅ ${row.table_name}`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
  } finally {
    await client.end();
  }
}

setupDatabase();

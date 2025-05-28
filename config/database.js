import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// Log available environment variables (without sensitive data)
console.log('Available env vars:', {
  DATABASE_URL: process.env.DATABASE_URL ? 'Set' : 'Not Set',
  MYSQL_URL: process.env.MYSQL_URL ? 'Set' : 'Not Set',
  NODE_ENV: process.env.NODE_ENV
});

let connectionConfig;

// Railway specific configuration
if (process.env.RAILWAY_ENVIRONMENT) {
  console.log('Running on Railway, using Railway configuration');
  const dbUrl = new URL(process.env.DATABASE_URL || process.env.MYSQL_URL);
  connectionConfig = {
    host: dbUrl.hostname,
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.substr(1),
    port: Number(dbUrl.port),
    ssl: {
      rejectUnauthorized: false
    }
  };
} else {
  console.log('Running locally, using local configuration');
  connectionConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'school_management',
    port: process.env.DB_PORT || 3306
  };
}

// Add common pool configuration
connectionConfig = {
  ...connectionConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
};

console.log('Database connection config:', {
  ...connectionConfig,
  password: '****',  // Hide password in logs
  host: connectionConfig.host,
  port: connectionConfig.port,
  database: connectionConfig.database
});

const pool = mysql.createPool(connectionConfig).promise();

// Test the connection
const testConnection = async () => {
  try {
    const [result] = await pool.query('SELECT 1');
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
};

// Create the schools table if it doesn't exist
const initializeDatabase = async () => {
  try {
    // First test the connection
    const isConnected = await testConnection();
    if (!isConnected) {
      throw new Error('Could not establish database connection');
    }

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    await pool.query(createTableQuery);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    // Log more details about the error
    console.error('Error details:', {
      code: error.code,
      errno: error.errno,
      sqlMessage: error.sqlMessage,
      sqlState: error.sqlState
    });
    throw error;
  }
};

export { pool, initializeDatabase }; 
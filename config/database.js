import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// Parse the DATABASE_URL if it exists (Railway provides this)
let connectionConfig;
if (process.env.DATABASE_URL) {
  // Parse the URL
  const dbUrl = new URL(process.env.DATABASE_URL);
  connectionConfig = {
    host: dbUrl.hostname,
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.substr(1),
    port: dbUrl.port,
    ssl: {
      rejectUnauthorized: false
    }
  };
} else {
  // Local configuration
  connectionConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'school_management',
  };
}

// Add common pool configuration
connectionConfig = {
  ...connectionConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

console.log('Attempting to connect with config:', {
  ...connectionConfig,
  password: '****' // Hide password in logs
});

const pool = mysql.createPool(connectionConfig);

// Create the schools table if it doesn't exist
const initializeDatabase = async () => {
  try {
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
    
    await pool.promise().query(createTableQuery);
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
    throw error; // Re-throw to handle it in the server
  }
};

export { pool, initializeDatabase }; 
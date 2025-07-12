const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({ 
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, 
  queueLimit: 0,
});

/**

  @param {object} pool 
  @param {string} database 
 */

const handleReconnection = (pool, database) => {
  pool.on('error', async (err) => {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
          console.error(`[${database}] Connection lost. Attempting to reconnect...`);
          try {
              
              await pool.query('SELECT 1');
              console.log(`[${database}] Reconnection successful.`);
          } catch (error) {
              console.error(`[${database}] Reconnection failed. Error: ${error.message}`);
              setTimeout(() => handleReconnection(pool, database), 5000); 
          }
      } else {
          console.error(`[${database}] Unexpected error: ${err.message}`);
      }
  });
};

handleReconnection(db, process.env.DB_NAME);

module.exports = db;

const mysql = require('mysql2/promise');
require('dotenv').config();

async function createDatabase() {
    const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

    try {
        // Connect to MySQL server without specifying a database
        const connection = await mysql.createConnection({
            host: DB_HOST || 'localhost',
            user: DB_USER || 'root',
            password: DB_PASSWORD || '',
        });

        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
        console.log(`Database '${DB_NAME}' created or successfully checked.`);

        await connection.end();
    } catch (error) {
        console.error('Error creating database:', error);
        // We don't throw here to allow the app to try connecting anyway (in case it already exists but user lacks create permission)
    }
}

module.exports = createDatabase;

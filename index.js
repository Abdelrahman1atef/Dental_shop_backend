const app = require('./src/app');
const sequelize = require('./src/config/database');
const createDatabase = require('./src/config/initDb');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await createDatabase(); // Ensure DB exists first
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    // Sync models
    // process.env.DB_FORCE_RESET can be used to drop tables (careful!)
    const syncOptions = process.env.DB_FORCE_RESET === 'true' ? { force: true } : {};
    await sequelize.sync(syncOptions);
    console.log('Database synced.');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();

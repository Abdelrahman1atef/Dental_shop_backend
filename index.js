const app = require('./src/app');
const sequelize = require('./src/config/database');
const createDatabase = require('./src/config/initDb');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await createDatabase(); // Ensure DB exists first
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    // Sync models (use { force: true } only for development to reset)
    await sequelize.sync({ alter: true });
    console.log('Database synced.');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();

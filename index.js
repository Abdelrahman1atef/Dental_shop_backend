// api/index.js
const app = require('./src/app');               // your express app
const sequelize = require('./src/config/database');
const createDatabase = require('./src/config/initDb');

let isInitialized = false;
async function init() {
  if (isInitialized) return;
  await createDatabase();
  await sequelize.authenticate();

  // Sync models with database
  // alter: true updates tables to match models (good for MVP, use Migrations for strict prod)
  const syncOptions = { alter: true };
  if (process.env.DB_FORCE_RESET === 'true') {
    syncOptions.force = true;
  }
  await sequelize.sync(syncOptions);

  isInitialized = true;
}

module.exports = async (req, res) => {
  try {
    await init();            // run once per cold start, not per request ideally
    return app(req, res);    // forward to Express (works as serverless)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server initialization failed' });
  }
};

// Start the server if running directly (e.g. node index.js)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  init().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }).catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
}

// api/index.js
const app = require('../src/app');               // your express app
const sequelize = require('../src/config/database');
const createDatabase = require('../src/config/initDb');

let isInitialized = false;
async function init() {
  if (isInitialized) return;
  await createDatabase();
  await sequelize.authenticate();
  if (process.env.NODE_ENV !== 'production') {
    const syncOptions = process.env.DB_FORCE_RESET === 'true' ? { force: true } : {};
    await sequelize.sync(syncOptions); // only in non-prod or controlled runs
  }
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

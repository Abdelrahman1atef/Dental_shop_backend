const sequelize = require('../config/database');
const User = require('./User');

// Define associations here if any
// Example: User.hasMany(Order);

const db = {
    sequelize,
    User
};

module.exports = db;

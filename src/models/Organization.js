const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Organization = sequelize.define('Organization', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    subscription_status: {
        type: DataTypes.ENUM('trial', 'active', 'past_due', 'expired'),
        defaultValue: 'trial'
    },
    subscription_expires_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'organizations',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Organization;

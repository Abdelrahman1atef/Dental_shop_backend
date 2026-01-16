const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrganizationUser = sequelize.define('OrganizationUser', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    organization_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'organizations',
            key: 'id'
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    role: {
        type: DataTypes.ENUM('doctor', 'assistant'),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('active', 'invited', 'inactive'),
        defaultValue: 'active'
    }
}, {
    tableName: 'organization_users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = OrganizationUser;

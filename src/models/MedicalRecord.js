const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MedicalRecord = sequelize.define('MedicalRecord', {
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
    patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'patients',
            key: 'id'
        }
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    diagnosis: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    treatment: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'medical_records',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false // Requirement only mentions created_at
});

module.exports = MedicalRecord;

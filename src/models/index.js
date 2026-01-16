const sequelize = require('../config/database');
const User = require('./User');
const Organization = require('./Organization');
const OrganizationUser = require('./OrganizationUser');
const Patient = require('./Patient');
const Appointment = require('./Appointment');
const MedicalRecord = require('./MedicalRecord');

// Define associations here if any
// Example: User.hasMany(Order);

const db = {
    sequelize,
    User,
    Organization,
    OrganizationUser,
    Patient,
    Appointment,
    MedicalRecord
};

// Associations
User.hasMany(OrganizationUser, { foreignKey: 'user_id' });
OrganizationUser.belongsTo(User, { foreignKey: 'user_id' });

Organization.hasMany(OrganizationUser, { foreignKey: 'organization_id' });
OrganizationUser.belongsTo(Organization, { foreignKey: 'organization_id' });

User.belongsToMany(Organization, { through: OrganizationUser, foreignKey: 'user_id' });
Organization.belongsToMany(User, { through: OrganizationUser, foreignKey: 'organization_id' });

// Patient Associations
Organization.hasMany(Patient, { foreignKey: 'organization_id' });
Patient.belongsTo(Organization, { foreignKey: 'organization_id' });

// Appointment Associations
Organization.hasMany(Appointment, { foreignKey: 'organization_id' });
Appointment.belongsTo(Organization, { foreignKey: 'organization_id' });

Appointment.belongsTo(Patient, { foreignKey: 'patient_id' });
Patient.hasMany(Appointment, { foreignKey: 'patient_id' });

Appointment.belongsTo(User, { as: 'Doctor', foreignKey: 'doctor_id' });
User.hasMany(Appointment, { foreignKey: 'doctor_id' });

// MedicalRecord Associations
Organization.hasMany(MedicalRecord, { foreignKey: 'organization_id' });
MedicalRecord.belongsTo(Organization, { foreignKey: 'organization_id' });

MedicalRecord.belongsTo(Patient, { foreignKey: 'patient_id' });
Patient.hasMany(MedicalRecord, { foreignKey: 'patient_id' });

MedicalRecord.belongsTo(User, { as: 'Creator', foreignKey: 'created_by' });
User.hasMany(MedicalRecord, { foreignKey: 'created_by' });

module.exports = db;

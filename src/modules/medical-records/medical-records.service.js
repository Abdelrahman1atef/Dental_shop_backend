const { MedicalRecord, Patient, User } = require('../../models');

const createMedicalRecord = async (data, organizationId, createdBy) => {
    return await MedicalRecord.create({
        ...data,
        organization_id: organizationId,
        created_by: createdBy
    });
};

const getMedicalRecords = async (organizationId, patientId = null) => {
    const where = { organization_id: organizationId };
    if (patientId) {
        where.patient_id = patientId;
    }

    return await MedicalRecord.findAll({
        where,
        include: [
            { model: Patient, attributes: ['full_name'] },
            { model: User, as: 'Creator', attributes: ['firstName', 'lastName'] }
        ]
    });
};

module.exports = {
    createMedicalRecord,
    getMedicalRecords
};

const { Patient } = require('../../models');

const createPatient = async (data, organizationId) => {
    return await Patient.create({
        ...data,
        organization_id: organizationId
    });
};

const getPatients = async (organizationId) => {
    return await Patient.findAll({
        where: { organization_id: organizationId }
    });
};

const getPatientById = async (id, organizationId) => {
    return await Patient.findOne({
        where: { id, organization_id: organizationId }
    });
};

const updatePatient = async (id, data, organizationId) => {
    const patient = await getPatientById(id, organizationId);
    if (!patient) {
        throw new Error('Patient not found');
    }
    return await patient.update(data);
};

module.exports = {
    createPatient,
    getPatients,
    getPatientById,
    updatePatient
};

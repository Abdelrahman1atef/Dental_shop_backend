const medicalRecordsService = require('./medical-records.service');

const create = async (req, res) => {
    try {
        const medicalRecord = await medicalRecordsService.createMedicalRecord(
            req.body,
            req.organization.id,
            req.user.id
        );
        res.status(201).json(medicalRecord);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const list = async (req, res) => {
    try {
        const { patient_id } = req.query;
        const medicalRecords = await medicalRecordsService.getMedicalRecords(
            req.organization.id,
            patient_id
        );
        res.json(medicalRecords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    create,
    list
};

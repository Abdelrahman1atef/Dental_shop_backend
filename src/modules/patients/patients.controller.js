const patientsService = require('./patients.service');

const create = async (req, res) => {
    try {
        const patient = await patientsService.createPatient(req.body, req.organization.id);
        res.status(201).json(patient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const list = async (req, res) => {
    try {
        const patients = await patientsService.getPatients(req.organization.id);
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const get = async (req, res) => {
    try {
        const patient = await patientsService.getPatientById(req.params.id, req.organization.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json(patient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const update = async (req, res) => {
    try {
        const patient = await patientsService.updatePatient(req.params.id, req.body, req.organization.id);
        res.json(patient);
    } catch (error) {
        if (error.message === 'Patient not found') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    create,
    list,
    get,
    update
};

const appointmentsService = require('./appointments.service');

const create = async (req, res) => {
    try {
        const appointment = await appointmentsService.createAppointment(req.body, req.organization.id);
        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const list = async (req, res) => {
    try {
        const { id: userId } = req.user;
        const { id: organizationId, role } = req.organization;

        const appointments = await appointmentsService.getAppointments(organizationId, role, userId);
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const update = async (req, res) => {
    try {
        const appointment = await appointmentsService.updateAppointment(req.params.id, req.body, req.organization.id);
        res.json(appointment);
    } catch (error) {
        if (error.message === 'Appointment not found') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    create,
    list,
    update
};

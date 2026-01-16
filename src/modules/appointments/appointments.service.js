const { Appointment, Patient, User } = require('../../models');

const createAppointment = async (data, organizationId) => {
    // Validate if doctor belongs to organization could be added here
    return await Appointment.create({
        ...data,
        organization_id: organizationId
    });
};

const getAppointments = async (organizationId, userRole, userId) => {
    const query = {
        where: { organization_id: organizationId },
        include: [
            { model: Patient, attributes: ['full_name'] },
            { model: User, as: 'Doctor', attributes: ['firstName', 'lastName'] }
        ]
    };

    // Rule: Doctor sees own appointments, Assistant sees all
    if (userRole === 'doctor') {
        query.where.doctor_id = userId;
    }

    return await Appointment.findAll(query);
};

const updateAppointment = async (id, data, organizationId) => {
    const appointment = await Appointment.findOne({
        where: { id, organization_id: organizationId }
    });

    if (!appointment) {
        throw new Error('Appointment not found');
    }

    return await appointment.update(data);
};

module.exports = {
    createAppointment,
    getAppointments,
    updateAppointment
};

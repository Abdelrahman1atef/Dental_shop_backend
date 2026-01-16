const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { sequelize } = require('./models'); // Will setup models index next

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get('/', (req, res) => {
    res.send('Dental Shop API is running');
});

// Routes
const authRoutes = require('./modules/auth/auth.routes');
const patientsRoutes = require('./modules/patients/patients.routes');
const appointmentsRoutes = require('./modules/appointments/appointments.routes');
const medicalRecordsRoutes = require('./modules/medical-records/medical-records.routes');
// const userRoutes = require('./modules/users/users.routes'); // To be implemented

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientsRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/medical-records', medicalRecordsRoutes);
// app.use('/users', userRoutes);

module.exports = app;

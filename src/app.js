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

// Routes (to be added)
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

module.exports = app;

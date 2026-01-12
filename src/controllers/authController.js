const authService = require('../services/authService');

const signUp = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password, additionalInfo } = req.body;

        // Basic validation
        if (!firstName || !lastName || !email || !phone || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const result = await authService.registerUser({
            firstName, lastName, email, phone, password, additionalInfo
        });

        // Remove password from response
        const userWithoutPassword = result.user.toJSON();
        delete userWithoutPassword.password;

        res.status(201).json({
            message: 'User registered successfully',
            user: userWithoutPassword,
            token: result.token
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const result = await authService.loginUser(email, password);

        // Remove password from response
        const userWithoutPassword = result.user.toJSON();
        delete userWithoutPassword.password;

        res.status(200).json({
            message: 'Login successful',
            user: userWithoutPassword,
            token: result.token
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

module.exports = {
    signUp,
    login
};

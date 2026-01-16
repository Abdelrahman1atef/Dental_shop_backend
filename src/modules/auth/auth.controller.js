const authService = require('./auth.service');

const login = async (req, res) => {
    try {
        const { email, password, organization_id } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const result = await authService.login(email, password, organization_id);
        res.json(result);
    } catch (error) {
        if (error.message === 'Invalid credentials') {
            return res.status(401).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    login
};

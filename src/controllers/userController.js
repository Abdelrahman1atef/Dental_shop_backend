const userService = require('../services/userService');

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        const status = error.message === 'User not found' ? 404 : 500;
        res.status(status).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        // Prevent password update through this generic route if needed, 
        // or let it be handled by model hooks.
        // For security, usually password updates are a separate flow.
        const user = await userService.updateUser(req.params.id, req.body);

        const userJSON = user.toJSON();
        delete userJSON.password;

        res.status(200).json({ message: 'User updated successfully', user: userJSON });
    } catch (error) {
        const status = error.message === 'User not found' ? 404 : 400;
        res.status(status).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        await userService.deleteUser(req.params.id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        const status = error.message === 'User not found' ? 404 : 500;
        res.status(status).json({ message: error.message });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};

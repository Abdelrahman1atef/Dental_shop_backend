const { User } = require('../models');

const getAllUsers = async () => {
    return await User.findAll();
};

const getUserById = async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

const updateUser = async (id, updateData) => {
    const user = await User.findByPk(id);
    if (!user) {
        throw new Error('User not found');
    }

    // Check if email is being updated and if it's already taken
    if (updateData.email && updateData.email !== user.email) {
        const existingUser = await User.findOne({ where: { email: updateData.email } });
        if (existingUser) {
            throw new Error('Email already in use');
        }
    }

    await user.update(updateData);
    return user;
};

const deleteUser = async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
        throw new Error('User not found');
    }
    await user.destroy();
    return true;
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};

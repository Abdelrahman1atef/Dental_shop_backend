const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUser = async (userData) => {
    // Check if user already exists
    const existingUser = await User.findOne({
        where: { email: userData.email }
    });

    if (existingUser) {
        throw new Error('User already exists');
    }

    // Create user (password hashing is handled by User model hooks)
    const user = await User.create(userData);

    // Generate token
    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );

    return { user, token };
};

const loginUser = async (email, password) => {
    // We need password to compare, so scope withPassword
    const user = await User.scope('withPassword').findOne({ where: { email } });

    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );

    return { user, token };
};

module.exports = {
    registerUser,
    loginUser
};

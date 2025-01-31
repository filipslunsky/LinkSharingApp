const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    _registeUser,
    _loginUser,
} = require('../models/usersModel.js');

dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const registeUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = await _registeUser(firstName, lastName, email, hashedPassword);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        };
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const data = await _loginUser(email);
        if (data.success) {
            const match = await bcrypt.compare(password, data.password);
            if (match) {
                const token = jwt.sign(
                    { userId: data.id, email: data.email },
                    ACCESS_TOKEN_SECRET,
                    { expiresIn: '1d' }
                );
                res.json({success: true, passwordMatch: true, firstName: data.firstName, lastName: data.lastName, email: data.email, userId: data.userId, hashId: data.hashId, profilePicture: data.profilePicture, token});
            } else {
                res.json({success: true, passwordMatch: false})
            }
        } else {
            res.status(400).json(data);
        };
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    registeUser,
    loginUser,
};
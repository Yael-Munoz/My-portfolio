const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const existingUser = await User.findOne({username});
        if(!existingUser) {
            return res.status(404).json({message : 'User was not found in our database'});
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if(!isMatch) {
            return res.status(401).json({message : 'The password is incorrect'});
        }
        const user = {
            _id: existingUser._id,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            username: existingUser.username
        }
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        const isProduction = process.env.NODE_ENV === 'production';

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000
        });
        res.status(200).json({message: 'Successful Login', accessToken});

    } catch(error) {
        return res.status(500).json({message : 'Internal server error'});
    }
});

module.exports = router;

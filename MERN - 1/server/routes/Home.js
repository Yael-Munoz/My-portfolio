const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/', verifyToken, (req, res) => {
    return res.status(200).json({message: `Welcome ${req.user.username}`});
});

router.put('/', verifyToken, async (req, res) => {
    const { oldUsername, oldPassword, newFirstName, newLastName, newUsername, newPassword } = req.body;

    try {
        const oldUser = await User.findOne({username: oldUsername});
        if(!oldUser) {
            return res.status(404).json({message: 'The username was not found'});
        } else if(!(await bcrypt.compare(oldPassword, oldUser.password))) {
            return res.status(401).json({message: 'The password does not match'});
        }
        oldUser.firstName = newFirstName;
        oldUser.lastName = newLastName;
        oldUser.username = newUsername;
        oldUser.password = await bcrypt.hash(newPassword, 10);
        await oldUser.save();
        return res.status(200).json({message: 'The user has been updated'});
    } catch(error) {
        res.status(500).json({message: 'Server internal error'});
    }
});

router.delete('/', verifyToken, async (req, res) => {
    const oldUser = await User.findOne({username: req.body.username});
    if(!oldUser) {
        return res.status(404).json({message: 'User was not found'});
    } else if (!req.body.password){
        return res.status(400).json({message: 'Password is required'});
    } else if(!(await bcrypt.compare(req.body.password, oldUser.password))) {
        return res.status(401).json({message: 'Password is incorrect'});
    }
    await User.deleteOne({_id: oldUser._id});
    return res.status(200).json({message: 'The user has been deleted'});
});

router.post('/', (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({message: 'Logged out successfully'});
});

function verifyToken(req, res, next) {
    const token = req.cookies.accessToken;
    if(!token) {
        return res.status(404).json({message: 'Access denied. No token provided'});
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if(error) {
            return res.status(403).json({message: 'Unauthorized token'});
        }
        req.user = user;
        next();
    });
};

module.exports = router;

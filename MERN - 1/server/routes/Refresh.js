const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/', (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) {
        return res.status(401).json({message: 'No refresh token provided'});
    }


    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
    if(error) {
        return res.status(403).json({message: 'Invalid refresh token'});
    }

    const newAccessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10m'});

    res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 10 * 60 * 1000
    });

    res.status(200).json({message: 'Access Token refreshened'})
    });
});
module.exports = router;
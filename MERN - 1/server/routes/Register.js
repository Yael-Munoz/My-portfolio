const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const data = req.body;
    console.log('Data was received: ', data);

    const errors = [];
    
    if(!data.firstName || data.firstName.length > 20) {
        errors.push('First name is required and cannot exceed 20 characters.');
    }
    if(!data.lastName || data.lastName.length > 20) {
        errors.push('Last name is required and cannot exceed 20 characters.');
    }
    if(!data.username || data.username.length < 4 || data.username.length > 12) {
        errors.push('Username must be between 4 and 12 characters.');
    }
    if(!data.password || data.password.length < 6 || data.password.length > 20) {
        errors.push('Password must be between 6 and 20 characters.');
    }
    if(errors.length > 0) {
        console.log("Error(s) were returned");
        return res.status(400).json({ errors });
    }
    const firstName = data.firstName;
    const lastName = data.lastName;
    const username = data.username;
    
    const password = await bcrypt.hash(data.password, 10);


    
    try {
        
        const user = await User.create({firstName, lastName, username, password});

        console.log('User registered: ', user);
        res.status(201).json(('User registered successfully'));
    } catch(error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }


});




module.exports = router;
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();


const users = [
    {
        name: 'Juan',
        username: 'Juanchoxd'
    },
    {
        name: 'Pedro',
        username: 'Piedraxd'
    }
]


router.get('/posts', (req, res) => {
    res.json(users);
});

router.get('/login', (req, res) => {
    
});

module.exports = router;
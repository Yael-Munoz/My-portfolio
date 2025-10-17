const express = require('express');
const server = express();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const registerRoute = require('./routes/Register');
const loginRoute = require('./routes/Login');
const homeRoute = require('./routes/Home');
const testRouter = require('./routes/test');
const refreshRouter = require('./routes/Refresh');

require('dotenv').config();

const serverPORT = 3000;
const serverURL = `http://localhost:${serverPORT}`;
const clientPORT = 5173;
const clientURL = `http://localhost:${clientPORT}`

server.use(cors(
    {origin: clientURL, credentials: true}
));
server.use(express.json());
server.use(cookieParser());
server.use('/register', registerRoute);
server.use('/login', loginRoute);
server.use('/home', homeRoute);
server.use('/test', testRouter);
server.use('/refresh', refreshRouter);

const mongoURI = 'mongodb://localhost:27017/mern1';


mongoose.connect(mongoURI)
.then(() => {
    console.log('Database connection succesful');
    server.listen(serverPORT, () => {
    console.log(`Server is listening on ${serverURL}`);
});
})
.catch(() => {
    console.log('Database connection failed');
});

server.get('/', (req, res) => { 
    res.send('<h1>You succesfully contacted the server</h1>');
});

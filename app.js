require('dotenv').config();

const express = require('express');
const app = express();
const db = require('./db');

const UserRoutes = require('./user/UserRoutes');
const AuthRoutes = require('./auth/AuthRoutes');

const {errorCodes: errorCodesMiddleware} = require('./middleware');

// Adds the _sendError method to the res object in all routes that
// can be used to send a status of 500 and an error message
app.use(errorCodesMiddleware);

app.use('/users', UserRoutes);
app.use('/auth', AuthRoutes);

module.exports = app;

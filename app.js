require('dotenv').config();

const express = require('express');
const app = express();
const db = require('./db');
const cors = require('cors');

const UserRoutes = require('./user/UserRoutes');
const AuthRoutes = require('./auth/AuthRoutes');
const ClientRoutes = require('./Client/ClientRoutes');

const {
  jwtProtected: jwtMiddleware,
  errorCodes: errorCodesMiddleware,
} = require('./middleware');

app.use(cors());

// Adds the _sendError method to the res object in all routes that
// can be used to send a status of 500 and an error message
app.use(errorCodesMiddleware);

app.use('/users', UserRoutes);
app.use('/auth', AuthRoutes);
app.use('/client', jwtMiddleware, ClientRoutes);

module.exports = app;

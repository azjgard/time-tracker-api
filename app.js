require('dotenv').config();

const express = require('express');
const app = express();
const db = require('./db');

const UserRoutes = require('./user/UserRoutes');
const AuthController = require('./auth/AuthController');

app.use('/users', UserRoutes);
app.use('/auth', AuthController);

// verify JWT for protected routes
app.use;

module.exports = app;

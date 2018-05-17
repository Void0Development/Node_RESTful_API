const express = require('express');
const AuthController = require('../controllers/auth_control');
let routes = express.Router();


routes.post('/', AuthController.login);


// Export the routes
module.exports = routes;
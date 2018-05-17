const express = require('express');
const AuthController = require('../controllers/auth_control');
let routes = express.Router();


routes.get('/', function (req, res) {
    res.contentType('application/json');
    res.status(200);
    res.json({ 'tekst': 'API beschikbaar, gebruik /register en /login!' })
});

// endpoints
routes.post('/login', AuthController.login);
routes.post('/register', AuthController.register);

// Export the routes
module.exports = routes;
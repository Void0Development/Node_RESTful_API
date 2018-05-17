
var express = require('express');
var routes = express.Router();
var statusController = require('../controllers/status.controller');

module.exports = {}

routes.get('/status*', statusController.getStatus);

module.exports = routes;
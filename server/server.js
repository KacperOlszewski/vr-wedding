const express = require('express');
const bodyParser = require('body-parser');
const authorize = require('./logic/authorize');
const users = require('./logic/users');

const api = '/api/';
const server = express();

module.exports = function(port) {
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    authorize(server, api);
    users(server, api);
    server.listen(port);

    console.log('Server start: ' + port);
};

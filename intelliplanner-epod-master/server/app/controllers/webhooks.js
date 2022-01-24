const express = require('express');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const db = require('../../config/db.config.js');
const Admin = db.admin;
const Transporter = db.transporter;

module.exports = function(app) {

    const apiRoutes = express.Router();

    apiRoutes.get('/hook', function(req, res) {
                res.json({ message: 'login successful', status: 1 });
    });

    app.use('/', apiRoutes);
};
const express = require('express');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const db = require('../../config/db.config.js');
const Settings = db.settings;
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const Transporter = db.transporter;
const Driver = db.driver;
const Shipment = db.shipment;
var transport;
var fromMail;


// ------------------------------------------epod-----------------------------------------------

module.exports = function(app) {

    const apiRoutes = express.Router();

    initializeSMTP();

    function initializeSMTP() {

        Settings.findOne({ where: { id: 1 } }).then((settings) => {

            // console.log(settings);
            if (settings.smtp_server) {
                fromMail = settings.smtp_username;
                // console.log(settings.smtp_server);
                transport = nodemailer.createTransport(smtpTransport({
                    host: settings.smtp_server,
                    port: settings.smtp_port,
                    auth: {
                        user: settings.smtp_username,
                        pass: settings.smtp_password
                    },
                    tls: {
                        rejectUnauthorized: false
                    },
                }));


                // var mailOptions = {
                //     from: 'Elvento Labs <info@elvento.com>', // sender address
                //     to: 'deviltrigger8@gmail.com', // list of receivers
                //     subject: '[Contact Form] Elvento Marketplace', // Subject line
                //    // text: req.body.body, // plaintext body
                //     html: 'req.body.name req.body.email req.body.body' // html body
                // };

                // transport.sendMail(mailOptions, function(error, info) {
                //     if (error) {
                //     response.send(error);
                //         return console.log(error);
                //     }
                //     console.log({status: true});
                // });
            }
        }, error => {
            // console.log("error ",error);
        });
    }


    app.post('/getShipment', (req, res) => {
        Shipment.findOne({ where: { shipment_number: req.body.shipment_number } }).then((shipment) => {
            res.json(shipment);
        }, error => {
            res.json(error);
        });
    })

    app.post('/getSettings', (req, res) => {
        Settings.findOne({ where: { id: 1 } }).then((settings) => {
            res.json(settings);
        }, error => {
            res.json(error);
        });
    })


    app.post('/updateSettings', (req, res) => {
        const settings = req.body.settingsObj;
        Settings.update(settings, {
            where: { id: 1 }
        }).then(() => {
            initializeSMTP();
            res.json({ message: 'successfully updated settings' });
        }, error => {
            res.json(error);
        });
    })


    function sendEmail(email, subject, message) {
        var mailOptions = {
            from: 'Intelli Planner <' + fromMail + '>', // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            // text: req.body.body, // plaintext body
            html: message // html body
        };

        transport.sendMail(mailOptions, function(error, info) {
            if (error) {
                response.send(error);
                return console.log(error);
            }
            console.log({ status: true });
        });
    }


    app.use('/', apiRoutes);
};
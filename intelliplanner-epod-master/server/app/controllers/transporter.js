const express = require('express');
var jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const toWords = require('to-words');
const db = require('../../config/db.config.js');
const sha512 = require('js-sha512');
const Op = Sequelize.Op
const Invoice = db.invoice;
const Shipment = db.shipment;
const Transporter = db.transporter;
const PurchaseOrder = db.purchaseorder;
const TransporterInvoices = db.transporterInvoices;
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
var request = require('request');
const soap = require('soap');
var async = require("async");

const passport = require('passport');
const config = require('../../config/main');
const requireAuth = passport.authenticate('jwt', { session: false });


var convert = require('xml-js');

var xml2js = require('xml2js');
// var http = require('http');
const Plant = db.plant;
const TransporterPlant = db.transporterPlant;

var mailer = nodemailer.createTransport(smtpTransport({
    host: 'smtp.zoho.com',
    port: 465,
    auth: {
        user: 'info@elvento.com',
        pass: 'Dante12345,.'
    },
    tls: {
        rejectUnauthorized: false
    },
}));



module.exports = function(app) {


    // Bring in defined Passport Strategy

    require('../../config/passport')(passport);

    const apiRoutes = express.Router();
    console.log("transporter transporter transporter transporter transporter")

    apiRoutes.get('/token', requireAuth, function(req, res) {
        res.send({ status: true })
    })

    apiRoutes.post('/transporterLogin', function(req, res) {
        const item = req.body.userObj;
        TransporterPlant.findOne({ where: { transporter_ID: item.transporter_ID } }).then((user) => {
            if (user && user.password == item.password) {
                Transporter.findOne({ where: { transporter_code: user.transporter_code } }).then((transportuser) => {

                    console.log("user ", user.transporter_ID)
                    // console.log("transportuser ",transportuser)
                    const token = jwt.sign({ transporter_ID: user.transporter_ID }, config.secret, {
                        expiresIn: 10080 // in seconds
                    });

                    res.json({ message: 'login successful', status: 1, transporterCode: user.transporter_code, transporterName: transportuser.name, transporterID: user.transporter_ID, plant: user.plant_code, token: 'Bearer ' + token });

                })

            } else {
                res.json({ message: 'invalid transporterID/password', status: 0 });
            }
        }, error => {
            res.json({ message: 'invalid transporterID/password', status: 0 });
        });
        // Transporter.findOne({ where:{id: item.id }}).then((user) => {
        //     if (user.password == item.password) {
        //         res.json({ message: 'login successful', status: 1, transporterCode: user.transporter_code,transporterName: user.name });
        //     } else {
        //         res.json({ message: 'invalid username/password', status: 0 });
        //     }
        // }, error => {
        //     res.json({ message: 'invalid username/password', status: 0 });
        // });

    });


    // FORMAT OF TOKEN
    // Authorization: Bearer <a


    apiRoutes.post('/fetchTransporter', function(req, res) {
        const item = req.body.data;
        var idobj = {
            transporter_ID: item.transporterID,
            transporter_code: item.transporterCode
        }

        TransporterPlant.findOne({ where: idobj }).then((user) => {
            if (user && user.password) {
                res.json({ status: true, user: user });
            } else {
                res.json({ status: false, message: 'error' });
            }
        }, error => {
            res.json(error);
        });

    });

    apiRoutes.post('/changePassword', function(req, res) {
        var item = req.body.data;
        var pwd = req.body.pwdobj;
        var idobj = {
            transporter_ID: item.transporterID,
            transporter_code: item.transporterCode
        }

        TransporterPlant.update(pwd, { where: idobj }).then((user) => {
            if (user[0] == 1) {
                res.json({ status: true, message: 'Password Update Successfully' });
            } else {
                res.json({ status: false, message: 'Not Updated' });
            }
        }, error => {
            res.json(error);
        });

    });


    app.post('/searchTransporter', (req, res) => {
        const searchTerm = req.body.searchTerm;
        const statusValue = req.body.statusValue;
        console.log("pageStatus  ", req.body);

        if (statusValue == 1) {
            let where = {
                [Op.or]: [{
                        name: {
                            [Op.like]: '%' + searchTerm + '%'
                        }
                    }, {
                        transporter_code: {
                            [Op.like]: '%' + searchTerm + '%'
                        }
                    },
                    {
                        phone: {
                            [Op.like]: '%' + searchTerm + '%'
                        }
                    }
                ]
            }

            // let where = {
            //     name: {
            //         [Op.like]: '%' + searchTerm + '%'
            //     }
            // }

            Transporter.findAll({
                where: where
            }).then((resp) => {
                res.json(resp);
            }, error => {
                res.json(error);
            });
        } else if (statusValue == 2) {
            let where = {
                [Op.or]: [{
                        plant_name: {
                            [Op.like]: '%' + searchTerm + '%'
                        }
                    }, {
                        transporter_ID: {
                            [Op.like]: '%' + searchTerm + '%'
                        }
                    },
                    {
                        transporter_code: {
                            [Op.like]: '%' + searchTerm + '%'
                        }
                    }
                ]
            }

            // let where = {
            //     name: {
            //         [Op.like]: '%' + searchTerm + '%'
            //     }
            // }

            TransporterPlant.findAll({
                where: where
            }).then((resp) => {
                res.json(resp);
            }, error => {
                res.json(error);
            });
        }
    })

    app.post('/getShipmentsCount', requireAuth, (req, res) => {
        const transporterCode = req.body.code;
        const trplantCode = req.body.plantcode;
        console.log("9999999999", trplantCode)

        var query =


            // query = 'SELECT' +
            // ' invoices.id, invoices.invoice_number, invoices.signed_lr_image, invoices.invoice_date, invoices.invoice_time, invoices.destination_name, shipments.sto, invoices.do_number, invoices.shiptoparty_name, shipments.vehicle_no, shipments.driver_name, shipments.driver_phoneno, shipments.driver_using_smartphone_or_sim_plant, invoices.invoice_quantity, invoices.shiptoparty_name, invoices.shipment_number, shipments.shipment_number ' +
            // ' FROM `invoices` JOIN `shipments` ON shipments.shipment_number = invoices.shipment_number ' +
            // ' WHERE shipments.transporter_code="'+filterTransportercode+'" AND invoices.lr_number IS NOT NULL AND invoices.signed_lr_image IS NOT NULL  AND shipments.plant="' +filterplantcode +'"'    invoices.signed_lr_image is not null and invoices.customer_accepted

            db.sequelize
            .query('SELECT' +
                ' SUM(CASE WHEN invoices.destination_location is null THEN 1 ELSE 0 END) AS plantLocMissing,' +
                ' SUM(CASE WHEN invoices.signed_lr_image is null THEN 1 ELSE 0 END) AS lrMissing,' +
                ' SUM(CASE WHEN invoices.customer_accepted = 0 THEN 1 ELSE 0 END) AS disputes,' +
                ' SUM(CASE WHEN invoices.signed_lr_image is not null and (invoices.customer_accepted is null OR invoices.customer_accepted = 0) THEN 1 ELSE 0 END) AS waitingCustAccpt,' +
                ' SUM(CASE WHEN invoices.signed_lr_image is not null and purchaseorders.purchase_order_number is not null and invoices.customer_accepted = 1 THEN 1 ELSE 0 END) AS invoiceReady,' +
                ' SUM(CASE WHEN invoices.destination_location is null and plant_location is not null THEN 1 ELSE 0 END) AS inTransit from `invoices` LEFT JOIN `shipments` ON shipments.shipment_number = invoices.shipment_number LEFT JOIN `purchaseorders` ON invoices.shipment_number = purchaseorders.shipment_number where  invoices.cancellation_indicator="Constant" and shipments.transporter_code="' + transporterCode + '" AND shipments.plant="' + trplantCode + '"', { type: Sequelize.QueryTypes.SELECT })
            .then(data => {
                res.json(data);
            })

        // db.sequelize
        // .query('SELECT' +
        // ' SUM(CASE WHEN driver_phoneno is null THEN 1 ELSE 0 END) AS driverDetailsMissing,' +
        // ' SUM(CASE WHEN driver_phoneno is not null and (plant_location is null or (destination_location is null)) THEN 1 ELSE 0 END) AS plantLocMissing,' +
        // ' SUM(CASE WHEN driver_phoneno is not null and (lr_number is null or lr_number = "") THEN 1 ELSE 0 END) AS lrMissing,' +
        // ' SUM(CASE WHEN customer_accepted = 0 THEN 1 ELSE 0 END) AS disputes,' +
        // ' SUM(CASE WHEN destination_location is not null and customer_accepted is null THEN 1 ELSE 0 END) AS waitingCustAccpt,' +
        // ' SUM(CASE WHEN destination_location is not null and customer_accepted = 1 THEN 1 ELSE 0 END) AS invoiceReady,' +
        // ' SUM(CASE WHEN destination_location is null and plant_location is not null THEN 1 ELSE 0 END) AS inTransit from shipments where shipments.transporter_code="'+ transporterCode +'" AND shipments.plant="'+ trplantCode +'"', {
        // model: Shipment,
        // mapToModel: true // pass true here if you have any mapped fields                                                                                                         
        // })
        // .then(data => {
        // res.json(data);
        // })
    })

    app.post('/getAllShipments', requireAuth, (req, res) => {
        const code = req.body.code;
        const plantcode = req.body.plantcode;
        console.log("========----", plantcode)
        let where = {
            transporter_code: code,
            plant: plantcode
        }
        Shipment.findAll({
            where: where
        }).then((resp) => {
            res.json(resp);
        }, error => {
            res.json(error);
        });
    })




    app.post('/getAllInvoices', requireAuth, (req, res) => {
        const code = req.body.code;
        const plantcode = req.body.plantcode;

        db.sequelize
            .query('SELECT' +
                ' invoices.id, invoices.invoice_number, invoices.lr_number, invoices.shiptoparty_name, invoices.signed_lr_image, invoices.invoice_date, invoices.invoice_time, invoices.destination_name, invoices.customer_emailid,invoices.destination_location, invoices.customer_reply_status,invoices.customer_accepted,invoices.customer_declined_reason,invoices.shiptoparty_mobileno,invoices.soldtoparty_mobileno, shipments.plant_location, shipments.sto, invoices.do_number, invoices.intermediate_location, invoices.driver_consent_status, invoices.plant_driver_sms_rcvd_time, invoices.dest_driver_loc_time, invoices.dest_driver_reach_time, shipments.vehicle_no, shipments.driver_name, shipments.driver_phoneno, shipments.driver_using_smartphone_or_sim_plant,shipments.lr_number AS ship_lrnumber, invoices.invoice_quantity, invoices.shipment_number, shipments.shipment_number ' +
                ' FROM `invoices` JOIN `shipments` ON shipments.shipment_number = invoices.shipment_number ' +
                ' WHERE shipments.transporter_code="' + code + '"  AND invoices.cancellation_indicator="Constant" AND shipments.cancellation_indicator="Constant"  AND shipments.plant="' + plantcode + '"', { type: Sequelize.QueryTypes.SELECT })
            .then(data => {
                res.json(data);
            })
    })


    app.post('/getCompletePoInvoices', (req, res) => {
        const code = req.body.code;
        const plantcode = req.body.plantcode;

        db.sequelize
            .query('SELECT' +
                ' invoices.id, invoices.invoice_number, invoices.lr_number, invoices.shiptoparty_name, invoices.signed_lr_image, invoices.invoice_date, invoices.invoice_time, invoices.destination_name, invoices.destination_location,invoices.customer_emailid, invoices.customer_reply_status, invoices.shiptoparty_mobileno,invoices.soldtoparty_mobileno, invoices.do_number, invoices.intermediate_location, invoices.driver_consent_status, invoices.plant_driver_sms_rcvd_time, invoices.dest_driver_loc_time, invoices.dest_driver_reach_time, invoices.invoice_quantity, invoices.shipment_number, shipments.shipment_number,shipments.lr_number AS ship_lrnumber ,purchaseorders.purchase_order_number,purchaseorders.purchase_order_date,purchaseorders.shipment_cost_number,purchaseorders.shipment_cost,purchaseorders.rate,purchaseorders.quantity ' +
                ' FROM `invoices` JOIN `shipments` ON shipments.shipment_number = invoices.shipment_number JOIN `purchaseorders` ON invoices.shipment_number = purchaseorders.shipment_number ' +
                ' WHERE shipments.transporter_code="' + code + '"  AND invoices.cancellation_indicator="Constant" AND shipments.cancellation_indicator="Constant"  and invoices.customer_accepted = 1 AND shipments.plant="' + plantcode + '"', { type: Sequelize.QueryTypes.SELECT })
            .then(data => {
                res.json(data);
            })
    })

    app.post('/getSearchedInvoices', (req, res) => {
        const searchTerm = req.body.searchTerm;
        const code = searchTerm.code;
        const plantcode = searchTerm.plantcode;
        var value = searchTerm.value;
        console.log(req.body)
        db.sequelize
            .query('SELECT' +
                ' invoices.id, invoices.invoice_number, invoices.lr_number, invoices.shiptoparty_name, invoices.signed_lr_image, invoices.invoice_date, invoices.invoice_time, invoices.destination_name, invoices.destination_location, invoices.customer_emailid,                      invoices.customer_reply_status,invoices.customer_accepted,invoices.shiptoparty_mobileno,invoices.soldtoparty_mobileno, shipments.plant_location, shipments.sto, invoices.do_number, invoices.intermediate_location, invoices.driver_consent_status, invoices.plant_driver_sms_rcvd_time, invoices.dest_driver_loc_time, invoices.dest_driver_reach_time, shipments.vehicle_no, shipments.driver_name, shipments.driver_phoneno, shipments.driver_using_smartphone_or_sim_plant,shipments.lr_number AS ship_lrnumber, invoices.invoice_quantity, invoices.shipment_number, shipments.shipment_number ' +
                ' FROM `invoices` JOIN `shipments` ON shipments.shipment_number = invoices.shipment_number ' +
                ' WHERE shipments.transporter_code="' + code + '"  AND invoices.cancellation_indicator="Constant" AND shipments.cancellation_indicator="Constant"  AND shipments.plant="' + plantcode + '" AND (invoices.invoice_number="' + value + '" OR shipments.vehicle_no="' + value + '" OR invoices.shipment_number="' + value + '")', { type: Sequelize.QueryTypes.SELECT })
            .then(data => {
                res.json(data);
            })
    })

    app.post('/getSearchedShipment', (req, res) => {
        const searchTerm = req.body.searchTerm;
        const filter = req.body.dateFilter;
        delete searchTerm.fromDate;
        delete searchTerm.toDate;
        var where = {}

        where = searchTerm;
        // let where = {
        //     [Op.or]: [{
        //         lr_number: {
        //             [Op.like]: '%' + searchTerm.searchLrTerm + '%'
        //         },
        //     }, {
        //         shipment_number: {
        //             [Op.like]: '%' + searchTerm.searchShipmentTerm + '%'
        //         },
        //     },
        //     {
        //         plant: {
        //             [Op.like]: '%' + searchTerm.searchPlantTerm + '%'
        //         },
        //     },
        //     {
        //         transporter_name: {
        //             [Op.like]: '%' + searchTerm.searchTransportTerm + '%'
        //         },
        //     },
        //     {
        //         customer_name: {
        //             [Op.like]: '%' + searchTerm.searchCustomerTerm + '%'
        //         },
        //     },
        //     {
        //         shipment_status: {
        //             [Op.like]: '%' + searchTerm.status + '%'
        //         },
        //     }]
        // }

        if (filter.fromDate != null && filter.toDate != null) {
            where.shipment_creation_date = {
                [Op.between]: [filter.fromDate, filter.toDate]
            }
        }

        Shipment.findAll({
            where: where
        }).then((resp) => {
            console.log("resp==--  ", resp);
            res.json(resp);
        }, error => {
            res.json(error);
        });
    })

    app.post('/getFilteredShipments', (req, res) => {
        const filter = req.body.filter;
        const filterTransportercode = req.body.code;
        const filterplantcode = req.body.plantcode;
        let where, query;
        if (filter == 'driverDetailsMissing')
            where = { driver_phoneno: null, transporter_code: filterTransportercode, plant: filterplantcode }

        if (filter == 'lrMissing') {
            query = 'SELECT ' +
                'invoices.id, invoices.invoice_number, invoices.lr_number, invoices.shiptoparty_name,invoices.shiptoparty_mobileno,invoices.soldtoparty_mobileno, invoices.signed_lr_image, invoices.invoice_date, invoices.invoice_time, invoices.destination_name, invoices.customer_emailid,invoices.destination_location, invoices.customer_reply_status, invoices.intermediate_location, invoices.driver_consent_status, invoices.plant_driver_sms_rcvd_time, invoices.dest_driver_loc_time, invoices.dest_driver_reach_time, shipments.plant_location, shipments.sto, invoices.do_number, shipments.vehicle_no, shipments.driver_name, shipments.driver_phoneno, shipments.driver_using_smartphone_or_sim_plant,shipments.lr_number AS ship_lrnumber, invoices.invoice_quantity, invoices.shipment_number, shipments.shipment_number ' +
                ' FROM `invoices` JOIN `shipments` ON shipments.shipment_number = invoices.shipment_number ' +
                ' WHERE shipments.transporter_code="' + filterTransportercode + '" AND invoices.cancellation_indicator="Constant" AND shipments.cancellation_indicator="Constant"  AND invoices.signed_lr_image IS NULL  AND shipments.plant="' + filterplantcode + '"'
        }


        if (filter == 'inTransit')
            where = {
                [Op.and]: [{
                    plant_location: {
                        [Op.ne]: null
                    },
                    transporter_code: filterTransportercode,
                    plant: filterplantcode
                }, {
                    destination_location: null,
                    transporter_code: filterTransportercode,
                    plant: filterplantcode
                }]
            }

        if (filter == 'plantLocMissing') {

            query = 'SELECT' +
                ' invoices.id, invoices.invoice_number, invoices.signed_lr_image, invoices.invoice_date, invoices.invoice_time, invoices.destination_name, shipments.sto, invoices.do_number, invoices.customer_emailid, invoices.destination_location, invoices.shiptoparty_name, invoices.shiptoparty_mobileno,invoices.soldtoparty_mobileno, invoices.intermediate_location, invoices.driver_consent_status, invoices.plant_driver_sms_rcvd_time, invoices.dest_driver_loc_time, invoices.dest_driver_reach_time, shipments.vehicle_no, shipments.driver_name, shipments.driver_phoneno, shipments.driver_using_smartphone_or_sim_plant, shipments.lr_number AS ship_lrnumber,invoices.invoice_quantity, invoices.shiptoparty_name, invoices.shipment_number, shipments.shipment_number ' +
                ' FROM `invoices` JOIN `shipments` ON shipments.shipment_number = invoices.shipment_number ' +
                ' WHERE shipments.transporter_code="' + filterTransportercode + '" AND invoices.cancellation_indicator="Constant" AND shipments.cancellation_indicator="Constant"  AND invoices.destination_location is null AND shipments.plant="' + filterplantcode + '"'
            // invoices.signed_lr_image is not null and invoices.customer_accepted is null
        }

        if (filter == 'disputes')
            where = { customer_accepted: 0, transporter_code: filterTransportercode, plant: filterplantcode }

        if (filter == "waitingCustAccpt") {
            query = 'SELECT' +
                ' invoices.id, invoices.invoice_number, invoices.signed_lr_image, invoices.invoice_date, invoices.invoice_time, invoices.customer_accepted, invoices.customer_declined_reason, invoices.destination_name, invoices.customer_emailid,                                     invoices.intermediate_location,invoices.destination_location, invoices.do_number, invoices.shiptoparty_name, invoices.shiptoparty_mobileno,invoices.soldtoparty_mobileno, invoices.driver_consent_status, invoices.plant_driver_sms_rcvd_time, invoices.dest_driver_loc_time, invoices.dest_driver_reach_time, shipments.vehicle_no, shipments.driver_name, shipments.driver_phoneno,shipments.sto, shipments.driver_using_smartphone_or_sim_plant, invoices.invoice_quantity, invoices.shiptoparty_name, invoices.shipment_number, shipments.shipment_number ' +
                ' FROM `invoices` JOIN `shipments` ON shipments.shipment_number = invoices.shipment_number ' +
                ' WHERE shipments.transporter_code="' + filterTransportercode + '" AND invoices.cancellation_indicator="Constant" AND shipments.cancellation_indicator="Constant"  AND (invoices.customer_accepted is null OR invoices.customer_accepted = 0 ) AND invoices.signed_lr_image IS NOT NULL AND shipments.plant="' + filterplantcode + '"';
        }


        if (filter == 'invoiceReady') {

            query = 'SELECT' +
                ' invoices.id, invoices.invoice_number, invoices.lr_number, invoices.transporter_invoice_number, invoices.plant,invoices.invoice_submit_status, invoices.shiptoparty_name,invoices.customer_emailid, invoices.shiptoparty_mobileno,invoices.soldtoparty_mobileno,invoices.signed_lr_image, invoices.invoice_date, invoices.invoice_time, invoices.destination_name, invoices.destination_location, invoices.customer_reply_status, invoices.customer_accepted,invoices.do_number, invoices.invoice_quantity, invoices.intermediate_location, invoices.driver_consent_status, invoices.plant_driver_sms_rcvd_time, invoices.dest_driver_loc_time, invoices.dest_driver_reach_time, invoices.shipment_number, shipments.shipment_number, shipments.vehicle_no, shipments.sto, shipments.driver_using_smartphone_or_sim_plant ,purchaseorders.purchase_order_number, purchaseorders.purchase_order_date, purchaseorders.left_submit, purchaseorders.shipment_cost_number, purchaseorders.shipment_cost, purchaseorders.rate, purchaseorders.quantity ' +
                ' FROM `invoices` LEFT JOIN `shipments` ON shipments.shipment_number = invoices.shipment_number LEFT JOIN `purchaseorders` ON invoices.shipment_number = purchaseorders.shipment_number ' +
                ' WHERE shipments.transporter_code="' + filterTransportercode + '" AND invoices.cancellation_indicator="Constant" AND shipments.cancellation_indicator="Constant"  and purchaseorders.purchase_order_number is not null AND  shipments.plant="' + filterplantcode + '"'

            // query = 'SELECT' +
            // ' invoices.id, invoices.invoice_number, invoices.signed_lr_image, invoices.invoice_date, invoices.invoice_time, invoices.destination_name, invoices.destination_location,shipments.sto, invoices.do_number, invoices.shiptoparty_name, shipments.vehicle_no, shipments.driver_name, shipments.driver_phoneno, shipments.driver_using_smartphone_or_sim_plant, invoices.invoice_quantity, invoices.shiptoparty_name, invoices.shipment_number, shipments.shipment_number ' +
            // ' FROM `invoices` JOIN `shipments` ON shipments.shipment_number = invoices.shipment_number ' +
            // ' WHERE shipments.transporter_code="'+filterTransportercode+'" AND invoices.signed_lr_image IS NOT NULL AND invoices.customer_accepted = 1 AND shipments.plant="' +filterplantcode +'"'

        }


        db.sequelize
            .query(query, { type: Sequelize.QueryTypes.SELECT })
            .then(data => {




                res.json(data);
            })

        // Invoice.findAll({
        // where: where
        // }).then((resp) => {
        // res.json(resp);
        // }, error => {
        // res.json(error);
        // });
    })


    apiRoutes.post('/updateLR', (req, res) => {
        var ship = req.body.shipment;
        var where = {
            shipment_number: ship.shipment_number,
            plant: ship.plant,
            transporter_code: ship.transporter_code
        }
        Shipment.update(ship, { where: where }).then((resp) => {
            res.json(resp);
        }, error => {
            res.json(error);
        });

    })

    // ----------------------------------Demo Sim Tracking API starts-----------------------------------------------

    apiRoutes.get('/getAcccessToken', (req, res) => {

        var url = 'https://india-agw.telenity.com/oauth/token?grant_type=client_credentials';

        var headers = {
            'Authorization': 'Basic NzdhYzI3ZTJiNmI0N2U2YTA5OTUxOGI0NDMyY2U0ZWYxYzZhOTZhNjo1NWZlOTcxNjI4ZmFkZTU2NWJjYTZhZjg3MjIxNGQyOWU2NWZmODlh',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Host': 'india-agw.telenity.com',
            'Accept': '*/*',
            'User-Agent': 'curl/7.50.3'
        };


        request.post({ headers: headers, url: url, method: 'POST' }, function(e, r, body) {

            var bodyValues = JSON.parse(body);
            console.log("====================================");
            console.log('error:', e); // Print the error if one occurred
            console.log('statusCode:', r && r.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
            console.log("====================================");
            res.send(bodyValues);
            // console.log('body:', bodyValues);
        });

    })


    apiRoutes.get('/getConsent/:phNo', (req, res) => {
        var phone = req.params.phNo;
        var url = 'https://india-agw.telenity.com/apigw/testconsent/v2/location?address=tel:+91' + phone;

        var headers = {
            'Host': 'india-agw.telenity.com',
            'Cache-Control': 'no-cache',
            'Authorization': 'Bearer 056da53717bc1e3605355b98a0fa4b37',
            'User-Agent': 'application/json'
        };


        request.get({ headers: headers, url: url, method: 'GET' }, function(e, r, body) {

            var bodyValues = JSON.parse(body);
            console.log("====================================");
            console.log('error:', e); // Print the error if one occurred
            console.log('statusCode:', r && r.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
            console.log("====================================");
            // res.send(bodyValues);
            console.log('body:', bodyValues);
        });



    })


    apiRoutes.get('/getLocation', (req, res) => {

        var url = 'https://india-agw.telenity.com/apigw/testterminallocationservice/v2/location?address=tel+918448152275&requestedAccuracy=100';

        var headers = {
            'Host': 'india-agw.telenity.com',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache',
            'Accept': 'application/json',
            'Authorization': 'Bearer 056da53717bc1e3605355b98a0fa4b37'
        };


        request.get({ headers: headers, url: url, method: 'GET' }, function(e, r, body) {

            var bodyValues = JSON.parse(body);
            console.log("====================================");
            console.log('error:', e); // Print the error if one occurred
            console.log('statusCode:', r && r.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
            console.log("====================================");
            // res.send(bodyValues);
            console.log('body:', bodyValues);
        });



    })

    // ----------------------------------Demo Sim Tracking API ends-----------------------------------------------

    apiRoutes.post('/getmissingLR', (req, res) => {
        var tcode = req.body.code;
        var pcode = req.body.plantcode;
        console.log(tcode)
        // let where = {
        //     transporter_code: tcode , lr_number : '', plant:pcode,
        //     lr_number: { [Op.eq]: null}, 
        // }

        let where = {
            [Op.or]: [{ lr_number: '' }, { lr_number: null }],
            transporter_code: tcode,
            plant: pcode
        }

        Shipment.findAll({
            where: where
        }).then((resp) => {
            res.json(resp);
        }, error => {
            res.json(error);
        });
    })


    apiRoutes.post('/updateShipmentTransporter', (req, res) => {
        var shipment = req.body.data;

        let where = {
            shipment_number: shipment.shipment_number
        }
        Shipment.update(shipment, {
            where: where
        }).then((resp) => {
            res.json({ deta: resp, status: 'success' });
        }, error => {
            res.json(error);
        });
    })

    apiRoutes.post('/getTransporter', (req, res) => {
        var transporter_code = req.body.transporter_code;
        Transporter.findOne({ where: { transporter_code: transporter_code } })
            .then((transporter) => {
                var trans = transporter.dataValues;
                res.send(trans);
            })
    })



    apiRoutes.post('/getTimelineData', (req, res) => {

        const filterTransportercode = req.body.code;
        const filterplantcode = req.body.plantcode;
        var query = 'SELECT DATE_FORMAT(shipment_creation_date, "%m/%d/%Y") AS Dates, count(*) as count FROM shipments WHERE cancellation_indicator="Constant" AND plant="' + filterplantcode + '" AND transporter_code="' + filterTransportercode + '" AND shipment_creation_date BETWEEN NOW() - INTERVAL 30 DAY AND NOW() Group by Dates ORDER BY Dates ASC';

        db.sequelize
            .query(query, { type: Sequelize.QueryTypes.SELECT })
            .then(data => {
                res.json(data);
            })

    })

    apiRoutes.post('/getAllTimeShipments', (req, res) => {

        const filterTransportercode = req.body.code;
        const filterplantcode = req.body.plantcode;
        
        var query = 'SELECT count(*) as count FROM shipments WHERE cancellation_indicator="Constant" AND plant="' + filterplantcode + '" AND transporter_code="'+filterTransportercode+'"';
        
        db.sequelize
            .query(query, { type: Sequelize.QueryTypes.SELECT })
            .then(data => {
                res.send(data);
            })

    })

    apiRoutes.post('/getAllTimeShipmentQuantity', (req, res) => {

        const filterTransportercode = req.body.code;
        const filterplantcode = req.body.plantcode;
        var query = 'SELECT SUM(shipment_quantity) AS quantity FROM shipments WHERE cancellation_indicator="Constant" AND plant="' + filterplantcode + '" AND transporter_code="'+filterTransportercode+'"';
        
        db.sequelize
            .query(query, { type: Sequelize.QueryTypes.SELECT })
            .then(data => {
                res.send(data);
            })

    })


    // ----------------------------------SOAP DEMO XML-----------------------------------------------

    apiRoutes.get('/getXMLdata', (req, res) => {

        //    request('http://a.cdn.searchspring.net/help/feeds/searchspring.xml', function (error, response, body) {
        // console.log('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.
        //  });

        request.post('http://157.230.91.154/apigw/oauth/token?grant_type=refresh_token&refresh_token=tGzv3JOkF0XG5Qx2TlKWIA&client_id:77ac27e2b6b47e6a099518b4432ce4ef1c6a96a6&client_secret:55fe971628fade565bca6af872214d29e65ff89a',
            function(response) {
                // console.log(response.statusCode) // 200
                // console.log(response.headers['content-type']) // 'image/png'

                // console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response); // Print the response if a response was received
                // console.log('body:', body); // Print the HTML for the Google homepage.
            })


        // Key : - 77ac27e2b6b47e6a099518b4432ce4ef1c6a96a6

        // Secret : - 55fe971628fade565bca6af872214d29e65ff89a

    })

    //   fs.readFile('jsonData.json', (err, data) => {
    //   if (err) throw err;
    //   else {
    //   // console.log("jsonData===>  ",JSON.parse(data));
    //   var jsn = JSON.parse(data);

    //   // var options = {compact: true, ignoreComment: true, spaces: 4,ignoreDeclaration:false};
    //   // var result = convert.json2xml(jsn, options);

    //   var options = {spaces: 4};
    //   var builder = new xml2js.Builder();
    //   var result = builder.buildObject(jsn,options);
    //   // console.log("result11   ",result);

    //   // let data = JSON.stringify(student, null, 2);

    // // fs.writeFile('xmlData.xml', result, (err) => {  
    // //     if (err) throw err;

    // //     else{
    // //     console.log('Data written to file');
    // //     }
    // // });


    //   } 
    //   });

    function format_Date(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        var fullDate = [year, month, day].join('-') + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
        return fullDate;
    }

    app.get('/getwsdl', (req, res) => {
        var url = 'http://oclpod.birlaa1.com:50000/dir/wsdl?p=ic/c276eab39b363de191c51bed774dfeed';


        console.log('url ', url)


        request(url, function(error, response, body) {
            res.send(body);
        })
    })

    app.post('/accountPosting', (req, res) => {
        var sapResp = [];

        var url = 'http://oclpod.birlaa1.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=EPOD_IntelPlanner_SOAP&receiverParty=&receiverService=&interface=AccountPostingSI_Intel_Out&interfaceNamespace=urn:Inteliplanner_Orient_AccountPosting.com';

        var args = req.body.params;
        var ponum = req.body.poNum;
        var left_submit = req.body.left_submit;
        var tinvoiceNum = req.body.tinvoiceobj;
        var transporter_code = tinvoiceNum.transporter_code
        //  console.log('args ', args)
        //  console.log('ponum ', ponum)

        // soap.createClientAsync(url).then((client) => {
        // return client.AccountPostingSI_Intel_OutAsync(args);
        // }).then((result) => {
        // console.log(result);
        // }, err => {
        // console.log(err);
        // });

        let tInvoices = {}

        tInvoices.purchase_order_number = ponum;
        tInvoices.plant = tinvoiceNum.plant;
        tInvoices.transporter_invoice_number = tinvoiceNum.tNum;
        tInvoices.invoice_submit_date = format_Date(new Date());
        tInvoices.transporter_code = transporter_code;
        tInvoices.transporter_ID = tinvoiceNum.transporterid;




        async.each(args, function(invodata, callback) {

            fs.readFile(path.join(__dirname, 'xml.txt'), "utf8", function(err, data) {
                data = data.replace('[Shipment_Number]', invodata.shipment_number)
                data = data.replace('[Plant]', invodata.plant)
                data = data.replace('[PO_Number]', ponum)
                data = data.replace('[PO_Date]', invodata.purchase_order_date)
                data = data.replace('[ShipmentCost_Number]', invodata.shipment_cost_number)

                var headers = {
                    'content-type': 'application/xml',
                    'authorization': 'Basic ZXBvZDpPcmllbnRAMTIz'
                };

                Invoice.update({ invoice_submit_status: 0, transporter_invoice_number: tinvoiceNum.tNum }, { where: { invoice_number: invodata.invoice_number } }).then((resp) => {

                    console.log('left_submit ', left_submit)

                    PurchaseOrder.update({ left_submit: left_submit }, { where: { purchase_order_number: ponum } }).then((rest) => {
                        callback();
                    })
                })

                request.post({
                    headers: headers,
                    url: url,
                    body: data
                }, function(error, response, body) {
                    console.log('body ', body)
                    console.log('error ', error)
                    console.log('response ', response.statusCode)
                    var d = body.split('<Status>')[1];
                    var stat = d.split('<')[0]

                    //  invoUpdate(invodata, stat, limitLeft, ponum, res);

                    console.log('InvoiceInvoiceInvoiceInvoiceInvoiceInvoiceInvoiceInvoiceInvoiceInvoice ')

                    Invoice.update({ invoice_submit_status: stat }, { where: { invoice_number: invodata.invoice_number } }).then((resp) => {})


                });


            });

        }, function(err) {
            // if any of the file processing produced an error, err would equal that error
            if (err) {
                // One of the iterations produced an error.
                // All processing will now stop.
                console.log('A file failed to process');
            } else {
                generateReports(args, ponum, tinvoiceNum, transporter_code, tInvoices, res);
                res.send({ status: true });
                console.log('All files have been processed successfully');
            }
        })

    });

    function generateReports(args, ponum, tinvoiceNum, transporter_code, tInvoices, res) {


        var total = 0;
        args.forEach(function(invodata) {
            total += invodata.invoice_quantity * invodata.rate
        })

        console.log('----------------------------------- generateReports --------------------------------- ')
        Transporter.findOne({ where: { transporter_code: transporter_code } })
            .then((transporter) => {
                var trans = transporter.dataValues;
                //console.log('transporter ', trans)

                fs.readFile(path.join(__dirname, 'tinvoice.txt'), "utf8", function(err, data) {
                    if (err)
                        return console.log(err);
                    var tax = (12 / 100) * total;
                    var taxtotal = (tax + total).toFixed(2);
                    //console.log('taxtotal ', taxtotal)

                    data = data.replace('[NAME]', trans.name)
                    data = data.replace('[NAME]', trans.name)
                    data = data.replace('[ADDRESS]', trans.street + ' ' + trans.street_1 + ' ' + trans.street_2 + ' ' + trans.city + ' ' + trans.district + ' - ' + trans.postal_code)
                    data = data.replace('[PAN]', trans.pan_number)
                    data = data.replace('[GST]', trans.gst_number)
                    data = data.replace('[INVOICENUMBER]', tinvoiceNum.tNum)
                    data = data.replace('[INVOICENUMBER]', tinvoiceNum.tNum)
                    data = data.replace('[WORDS]', toWords(parseFloat(taxtotal), { currency: true }))
                    data = data.replace('[PONUMBER]', ponum)
                    data = data.replace('[TOTAL]', total)
                    data = data.replace('[TOTAL]', total)
                    data = data.replace('[TAX]', tax)
                    data = data.replace('[TAXTOTAL]', taxtotal)
                    data = data.replace('[INVOICEDATE]', format_Date(new Date()))
                    //console.log('data ', data)

                    data += "<p class='breakLine'>"


                    fs.readFile(path.join(__dirname, 'taxinvoice.txt'), "utf8", function(err, invdata) {
                        var q = 'SELECT' +
                            ' invoices.id, invoices.invoice_number, invoices.lr_number, invoices.transporter_invoice_number, invoices.plant,invoices.invoice_submit_status, invoices.shiptoparty_name, invoices.signed_lr_image, invoices.invoice_date, invoices.invoice_time, invoices.destination_name, invoices.destination_location, invoices.customer_reply_status, invoices.customer_accepted,invoices.do_number, invoices.invoice_quantity, invoices.intermediate_location, invoices.driver_consent_status, invoices.plant_driver_sms_rcvd_time, invoices.dest_driver_loc_time, invoices.dest_driver_reach_time, invoices.shipment_number, shipments.shipment_number, shipments.vehicle_no, shipments.sto, shipments.driver_using_smartphone_or_sim_plant ,purchaseorders.purchase_order_number, purchaseorders.purchase_order_date, purchaseorders.left_submit, purchaseorders.shipment_cost_number, purchaseorders.shipment_cost, purchaseorders.rate, purchaseorders.quantity ' +
                            ' FROM `invoices` LEFT JOIN `shipments` ON shipments.shipment_number = invoices.shipment_number LEFT JOIN `purchaseorders` ON invoices.shipment_number = purchaseorders.shipment_number ' +
                            ' WHERE shipments.transporter_code="' + transporter_code + '" AND invoices.cancellation_indicator="Constant" AND shipments.cancellation_indicator="Constant"  and purchaseorders.purchase_order_number is not null AND invoices.transporter_invoice_number = "' + tinvoiceNum.tNum + '"'


                        db.sequelize
                            .query(q, { type: Sequelize.QueryTypes.SELECT })
                            .then(invoices => {

                                console.log("invoicesinvoicesinvoicesinvoicesinvoicesinvoicesinvoicesinvoicesinvoicesinvoices ", invoices);

                                var invHTML = '';
                                for (var i = 0; i < invoices.length; i++) {
                                    var inv = invoices[i];

                                    var text = "<tr><td>" + (i + 1) + "</td><td>" + inv.purchase_order_date + "</td><td>" + inv.shipment_number + "</td><td>" + inv.vehicle_no + "</td><td></td><td>" + inv.purchase_order_number + "</td><td>" + inv.destination_name + "</td><td>" + inv.quantity + "</td><td>" + inv.rate + "</td><td>" + (inv.rate * inv.quantity) + "</td><td>" + inv.lr_number + "</td></tr>"
                                    invHTML += text;

                                }
                                console.log("invHTML ", invHTML);
                                invdata = invdata.replace('[DATA]', invHTML)

                                data += invdata


                                tInvoices.invoice_html = data;

                                //   console.log("data ", data);



                                TransporterInvoices.create(tInvoices).then((resp) => {})

                            })

                    })
                });

            })

    }

    function postToSOAP(data, url, headers, tinvoiceNum, invodata, left_submit, ponum) {

        console.log('postToSOAP------------------------ ')

        request.post({
            headers: headers,
            url: url,
            body: data
        }, function(error, response, body) {
            console.log('body ', body)
            console.log('error ', error)
            console.log('response ', response.statusCode)
            var d = body.split('<Status>')[1];
            var stat = d.split('<')[0]

            //  invoUpdate(invodata, stat, limitLeft, ponum, res);

            console.log('InvoiceInvoiceInvoiceInvoiceInvoiceInvoiceInvoiceInvoiceInvoiceInvoice ')

            Invoice.update({ invoice_submit_status: stat, transporter_invoice_number: tinvoiceNum.tNum }, { where: { invoice_number: invodata.invoice_number } }).then((resp) => {

                console.log('left_submit ', left_submit)

                PurchaseOrder.update({ left_submit: left_submit }, { where: { purchase_order_number: ponum } }).then((rest) => {})
            })


        });
    }



    app.post('/updatestatus', (req, res) => {
        var sapResp = [];

        var url = 'http://oclpod.birlaa1.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=EPOD_IntelPlanner_SOAP&receiverParty=&receiverService=&interface=AccountPostingSI_Intel_Out&interfaceNamespace=urn:Inteliplanner_Orient_AccountPosting.com';

        var invoice = req.body.invoice;
        var ponum = req.body.poNum;
        console.log('ponum ', ponum)


        fs.readFile(path.join(__dirname, 'xml.txt'), "utf8", function(err, data) {
            data = data.replace('[Shipment_Number]', invoice.shipment_number)
            data = data.replace('[Plant]', invoice.plant)
            data = data.replace('[PO_Number]', ponum)
            data = data.replace('[PO_Date]', invoice.purchase_order_date)
            data = data.replace('[ShipmentCost_Number]', invoice.shipment_cost_number)

            console.log('data ', data)


            var headers = {
                'content-type': 'application/xml',
                'authorization': 'Basic ZXBvZDpPcmllbnRAMTIz'
            };

            request.post({
                headers: headers,
                url: url,
                body: data
            }, function(error, response, body) {
                console.log('body ', body)
                console.log('error ', error)
                console.log('response ', response.statusCode)
                var d = body.split('<Status>')[1];
                var stat = d.split('<')[0]


                Invoice.update({ invoice_submit_status: stat }, { where: { invoice_number: invoice.invoice_number } }).then((resp) => {
                    res.send({ status: stat });
                })


            });

        });

    });


    apiRoutes.post('/getTransporterInvoice', (req, res) => {
        var transporter_invoice_number = req.body.transporter_invoice_number;

        // let where = {
        //     shipment_number: shipment.shipment_number
        // }
        TransporterInvoices.findOne({ where: { transporter_invoice_number: transporter_invoice_number } }).then((resp) => {
            res.json({ data: resp, status: 'success' });
        }, error => {
            res.json(error);
        });
    })


    apiRoutes.post('/submitTransporterInvoices', (req, res) => {
        var tInvoices = req.body.data;

        // let where = {
        //     shipment_number: shipment.shipment_number
        // }
        TransporterInvoices.create(tInvoices).then((resp) => {
            res.json({ deta: resp, status: 'success' });
        }, error => {
            res.json(error);
        });
    })





    app.use('/', apiRoutes);
};
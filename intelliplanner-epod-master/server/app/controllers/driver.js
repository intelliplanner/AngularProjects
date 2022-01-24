const express = require('express');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const db = require('../../config/db.config.js');
const nodemailer = require('nodemailer');
const request = require('request');
const smtpTransport = require('nodemailer-smtp-transport');
const Driver = db.driver;
const Vehicle = db.vehicle;
const Invoice = db.invoice;
const InvoiceLog = db.invoicelog;
const Shipment = db.shipment;
const ShipmentLog = db.shipmentlog;
const apikey = "6EN+h3/Zfv0-3SdIkoEYQscHIDffiVzjDEsXdw3SzN"
var smsURL = "http://bhashsms.com/api/sendmsg.php?user=elvento labs&pass=123456&sender=ATULSR&phone=[number]&text=[smsText]&priority=ndnd&stype=normal";
const fs = require('fs');
const serverIp = "http://157.230.91.154:5000/"
// const serverIp = "http://localhost:5000/"

var mailer = nodemailer.createTransport(smtpTransport({
    host: 'smtp.ipssi.com',
    port: 587,
    auth: {
        user: 'notification@ipssi.com',
        pass: 'Nri@e4rW&dog1'
    },
    tls: {
        rejectUnauthorized: false
    },
}));

module.exports = function(app) {

    const apiRoutes = express.Router();

    apiRoutes.post('/addDriver', function(req, res) {
        const driverObj = req.body.driverObj;
        Driver.create(driverObj).then(() => {


            var text = "Hello " + driverObj.name + ", download the mobile app from this link : https://play.google.com/store/apps/details?id=com.orient.odl";
            var reqURLSMS = smsURL.replace('[number]', driverObj.phone).replace('[smsText]', text)


            request(reqURLSMS, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    res.json({ message: 'successfully added driver', status: true, response: response });
                }
            })


        }, error => {
            res.json(error);
        });
    });

    apiRoutes.post('/updateDriver', function(req, res) {
        const driverObj = req.body.driverObj;
        Driver.update(driverObj, { where: { id: driverObj.id } }).then(() => {
            res.json({ message: 'successfully updated driver', status: true, response: response });
        }, error => {
            res.json(error);
        });
    });


    apiRoutes.post('/sendDriverOTP', function(req, res) {
        const phone = req.body.phone;
        var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
        var text = seq + " is your OTP for App";
        var reqURLSMS = smsURL.replace('[number]', "+91" + phone).replace('[smsText]', text)

        var requested_url = 'https://api.textlocal.in/send/?' + "apikey=" + apikey + "&numbers=" + phone + "&message=" + encodeURI(text) // + "&sender=ELVENT"

        request(requested_url, function(error, response, body) {
            //   if (!error && response.statusCode == 200) {
            res.json({ otp: seq, status: true, response: response });
            //   }
        })

    });

    apiRoutes.post('/updateDriverRecord', function(req, res) {
        const driver = req.body.driverObj;
        let where = {
            phone: driver.phone
        }

        Driver.update(driver, { where: where }).then((resp) => {
            res.json(resp);
        }, error => {
            res.json(error);
        });

    });

    apiRoutes.post('/getAllDriver', function(req, res) {
        const transporterCode = req.body.code;
        const plantcode = req.body.plant;
        var where = {
            transporter_code: transporterCode,
            plant: plantcode
        }
        console.log("rtrtr", req.body)
        Shipment.findAll({ where: where }).then(drivers => {
            res.json(drivers);
        }, error => {
            res.json(error);
        });
        // Driver.findAll({ where: { transporter_code: transporterCode } }).then(drivers => {
        //     res.json(drivers);
        // }, error => {
        //     res.json(error);
        // });
    });

    apiRoutes.post('/checkDriverRecord', function(req, res) {
        const phone = req.body.phone;

        Driver.count({
            where: { phone: phone }
        }).then(resp => {
            res.json({ count: resp });
        }, error => {
            res.json(error);
        });

    });

    app.post('/searchDriver', (req, res) => {
        const searchTerm = req.body.searchTerm;
        var code = searchTerm.code;
        var plant = searchTerm.plantcode;
        const searchValue = searchTerm.value;

        let where = {
            [Op.and]: [{
                transporter_code: code,
                plant: plant
            }, {
                [Op.or]: [{
                    driver_name: {
                        [Op.like]: '%' + searchValue + '%'
                    }
                }, {
                    driver_phoneno: {
                        [Op.like]: '%' + searchValue + '%'
                    }
                },
                 {
                    vehicle_no: {
                        [Op.like]: '%' + searchValue + '%'
                    }
                }]
            }]
        }

        Shipment.findAll({ where: where }).then((resp) => {
            res.json(resp);
        }, error => {
            res.json(error);
        });
    })

    app.post('/assignDriver', (req, res) => {
        const driver = req.body.driver;
        const shipmentID = req.body.shipmentID;

        let where = {
            id: shipmentID
        }
        let q = {
            driver_name_plant: driver.name,
            driver_phoneno_plant: driver.phone,
            driver_using_smartphone_sim_plant: driver.tracking_type
        }


        Shipment.update(q, { where: where }).then((resp) => {

            Driver.update({ active: 1 }, { where: { phone: driver.phone } }).then(() => {
                res.json(resp);
            })

        }, error => {
            res.json(error);
        });
    })

    app.post('/searchvehicle', (req, res) => {
        const searchTerm = req.body.searchTerm;
        console.log("pageStatus  ", req.body.searchTerm);
        let where = {
            name: {
                [Op.like]: '%' + searchTerm + '%'
            }
        }

        Vehicle.findAll({ where: where }).then((resp) => {
            res.json(resp);
        }, error => {
            res.json(error);
        });
    })


    apiRoutes.post('/searchDriverShipments', (req, res) => {
        var driverDetail = req.body;
        console.log("driverDetail  ", driverDetail);
        if (driverDetail && driverDetail.vehicleNo && driverDetail.transporterCode) {
            const selectNumber = driverDetail.vehicleNo;
            const selectTransportercode = driverDetail.transporterCode;

            db.sequelize
                .query('SELECT' +
                    ' invoices.id, invoices.invoice_number, invoices.lr_number, invoices.shiptoparty_name, invoices.shiptoparty_address, invoices.shiptoparty_address1, invoices.shiptoparty_address2, invoices.customer_emailid, invoices.soldtoparty_name, ' +
                    ' invoices.signed_lr_image, invoices.invoice_date, invoices.invoice_time, invoices.destination_name, ' +
                    ' invoices.destination_location,invoices.customer_reply_status,invoices.customer_accepted, ' +
                    ' invoices.shiptoparty_mobileno,invoices.soldtoparty_mobileno, shipments.plant_location, shipments.sto, ' +
                    ' invoices.do_number, shipments.vehicle_no, shipments.driver_name, shipments.driver_phoneno, shipments.driver_using_smartphone_or_sim_plant, ' +
                    ' invoices.invoice_quantity, invoices.shipment_number,shipments.shipment_quantity,shipments.ship_to_party1,shipments.ship_to_party2,shipments.ship_to_party3, ' +
                    ' shipments.ship_to_party4,shipments.ship_to_party5,shipments.destination_name1,shipments.destination_name2,shipments.destination_name3,shipments.destination_name4, ' +
                    ' shipments.destination_name5,shipments.transporter_code, shipments.shipment_creation_date,shipments.shipment_creation_time' +
                    ' FROM `shipments` JOIN `invoices` ON shipments.shipment_number = invoices.shipment_number where (invoices.destination_location is null or invoices.signed_lr_image is null) and shipments.vehicle_no= "' + selectNumber + '" AND invoices.cancellation_indicator="Constant" and shipments.transporter_code= "' + selectTransportercode + '" ', { type: Sequelize.QueryTypes.SELECT })
                .then(data => {
                    res.json({ shipment: data[0], invoices: data, status: 1 });
                })
        } else {
            res.json({ status: 0, message: "Restart app again..!!", shipment: {}, invoices: [] });
        }




        // ---------------------------------------------------------------------------------------------        
        // const selectNumber = req.body.selectNumber;    invoices.signed_lr_image = null
        // console.log("selectNumber  ", selectNumber);
        // let where = {
        //     driver_phoneno: selectNumber,
        //     driver_using_smartphone_or_sim_plant: 'EPOD'
        // }

        // Shipment.findOne({ where: where }).then((shipment) => {
        //     console.log("shipment  ", shipment);

        //     if (shipment) {
        //         where = {
        //             shipment_number: shipment.shipment_number,
        //             [Op.and]: [{
        //                 signed_lr_image: null
        //             }, {
        //                 customer_reply_status: null
        //             }]

        //         }
        //         Invoice.findAll({ where: where }).then((invoices) => {
        //             res.json({ shipment: shipment, invoices: invoices });
        //         })
        //     } else {
        //         res.json({ shipment: {}, invoices: [] });
        //     }


        // }, error => {
        //     res.json(error);
        // });
    })


    app.post('/updateShipment', (req, res) => {
        const data = req.body.data;
        let where = {
            shipment_number: data.shipment_number,
        }

        Shipment.update(data, { where: where }).then((resp) => {
            res.json(resp);
        }, error => {
            res.json(error);
        });
    })

    app.post('/updateInvoice', (req, res) => {  
        const data = req.body.data;

        let where = {
            invoice_number: req.body.invoice_number,
        }
        console.log("data ", data)

        Invoice.update(data, { where: where }).then((resp) => {
            res.json(resp);
        }, error => {
            res.json(error);
        });
    })


    app.post('/updatelocationDestination', (req, res) => {
        const data = req.body.data;
        var invoice = req.body.fullinvoice;
        var customerNumber;
        if (invoice.soldtoparty_mobileno)
            customerNumber = invoice.soldtoparty_mobileno;
        else
            customerNumber = invoice.shiptoparty_mobileno;

        let where = {
            invoice_number: invoice.invoice_number
        }
        console.log("data ", data)

        Invoice.update(data, { where: where }).then((resp) => {

            var textsms = "Invoice No " + invoice.invoice_number + " delivered. Click the following link to accept: " + serverIp + "customer/%23/invoice/" + customerNumber;

            var textmail = "Invoice No " + invoice.invoice_number + " delivered. Click the following link to accept: " + serverIp + "customer/#/invoice/" + customerNumber;

            var requested_url = 'https://api.textlocal.in/send/?' + "apikey=" + apikey + "&numbers=" + customerNumber + "&message=" + encodeURI(textsms)


            var mailOptions = {
                from: 'Orient Cement <notification@ipssi.com>', // sender address
                to: invoice.customer_emailid, // list of receivers
                subject: '[ORDER UPDATE] ' + invoice.invoice_number, // Subject line
                // text: req.body.body, // plaintext body
                html: 'Hello,<br><br>' + textmail + '<br><br>Thank you,<br><br>Orient Cement' // html body
            };

            mailer.sendMail(mailOptions, function(error, info) {});

            request(requested_url, function(error, response, body) {
                console.log("data333 ", JSON.parse(body))
                res.json(JSON.parse(body));
            })
        }, error => {
            res.json(error);
        });
    })


    apiRoutes.post('/customerAvaliableStatus', (req, res) => {
        const invoiceNo = req.body.selectNumber;
        console.log("invoiceNo  ", invoiceNo);
        var updt = { customer_reply_status: 'notAvaliable' }
        var where = {
            invoice_number: invoiceNo
        }

        Invoice.update(updt, { where: where }).then((resp) => {
            // console.log("resp******  ",resp);
            res.json(resp);
        }, error => {
            res.json(error);
        });
    })

    app.post('/updateAllInvoice', (req, res) => {
        const data = req.body.data;
        const shipment_number = req.body.shipment_number;

        let where = {
            shipment_number: shipment_number,
        }

        Shipment.update(data, { where: where }).then((resp) => {
            Invoice.update(data, { where: where }).then((resp) => {
                res.json(resp);
            }, error => {
                res.json(error);
            });
        }, error => {
            res.json(error);
        });

    })

    app.post('/updateAppStatus', (req, res) => {
        const data = req.body.data;
        const shipment_number = req.body.shipment_number;

        let where = {
            shipment_number: shipment_number,
        }

        Shipment.update(data, { where: where }).then((resp) => {
            Invoice.update(data, { where: where }).then((resp) => {
                res.json(resp);
            }, error => {
                res.json(error);
            });
        }, error => {
            res.json(error);
        });

    })

    // ------------------------------------Change driver processing starts------------------------------

    apiRoutes.post('/addNewShipmentDriver', function(req, res) {
        const newdriverObj = req.body.newdriverObj;

        // if(Object.keys(newdriverObj).length == 11){
        console.log("rtrtr", newdriverObj)
        if (newdriverObj.driver_using_smartphone_or_sim_plant == "SIM") {

            async function driverdata(newdriverObj) {
                var getToken = await get_accessToken()
                // console.log("getToken ",getToken);
                // try {
                var getConsent = await get_userConsent(newdriverObj, getToken)
                // } 
                // catch (error){
                //     console.log("error ", error);
                // }
                if (getConsent && getConsent.errorCode) {
                    var formatDate = await format_Date(new Date())
                    newdriverObj.new_driverloc_timing = formatDate;
                    newdriverObj.new_driver_status = 1;
                    newdriverObj.driver_consent_status = getConsent.errorDescription;
                    var getoneshipmentUpdate = await changedriver_shipmentUpdate(newdriverObj)
                    console.log("sumfulfulinvo ", getConsent);
                    return { status: false, message: 'Consent not given from driver..!! Error in service provider', response: 'Partially Success' }
                } else if (getConsent && getConsent.requestError) {
                    var formatDate = await format_Date(new Date())
                    newdriverObj.new_driverloc_timing = formatDate;
                    newdriverObj.new_driver_status = 1;
                    newdriverObj.driver_consent_status = getConsent.requestError.serviceException.text;
                    var getoneshipmentUpdate = await changedriver_shipmentUpdate(newdriverObj)
                    return { status: false, message: 'Consent not given from driver..!! Error in service provider', response: 'Partially Success' }
                } else if (getConsent && getConsent.Consent.status == 'ALLOWED') {
                    var getLocation = await get_userLocation(newdriverObj, getToken)
                    if (getLocation && getLocation.requestError) {
                        console.log("getLocation====---", getLocation)
                        var formatDate = await format_Date(new Date())
                        newdriverObj.new_driverloc_timing = formatDate;
                        newdriverObj.new_driver_status = 1;
                        newdriverObj.driver_consent_status = getConsent.Consent.status + " " + getLocation.requestError.serviceException.text;
                        var getoneshipmentUpdate = await changedriver_shipmentUpdate(newdriverObj)
                        return { status: false, message: 'Message send to driver..!! Visitor Location Register Error through service Provider', response: 'Partially Success' }
                    } else {
                        console.log("getLocation++++", getLocation)
                        var latitude = getLocation.terminalLocationList.terminalLocation[0].currentLocation.latitude;
                        var longitude = getLocation.terminalLocationList.terminalLocation[0].currentLocation.longitude;
                        if (newdriverObj.plant_location == null || newdriverObj.plant_location == '') {
                            newdriverObj.plant_location = latitude + ',' + longitude;
                            newdriverObj.middle_location = latitude + ',' + longitude;
                            newdriverObj.second_driver_start_location = latitude + ',' + longitude;
                            var formatDate = await format_Date(new Date())
                            newdriverObj.new_driverloc_timing = formatDate;
                            newdriverObj.new_driver_status = 1;
                            newdriverObj.driver_consent_status = 'ALLOWED';
                            var getoneshipmentUpdate = await changedriver_shipmentUpdate(newdriverObj)
                            // console.log("getoneshipmentUpdate ",getoneshipmentUpdate);
                            return { status: true, message: 'Driver Changed and Location Accquired', response: 'Success' }
                        } else if (newdriverObj.plant_location != null || newdriverObj.plant_location != '') {
                            newdriverObj.second_driver_start_location = latitude + ',' + longitude;
                            var formatDate = await format_Date(new Date())
                            newdriverObj.new_driverloc_timing = formatDate;
                            newdriverObj.new_driver_status = 1;
                            newdriverObj.driver_consent_status = 'ALLOWED';
                            var getoneshipmentUpdate = await changedriver_shipmentUpdate(newdriverObj)
                            // console.log("getoneshipmentUpdate ",getoneshipmentUpdate);
                            return { status: true, message: 'Driver Changed and Location Accquired', response: 'Success' }
                        }
                    }

                } else if (getConsent && (getConsent.Consent.status == 'PENDING' || getConsent.Consent.status == 'DENIED')) {
                    var formatDate = await format_Date(new Date())
                    newdriverObj.new_driverloc_timing = formatDate;
                    newdriverObj.new_driver_status = 1;
                    newdriverObj.driver_consent_status = getConsent.Consent.status;
                    var getoneshipmentUpdate = await changedriver_shipmentUpdate(newdriverObj)
                    return { status: false, message: 'Message send to driver..!! Wait for sometime, driver reply to give consent', response: 'Partially Success' }
                }

            }

            driverdata(newdriverObj).then((data) => {
                console.log("dtata===  ", data);
                // res.send(data);
                res.status(200).send(data);
            })




        } else if (newdriverObj.driver_using_smartphone_or_sim_plant == "EPOD") {

            var text = "Hello " + newdriverObj.driver_name + ", download the mobile app from this link : https://play.google.com/store/apps/details?id=com.orient.odl";
            var reqURLSMS = smsURL.replace('[number]', newdriverObj.driver_phoneno).replace('[smsText]', text)


            request(reqURLSMS, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    Shipment.update(newdriverObj, { where: { shipment_number: newdriverObj.shipment_number } }).then(() => {
                        // ShipmentLog.update(newdriverObj, { where: { shipment_number: newdriverObj.shipment_number } }).then((shipresp) => {
                        res.json({ message: 'successfully added driver', status: true, response: response });
                        // })
                    })

                }
            })
        }

        // }
        // else{

        //     res.json({ message: 'Unsuccessful Request..!! Try Again', status: false });
        // }
    });


    function changedriver_shipmentUpdate(args) {
        return new Promise((resolve) => {
            Shipment.update(args, { where: { shipment_number: args.shipment_number } }).then((shipresp) => {
                // ShipmentLog.update(args, { where: { shipment_number: args.shipment_number } }).then((shipresp) => {
                resolve(shipresp)
                // })
            })
        })
    }

    // ------------------------------------Change driver processing ends------------------------------

    // ----------------------------------Manual Sim Tracking API starts-----------------------------------------------

    apiRoutes.post('/getConsent', (req, res) => {
        var shipment = req.body.shipment; /*here shipment is just variabledata == invoice*/
        var location = {};
        var consentObj = {};
        console.log("invoice ", shipment);
        if (shipment.driver_using_smartphone_or_sim_plant == 'SIM') {

            async function shipdata(shipment) {
                var getToken = await get_accessToken()
                // console.log("getToken ",getToken);
                var getConsent = await get_userConsent(shipment, getToken)

                if (getConsent && getConsent.errorCode) {
                    consentObj.driver_consent_status = getConsent.errorDescription;
                    var consentoneshipmentUpdate = await consent_oneshipmentUpdate(shipment, consentObj)
                    location.driver_consent_status = getConsent.errorDescription;
                    var getoneshipmentUpdate = await get_oneshipmentUpdate(shipment, location)
                    console.log("sumfulfulinvo ", getConsent);
                    return { status: false, message: 'Consent not given from driver..!! Error in service provider', response: 'Partially Success' }
                } else if (getConsent && getConsent.requestError) {
                    consentObj.driver_consent_status = getConsent.requestError.serviceException.text;
                    var consentoneshipmentUpdate = await consent_oneshipmentUpdate(shipment, consentObj)
                    location.driver_consent_status = getConsent.requestError.serviceException.text;
                    var getoneshipmentUpdate = await get_oneshipmentUpdate(shipment, location)
                    return { status: false, message: 'Consent not given from driver..!! Error in service provider', response: 'Partially Success' }
                } else if (getConsent && getConsent.Consent.status == 'ALLOWED') {
                    var getLocation = await get_userLocation(shipment, getToken)
                    if (getLocation && getLocation.requestError) {
                        console.log("getLocation====---", getLocation)
                        location.driver_consent_status = getConsent.Consent.status + " " + getLocation.requestError.serviceException.text;
                        var getoneshipmentUpdate = await get_oneshipmentUpdate(shipment, location)
                        consentObj.driver_consent_status = getConsent.Consent.status + " " + getLocation.requestError.serviceException.text;
                        var consentoneshipmentUpdate = await consent_oneshipmentUpdate(shipment, consentObj)
                        return { status: false, message: 'Message send to driver..!! Visitor Location Register Error through service Provider', response: 'Partially Success' }
                    } else {

                        var latitude = getLocation.terminalLocationList.terminalLocation[0].currentLocation.latitude;
                        var longitude = getLocation.terminalLocationList.terminalLocation[0].currentLocation.longitude;
                        location.destination_location = latitude + ',' + longitude;
                        location.intermediate_location = latitude + ',' + longitude;
                        location.driver_consent_status = 'ALLOWED';
                        var formatDate = await format_Date(new Date())
                        location.dest_driver_loc_time = formatDate;
                        var getoneshipmentUpdate = await get_oneshipmentUpdate(shipment, location)

                        consentObj.driver_consent_status = "ALLOWED";
                        var consentoneshipmentUpdate = await consent_oneshipmentUpdate(shipment, consentObj)
                        // console.log("getoneshipmentUpdate ",getoneshipmentUpdate);
                        return { status: true, message: 'Driver Location Accquired' }

                    }


                } else if (getConsent && (getConsent.Consent.status == 'PENDING' || getConsent.Consent.status == 'DENIED')) {
                    var formatDate = await format_Date(new Date())
                    location.dest_driver_loc_time = formatDate;
                    location.driver_consent_status = getConsent.Consent.status;
                    var getoneshipmentUpdate = await get_oneshipmentUpdate(shipment, location)

                    consentObj.driver_consent_status = getConsent.Consent.status;
                    var consentoneshipmentUpdate = await consent_oneshipmentUpdate(shipment, consentObj)
                    return { status: false, message: 'Message send to driver..!! Wait for sometime, driver reply to give consent' }
                }



            }

            shipdata(shipment).then((data) => {
                console.log("dtata===  ", data);
                // res.send(data);
                res.status(200).send(data);
            })

        }



    })


    function get_accessToken() {
        return new Promise((resolve) => {

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
                // console.log('body:', bodyValues);
                resolve(bodyValues)
            });
        })
    }

    function get_userConsent(args, getToken) {
        return new Promise((resolve) => {

            var url = 'https://india-agw.telenity.com/apigw/testconsent/v2/location?address=tel:+91' + args.driver_phoneno;

            var headers = {
                'Host': 'india-agw.telenity.com',
                'Cache-Control': 'no-cache',
                'Authorization': 'Bearer' + ' ' + getToken.access_token,
                'User-Agent': 'application/json'
            };


            request.get({ headers: headers, url: url, method: 'GET' }, function(e, r, body) {

                var bodyValues = JSON.parse(body);
                // console.log('bodyee++:', e);
                resolve(bodyValues)
            });
        })
    }

    function get_userLocation(args, getToken) {
        return new Promise((resolve) => {

            var url = 'https://india-agw.telenity.com/apigw/testterminallocationservice/v2/location?address=tel+91' + args.driver_phoneno + '&requestedAccuracy=100';

            var headers = {
                'Host': 'india-agw.telenity.com',
                'Connection': 'keep-alive',
                'Cache-Control': 'no-cache',
                'Accept': 'application/json',
                'Authorization': 'Bearer' + ' ' + getToken.access_token
            };

            request.get({ headers: headers, url: url, method: 'GET' }, function(e, r, body) {

                var bodyValues = JSON.parse(body);
                // console.log('body:', bodyValues);
                resolve(bodyValues)
            });
        })
    }

    function get_oneshipmentUpdate(args, location) {
        return new Promise((resolve) => {

            Invoice.update(location, { where: { invoice_number: args.invoice_number } }).then((shipresp) => {
                // InvoiceLog.update(location, { where: { invoice_number: args.invoice_number } }).then((shipresp) => {
                resolve(shipresp)
                // })
            })


            // Shipment.update(location, { where: { shipment_number: args.shipment_number } }).then(() => {
            //     // ShipmentLog.update(location, { where: { shipment_number: args.shipment_number } }).then((shipresp) => {
            //         resolve(shipresp)
            //     // })
            // })
        })
    }

    function consent_oneshipmentUpdate(args, consentObj) {
        return new Promise((resolve) => {

            Shipment.update(consentObj, { where: { shipment_number: args.shipment_number } }).then((shipresp) => {
                // ShipmentLog.update(consentObj, { where: { invoice_number: args.invoice_number } }).then((shipresp) => {
                resolve(shipresp)
                // })
            })
        })
    }

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

    function get_oneDriverShipmentUpdate(args, location) {
        return new Promise((resolve) => {

            Shipment.findOne({ where: { driver_phoneno: args.driver_phoneno }, order: [
                    ['createdAt', 'DESC']
                ], LIMIT: 1 }).then((shipresp) => {
                var filter = { shipment_number: shipresp.shipment_number, destination_location: null }

                Invoice.findOne({ where: filter }).then(invoice => {
                    Invoice.update(location, { where: { invoice_number: invoice.invoice_number } }).then(() => {
                        resolve(invoice)
                    })

                })

            })

        })
    }

    function get_oneDriverShipmentUpdate222(args, consentObj) {
        return new Promise((resolve) => {

            Shipment.update(consentObj, { where: { driver_phoneno: args.driver_phoneno }, order: [
                    ['createdAt', 'DESC']
                ], LIMIT: 1 }).then((shipresp) => {
                resolve(shipresp)

            })

        })
    }

    function get_customerAvaliableStatus(args, updt) {
        return new Promise((resolve) => {

            Shipment.findOne({ where: { driver_phoneno: args.driver_phoneno }, order: [
                    ['createdAt', 'DESC']
                ], LIMIT: 1 }).then((shipresp) => {
                var filter = { shipment_number: shipresp.shipment_number, destination_location: {
                        [op.ne]: null } }

                Invoice.findOne({ where: filter }).then(invoice => {
                    Invoice.update(updt, { where: { invoice_number: invoice.invoice_number } }).then(() => {
                        resolve(invoice)
                    })

                })

            })

        })
    }



    // function update_customerAvaliableStatus(args, updt) {
    //     return new Promise((resolve) => {

    //         var filter = {
    //             driver_phoneno: args.driver_phoneno,
    //             destination_location: {
    //                 [Op.ne]: null },
    //             customer_reply_status: null
    //         }

    //         Shipment.update(updt, { where: filter }).then(() => {
    //             // ShipmentLog.update(updt, { where: filter }).then((shipresp) => {})
    //             resolve(shipresp)
    //         })

    //     })
    // }

    //shiptoparty_mobileno soldtoparty_mobileno

    apiRoutes.post('/getoneshipment', (req, res) => {
        const data = req.body.data;
        let where = {
            shipment_number: data.shipment_number
        }

        console.log(data)
        Shipment.findOne({ where: where }).then((resp) => {
            res.json(resp);
        }, error => {
            res.json(error);
        });
    })
    // ----------------------------------Manual Sim Tracking API ends-----------------------------------------------


    apiRoutes.post('/receivedriversms', (req, res) => {
        const data = req.body;
        var timings = {};
        console.log("dtata===  ", data);
        var driverData = {
            message: data.comments,
            driver_phoneno: data.sender.substring(2),
            txtTime: data.rcvd
        }
        // var formatDate = format_Date(new Date())
        // timings.dest_driver_reach_time = formatDate;
        // var setOneInvoiceTimings = get_oneDriverShipmentUpdate(driverData, timings);

        console.log(driverData);
        if (driverData.message == 1) {
            var location = {};
            var consentObj = {};
            async function getDestination(driverData) {

              var formatDate = format_Date(new Date())
              timings.dest_driver_reach_time = formatDate;
              var invoice = await get_oneDriverShipmentUpdate(driverData, timings);

                    var customerNumber;
                        if (invoice.soldtoparty_mobileno)
                            customerNumber = invoice.soldtoparty_mobileno;
                        else
                            customerNumber = invoice.shiptoparty_mobileno;


                        var textsms = "Invoice No " + invoice.invoice_number + " delivered. Click the following link to accept: " + serverIp + "customer/%23/invoice/" + customerNumber;

                        var textmail = "Invoice No " + invoice.invoice_number + " delivered. Click the following link to accept: " + serverIp + "customer/#/invoice/" + customerNumber;

                        var requested_url = 'https://api.textlocal.in/send/?' + "apikey=" + apikey + "&numbers=" + customerNumber + "&message=" + encodeURI(textsms)


                        var mailOptions = {
                            from: 'Orient Cement <notification@ipssi.com>', // sender address
                            to: invoice.customer_emailid, // list of receivers
                            subject: '[ORDER UPDATE] ' + invoice.invoice_number, // Subject line
                            // text: req.body.body, // plaintext body
                            html: 'Hello,<br><br>' + textmail + '<br><br>Thank you,<br><br>Orient Cement' // html body
                        };

                        mailer.sendMail(mailOptions, function(error, info) {});

                        request(requested_url, function(error, response, body) {
                            console.log("data333 ", JSON.parse(body))
                            // res.send({ status: true });
                        })

                var getToken = await get_accessToken()
                console.log("getToken ", getToken);
                var getConsent = await get_userConsent(driverData, getToken)

                if (getConsent && getConsent.errorCode) {
                    consentObj.driver_consent_status = getConsent.errorDescription;
                    var consentoneshipmentUpdate222 = await get_oneDriverShipmentUpdate222(driverData, consentObj)

                    var formatDate = await format_Date(new Date())
                    location.driver_consent_status = getConsent.errorDescription;
                    location.dest_driver_loc_time = formatDate;
                    location.dest_driver_reach_time = formatDate;
                    var getoneshipmentUpdate = await get_oneDriverShipmentUpdate(driverData, location)
                    console.log("sumfulfulinvo ", getConsent);
                    return { status: false, message: 'Message not send to driver..!! Error in service provider', response: 'Partially Success' }

                } else if (getConsent && getConsent.requestError) {
                    consentObj.driver_consent_status = getConsent.requestError.serviceException.text;
                    var consentoneshipmentUpdate222 = await get_oneDriverShipmentUpdate222(driverData, consentObj)

                    var formatDate = await format_Date(new Date())
                    location.driver_consent_status = getConsent.requestError.serviceException.text;
                    location.dest_driver_loc_time = formatDate;
                    location.dest_driver_reach_time = formatDate;
                    var getoneshipmentUpdate = await get_oneDriverShipmentUpdate(driverData, location)
                    return { status: false, message: 'Message not send to driver..!! Error in service provider', response: 'Partially Success' }
                } else if (getConsent && getConsent.Consent.status == 'ALLOWED') {

                    var getLocation = await get_userLocation(driverData, getToken)

                    if (getLocation && getLocation.requestError) {
                        console.log("getLocation ", getLocation);
                        consentObj.driver_consent_status = getConsent.Consent.status + " " + getLocation.requestError.serviceException.text;
                        var consentoneshipmentUpdate222 = await get_oneDriverShipmentUpdate222(driverData, consentObj)

                        var formatDate = await format_Date(new Date())
                        location.driver_consent_status = getConsent.Consent.status + " " + getLocation.requestError.serviceException.text;
                        location.dest_driver_loc_time = formatDate;
                        location.dest_driver_reach_time = formatDate;
                        var getoneshipmentUpdate = await get_oneDriverShipmentUpdate(driverData, location)
                        return { status: false, message: 'Message send to driver..!! Visitor Location Register Error through service Provider', response: 'Partially Success' }
                    } else {

                        var latitude = getLocation.terminalLocationList.terminalLocation[0].currentLocation.latitude;
                        var longitude = getLocation.terminalLocationList.terminalLocation[0].currentLocation.longitude;
                        location.destination_location = latitude + ',' + longitude;
                        location.driver_consent_status = 'ALLOWED';
                        var formatDate = await format_Date(new Date())
                        location.dest_driver_loc_time = formatDate;
                        location.dest_driver_reach_time = formatDate;
                        var invoice_1 = await get_oneDriverShipmentUpdate(driverData, location);

                        consentObj.driver_consent_status = "ALLOWED";
                        var consentoneshipmentUpdate222 = await get_oneDriverShipmentUpdate222(driverData, consentObj)


                        // var customerNumber;
                        // if (invoice.soldtoparty_mobileno)
                        //     customerNumber = invoice.soldtoparty_mobileno;
                        // else
                        //     customerNumber = invoice.shiptoparty_mobileno;


                        // var textsms = "Invoice No " + invoice.invoice_number + " delivered. Click the following link to accept: " + serverIp + "customer/%23/invoice/" + customerNumber;

                        // var textmail = "Invoice No " + invoice.invoice_number + " delivered. Click the following link to accept: " + serverIp + "customer/#/invoice/" + customerNumber;

                        // var requested_url = 'https://api.textlocal.in/send/?' + "apikey=" + apikey + "&numbers=" + customerNumber + "&message=" + encodeURI(textsms)


                        // var mailOptions = {
                        //     from: 'Orient Cement <notification@ipssi.com>', // sender address
                        //     to: invoice.customer_emailid, // list of receivers
                        //     subject: '[ORDER UPDATE] ' + invoice.invoice_number, // Subject line
                        //     // text: req.body.body, // plaintext body
                        //     html: 'Hello,<br><br>' + textmail + '<br><br>Thank you,<br><br>Orient Cement' // html body
                        // };

                        // mailer.sendMail(mailOptions, function(error, info) {});

                        // request(requested_url, function(error, response, body) {
                        //     console.log("data333 ", JSON.parse(body))
                        //     // res.send({ status: true });
                        // })



                        // console.log("getoneshipmentUpdate ",getoneshipmentUpdate);
                        return { status: true, message: 'Driver Location Accquired' }
                    }

                } else if (getConsent && (getConsent.Consent.status == 'PENDING' || getConsent.Consent.status == 'DENIED')) {

                    consentObj.driver_consent_status = getConsent.Consent.status;
                    var consentoneshipmentUpdate222 = await get_oneDriverShipmentUpdate222(driverData, consentObj)
                    var formatDate = await format_Date(new Date())
                    location.driver_consent_status = getConsent.Consent.status;
                    location.dest_driver_loc_time = formatDate;
                    location.dest_driver_reach_time = formatDate;
                    var invoice = await get_oneDriverShipmentUpdate(driverData, location);

                    var customerNumber;
                    if (invoice.soldtoparty_mobileno)
                        customerNumber = invoice.soldtoparty_mobileno;
                    else
                        customerNumber = invoice.shiptoparty_mobileno;

                    var textsms = "Invoice No " + invoice.invoice_number + " delivered. Click the following link to accept: " + serverIp + "customer/%23/invoice/" + customerNumber;

                    var textmail = "Invoice No " + invoice.invoice_number + " delivered. Click the following link to accept: " + serverIp + "customer/#/invoice/" + customerNumber;

                    var requested_url = 'https://api.textlocal.in/send/?' + "apikey=" + apikey + "&numbers=" + customerNumber + "&message=" + encodeURI(textsms)


                    var mailOptions = {
                        from: 'Orient Cement <notification@ipssi.com>', // sender address
                        to: invoice.customer_emailid, // list of receivers
                        subject: '[ORDER UPDATE] ' + invoice.invoice_number, // Subject line
                        // text: req.body.body, // plaintext body
                        html: 'Hello,<br><br>' + textmail + '<br><br>Thank you,<br><br>Orient Cement' // html body
                    };

                    mailer.sendMail(mailOptions, function(error, info) {});

                    request(requested_url, function(error, response, body) {
                        console.log("data333 ", JSON.parse(body))
                        // res.send({ status: true });
                    })

                    return { status: false, message: 'Message send to driver..!! Wait for sometime, driver reply to give consent' }
                }

            }

            getDestination(driverData).then((data) => {
                res.status(200).send({});

            })
        } else if (driverData.message == 2) {

            var updt = { customer_reply_status: 'notAvaliable' }

            async function getCustomerStatus(driverData) {
                console.log("dtata===  ", data);
                var getstatus = await get_customerAvaliableStatus(driverData, updt);
                return { status: true, message: 'Customer not Avaliable' }

            }

            getCustomerStatus(driverData).then((data) => {
                console.log("customer===  ", data);
                res.status(200).send({});

            })
        }


    })

    apiRoutes.post('/sendMessagetoCustomer', (req, res) => {
        var invoice = req.body.data;
        console.log("invoice===", invoice)
        var email = invoice.customer_emailid

        var customerNumber;
        if (invoice.soldtoparty_mobileno)
            customerNumber = invoice.soldtoparty_mobileno;
        else
            customerNumber = invoice.shiptoparty_mobileno;

        var textsms = "Invoice No " + invoice.invoice_number + " delivered. Click the following link to accept: " + serverIp + "customer/%23/invoice/" + customerNumber;

        var textmail = "Invoice No " + invoice.invoice_number + " delivered. Click the following link to accept: " + serverIp + "customer/#/invoice/" + customerNumber;

        var requested_url = 'https://api.textlocal.in/send/?' + "apikey=" + apikey + "&numbers=" + customerNumber + "&message=" + encodeURI(textsms)


        var mailOptions = {
            from: 'Orient Cement <notification@ipssi.com>', // sender address
            to: invoice.customer_emailid, // list of receivers
            subject: '[ORDER UPDATE] ' + invoice.invoice_number, // Subject line
            // text: req.body.body, // plaintext body
            html: 'Hello,<br><br>' + textmail + '<br><br>Thank you,<br><br>Orient Cement' // html body
        };

        mailer.sendMail(mailOptions, function(error, info) {});

        request(requested_url, function(error, response, body) {
            console.log("data333 ", JSON.parse(body))
            res.send({ status: true });
        })

    })

    // apiRoutes.post('/driverShipments', (req, res) => {
    //     const data = req.body.data;
    //     let where = {
    //         driver_phone: data.driver_phone, 
    //         driver_using_smartphone_or_sim_plant: 'EPOD',
    //         destination_location: { [Op.ne]: null}
    //     }

    //     console.log(data)
    //     Shipment.findOne({ where: where }).then((resp) => {
    //         res.json(resp);
    //     }, error => {
    //         res.json(error);
    //     });
    // }) 



    apiRoutes.post('/lrImage/:invoiceNumber/:customerMobileno/:customerEmail', function(req, res) {

        const invoice_number = req.params.invoiceNumber;
        const customer_mobile_no = req.params.customerMobileno;
        const customer_email = req.params.customerEmail;
        const imageee = req.body.image;
        var filter = { invoice_number: invoice_number }

        console.log(invoice_number);
        console.log("image", imageee);

        var file = req.file('image');
        // console.log(req.file('image'));
        if (!file) {
            //Let's pretend this is an actual function somewhere that validates the file, but it fails
            //Setting noop to true, cancels the stream operation as seen here    
            //skipper/standalone/Upstream/prototype._read.js:25:3
            file.upload({ noop: true });
            return res.badRequest({ 'error': 'Image not uploaded we don\'t like you, go away!' });
        } else {
            req.file('image').upload({
                dirname: 'lrimages/',
                saveAs: invoice_number + '.jpg'
            }, function(err, uploadedFiles) {
                if (err) {
                    return res.send(500, err);
                } else {

                         var textsms = "Invoice No " + invoice_number + " delivered. Click the following link to accept: " + serverIp + "customer/%23/invoice/" + customer_mobile_no;

                        var textmail = "Invoice No " + invoice_number + " delivered. Click the following link to accept: " + serverIp + "customer/#/invoice/" + customer_mobile_no;

                        var requested_url = 'https://api.textlocal.in/send/?' + "apikey=" + apikey + "&numbers=" + customer_mobile_no + "&message=" + encodeURI(textsms)


                        var mailOptions = {
                            from: 'Orient Cement <notification@ipssi.com>', // sender address
                            to: customer_email, // list of receivers
                            subject: '[ORDER UPDATE] ' + invoice_number, // Subject line
                            // text: req.body.body, // plaintext body
                            html: 'Hello,<br><br>' + textmail + '<br><br>Thank you,<br><br>Orient Cement' // html body
                        };

                        mailer.sendMail(mailOptions, function(error, info) {});

                        request(requested_url, function(error, response, body) {
                            console.log("data333 ", JSON.parse(body))
                            // res.send({ status: true });
                        })

                    var imageurl = serverIp + "lrimages/" + invoice_number + '.jpg';
                    var updt = { signed_lr_image: imageurl }
                    Invoice.update(updt, { where: filter }).then(() => {
                        res.status(200).send(uploadedFiles);
                        // InvoiceLog.update(updt, { where: filter }).then((shipresp) => {
                        //     })
                    })
                }

            });

        }
    })


    apiRoutes.post('/getdriverConsent', (req, res) => {
        var shipment = req.body.shipdriverObj;
        var consentObj = {};
        // console.log("invoice ", shipment);
        if (shipment.driver_using_smartphone_or_sim_plant == 'SIM') {

            async function shipdata(shipment) {
                var getToken = await get_accessToken()
                // console.log("getToken ",getToken);
                var getConsent = await get_userConsent(shipment, getToken)
                console.log("getConsent++++++ ", getConsent);
                if (getConsent && getConsent.errorCode) {
                    consentObj.driver_consent_status = getConsent.errorDescription;
                    var consentoneshipmentUpdate = await consent_oneshipmentUpdate(shipment, consentObj)
                    console.log("getConsent=====++ ", getConsent);
                    return { status: false, message: 'Consent not given from driver..!! Error in service provider', response: 'Fully UnSuccess' }
                } else if (getConsent && getConsent.requestError) {
                    consentObj.driver_consent_status = getConsent.requestError.serviceException.text;
                    var consentoneshipmentUpdate = await consent_oneshipmentUpdate(shipment, consentObj)
                    return { status: false, message: 'Consent not given from driver..!! Error in service provider', response: 'Fully UnSuccess' }
                } else if (getConsent && getConsent.Consent.status == 'ALLOWED') {
                    var getLocation = await get_userLocation(shipment, getToken)
                    if (getLocation && getLocation.requestError) {
                        consentObj.driver_consent_status = getConsent.Consent.status + " " + getLocation.requestError.serviceException.text;
                        var consentoneshipmentUpdate = await consent_oneshipmentUpdate(shipment, consentObj)
                        console.log("getLocation=====++ ", getLocation);
                        return { status: false, message: 'Message send to driver..!! Visitor Location Register Error through service Provider', response: 'Partially Success' }
                    } else {

                        var latitude = getLocation.terminalLocationList.terminalLocation[0].currentLocation.latitude;
                        var longitude = getLocation.terminalLocationList.terminalLocation[0].currentLocation.longitude;

                        consentObj.plant_location = latitude + ',' + longitude;
                        consentObj.middle_location = latitude + ',' + longitude;
                        consentObj.driver_consent_status = "ALLOWED";
                        var consentoneshipmentUpdate = await consent_oneshipmentUpdate(shipment, consentObj)
                        // console.log("getoneshipmentUpdate ",getoneshipmentUpdate);
                        return { status: true, message: 'Driver Location Accquired' }

                    }


                } else if (getConsent && (getConsent.Consent.status == 'PENDING' || getConsent.Consent.status == 'DENIED')) {
                    consentObj.driver_consent_status = getConsent.Consent.status;
                    var consentoneshipmentUpdate = await consent_oneshipmentUpdate(shipment, consentObj)
                    console.log("getConsentgetConsent=====++ ", getConsent);
                    return { status: false, message: 'Message send to driver..!! driver reply to give consent' + " " + 'its' + " " + getConsent.Consent.status }
                }



            }

            shipdata(shipment).then((data) => {
                console.log("dtata===  ", data);
                // res.send(data);
                res.status(200).send(data);
            })

        } else {
            console.log("Nothing its Epod")
        }

    })



    app.use('/', apiRoutes);
};
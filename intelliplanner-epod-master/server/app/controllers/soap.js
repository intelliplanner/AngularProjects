const express = require('express');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const db = require('../../config/db.config.js');
var winston = require('../../config/winston');
const Admin = db.admin;
const Transporter = db.transporter;
const wsdlLog = db.wsdlLog;
const session = require('express-session');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

var async = require("async");

const Shipment = db.shipment;
const ShipmentLog = db.shipmentlog;

const Invoice = db.invoice;
const InvoiceLog = db.invoicelog;

const PurchaseOrder = db.purchaseorder;
const PurchaseOrderLog = db.purchaseorderlog;
var http = require('http');
var smsURL = "http://bhashsms.com/api/sendmsg.php?user=elvento labs&pass=123456&sender=ATULSR&phone=[number]&text=[smsText]&priority=ndnd&stype=normal";


const soap = require('soap');
var request = require('request');



module.exports = function(appold) {

    var app = express();
    app.use(session({
        secret: "asdasdkajsdkj",
        resave: true,
        saveUninitialized: true
    }));
    var soapSession;

    var xml = require('fs').readFileSync('myservices.wsdl', 'utf8');
    console.log("----------------------------------")
    console.log(" soap soapsoap soapsoap soapsoap soapsoap soapsoap soap")

    var server = app.listen(4000, function() {

        // require('./app/routes')(app);

        console.log('Ready')


        var soapServer = soap.listen(app, '/wsdl', service, xml, function() {
            console.log('server initialized');
        });
        soapServer.authorizeConnection = function(req) {
            soapSession = req.session;
            soapSession.received_at = new Date().getTime();
            return true; // or false
        };


        soapServer.log = function(type, data) {
            if (type == 'received') {
                soapSession.envelope = data;
                soapSession.type
                winston.log('info', { Date: new Date().toLocaleString(), Message: 'API REQUEST WSDL', requestBody: data });
                winston.log('info', { spacer: '--------------------------------------------------------------------------------------------' });

            }
            if (type == 'error') {
                soapSession.error = data;
                console.log("error", data)
                winston.log('error', { Date: new Date().toLocaleString(), Message: 'API ERROR WSDL', error: data });
                winston.log('info', { spacer: '--------------------------------------------------------------------------------------------' });
                return data;
            }
            if (type == 'replied') {
                soapSession.response = data;
                winston.log('info', { Date: new Date().toLocaleString(), Message: 'API REQUEST RESPONSE LOG', responseBody: data });
                winston.log('info', { spacer: '--------------------------------------------------------------------------------------------' });
                console.log(soapSession)
                return data;
            }
        };
    });

};

var service = {
    ws: {
        operations: {
            createShipment: function(args, callback, headers, req) {
                return createShipment(args, callback, headers, req)
            },
            cancelShipment: function(args, callback, headers, req) {
                return cancelShipment(args, callback, headers, req)
            },
            createInvoice: function(args, callback, headers, req) {
                return createInvoice(args, callback, headers, req)
            },
            cancelInvoice: function(args, callback, headers, req) {
                return cancelInvoice(args, callback, headers, req)
            },
            createPurchaseOrder: function(args, callback, headers, req) {
                return createPurchaseOrder(args, callback, headers, req)
            },
            cancelPurchaseOrder: function(args, callback, headers, req) {
                return cancelPurchaseOrder(args, callback, headers, req)
            }
        }
    }
};

function createShipment(args, callback, headers, req) {

    var ip = req.connection.remoteAddress;

	// if(args.shipment_creation_date.length)
		
    args.shipment_creation_date = String(args.shipment_creation_date).substring(0, 4) + '-' + String(args.shipment_creation_date).substring(4, 6) + '-' + String(args.shipment_creation_date).substring(6, 8)
    args.shipment_creation_time = String(args.shipment_creation_time).substring(0, 2) + ':' + String(args.shipment_creation_time).substring(2, 4) + ':' + String(args.shipment_creation_time).substring(4, 6)

    if (!args.driver_using_smartphone_or_sim_plant || args.driver_using_smartphone_or_sim_plant == '' || (args.driver_using_smartphone_or_sim_plant != 'EPOD' && args.driver_using_smartphone_or_sim_plant != 'SIM')) {
        logging(args, args, ip)
        callback({
			status: 0,
            response: 'Driver using SIM or EPOD not correctly mentioned!'
        });
    } else if 
    (!args.driver_phoneno || args.driver_phoneno == '' || isNaN(args.driver_phoneno)) {
        logging(args, args, ip)
        callback({
			status: 0,
            response: 'The Driver Phone Number you have not entered, or PhoneNo has not contained valid digits/Wrong Format!'
        });
    } else if (args.driver_using_smartphone_or_sim_plant == 'SIM') {
        Shipment.create(args).then((resp) => {
            var location = {}
            async function shipdata(args) {
                var getToken = await get_accessToken()
                // console.log("getToken ",getToken);
                try {
                    var getConsent = await get_userConsent(args, getToken)
                } catch (error) {
                    // console.log("consent error ", error); 
                    if (error && error.errorCode) {
                        location.driver_consent_status = error.errorDescription;
                        var getoneshipmentUpdate = await get_oneshipmentUpdate(args, location)
                        // console.log("getoneshipmentUpdate ",getoneshipmentUpdate);
                        logging(args, error, ip)
                        callback({
                            response: error.errorDescription,
							status: 1
                        });
                        return { status: false, message: 'Consent error, Driver Location not Accquired' }
                    } else if (error && error.requestError) {
                        location.driver_consent_status = error.requestError.serviceException.text;
                        var getoneshipmentUpdate = await get_oneshipmentUpdate(args, location)
                        // console.log("getoneshipmentUpdate ",getoneshipmentUpdate);
                        logging(args, error, ip)
                        callback({
                            response: error.requestError.serviceException.text,
							status: 1
                        });
                        return { status: false, message: 'Consent error, Driver Location not Accquired' }
                    }

                }

                // console.log("sumfulful ", getConsent);
                if (getConsent && (getConsent.Consent.status == 'PENDING' || getConsent.Consent.status == 'DENIED')) {
                    location.driver_consent_status = getConsent.Consent.status;
                    var getoneshipmentUpdate = await get_oneshipmentUpdate(args, location)
                    return { status: true, message: 'Message to driver send' }
                } else if (getConsent && getConsent.Consent.status == 'ALLOWED') {
                    try {
                        var getLocation = await get_userLocation(args, getToken)
                    } catch (error) {
                        // console.log("location error ", error);
                        location.driver_consent_status = getConsent.Consent.status + " " + error.requestError.serviceException.text;
                        var getoneshipmentUpdate = await get_oneshipmentUpdate(args, location)
                        logging(args, error, ip)
                        callback({
                            response: error.requestError.serviceException.text,
							status: 1
                        });
                        return { status: false, message: 'Consent Allowed, Driver Location not Accquired' }
                    }

                    var latitude = getLocation.terminalLocationList.terminalLocation[0].currentLocation.latitude;
                    var longitude = getLocation.terminalLocationList.terminalLocation[0].currentLocation.longitude;
                    location.plant_location = latitude + ',' + longitude;
                    location.driver_consent_status = getConsent.Consent.status;
                    var getoneshipmentUpdate = await get_oneshipmentUpdate(args, location)
                    // console.log("getoneshipmentUpdate ",getoneshipmentUpdate);
                    return { status: true, message: 'Driver Location Accquired' }
                }
            }
            shipdata(args).then((data) => {
                // console.log("dtata===  ", data);
                logging(args, resp, ip)
                callback({
                    response: JSON.stringify(resp),
					status: 1
                });
            })
            // ShipmentLog.create(args).then((resp) => {})
        }, error => {
            // console.log("error ==================>>", error)
            logging(args, error, ip)
            callback({
                response: error.original.sqlMessage,
				status: 0
            });
        });
    } else if (args.driver_using_smartphone_or_sim_plant == 'EPOD') {
        Shipment.create(args).then((resp) => {
            var getsendMessage = sendMessage(args);
            // console.log("args EPOD==================>>", args)
            logging(args, resp, ip)
            callback({
                response: JSON.stringify(resp),
					status: 1
            });
            // ShipmentLog.create(args).then((resp) => {})
        }, error => {
            // console.log("error ==================>>", error)
            logging(args, error, ip)
            callback({
                response: error.original.sqlMessage,
					status: 0
            });
        });

    }

}

function cancelShipment(args, callback, headers, req) {
    var ip = req.connection.remoteAddress;

    args.shipment_cancellation_date = String(args.shipment_cancellation_date).substring(0, 4) + '-' + String(args.shipment_cancellation_date).substring(4, 6) + '-' + String(args.shipment_cancellation_date).substring(6, 8)

    args.shipment_cancellation_time = String(args.shipment_cancellation_time).substring(0, 2) + ':' + String(args.shipment_cancellation_time).substring(2, 4) + ':' + String(args.shipment_cancellation_time).substring(4, 6)

    Shipment.update(args, { where: { shipment_number: args.shipment_number } }).then((resp) => {
        if (resp[0] == 0) {
            logging(args, resp, ip)
            callback({
                response: JSON.stringify({ responseMessage: 'The Shipment Number you have entered not exist.If you want to cancel Shipment' + args.shipment_number + 'first you have to create it.' })
            });
        } else if (resp[0] == 1) {
            logging(args, resp, ip)
            callback({
                response: JSON.stringify(resp)
            });
        }
    }, error => {
        logging(args, error, ip)
        callback({
            response: error.original.sqlMessage
        });
    });
}

function createInvoice(args, callback, headers, req) {

    // args = args
    var ip = req.connection.remoteAddress;
    var location = {};
    var timings = {};
    args.invoice_date = String(args.invoice_date).substring(0, 4) + '-' + String(args.invoice_date).substring(4, 6) + '-' + String(args.invoice_date).substring(6, 8)
    args.shipment_date = String(args.shipment_date).substring(0, 4) + '-' + String(args.shipment_date).substring(4, 6) + '-' + String(args.shipment_date).substring(6, 8)
    args.invoice_time = String(args.invoice_time).substring(0, 2) + ':' + String(args.invoice_time).substring(2, 4) + ':' + String(args.invoice_time).substring(4, 6)
    args.customer_emailid = (args && args.salesofficer_emailid ? args.salesofficer_emailid : null)

    Invoice.create(args).then((resp) => {

        async function invodata(args) {
            var getToken = await get_accessToken()
            // console.log("getToken ",getToken);
            var getoneshipmentData = await get_oneshipmentData(args)
            // console.log("getoneshipmentData ",getoneshipmentData);
            if (getoneshipmentData && getoneshipmentData.driver_using_smartphone_or_sim_plant == 'SIM') {

                try {
                    var getConsent = await get_userConsent(getoneshipmentData, getToken)
                } catch (error) {
                    if (error && error.errorCode) {
                        // console.log("consent i error ", error); 
                        location.driver_consent_status = error.errorDescription
                        var getoneshipmentUpdate = await get_oneshipmentUpdate(getoneshipmentData, location)
                        timings.driver_consent_status = error.errorDescription
                        var getoneInvoiceUpdate = await get_oneInvoiceUpdate(timings, args)
                        logging(args, error, ip)
                        // callback({
                            // response: error.errorDescription,
                            // status: 0
                        // });
                        return { status: 1, message: 'Consent error, Message to Driver not Send' }
                    } else if (error && error.requestError) {
                        // console.log("consent i error ", error); 
                        location.driver_consent_status = error.requestError.serviceException.text;
                        var getoneshipmentUpdate = await get_oneshipmentUpdate(getoneshipmentData, location)
                        timings.driver_consent_status = error.requestError.serviceException.text;
                        var getoneInvoiceUpdate = await get_oneInvoiceUpdate(timings, args)
                        logging(args, error, ip)
                        // callback({
                            // response: error.requestError.serviceException.text
                        // });
                        return { status: 1, message: error.requestError.serviceException.text }

                    }

                }
                // console.log("sumfulfulinvo ", getConsent);

                if (getConsent && getConsent.Consent.status == 'ALLOWED') {

                    try {
                        var getLocation = await get_userLocation(getoneshipmentData, getToken)
                    } catch (error) {
                        // console.log("location i error ", error);
                        location.driver_consent_status = getConsent.Consent.status + " " + error.requestError.serviceException.text;
                        var getoneshipmentUpdate = await get_oneshipmentUpdate(getoneshipmentData, location)

                        timings.driver_consent_status = getConsent.Consent.status + " " + error.requestError.serviceException.text;
                        var getoneInvoiceUpdate = await get_oneInvoiceUpdate(timings, args)
                        logging(args, error, ip)
                        // callback({
                            // response: error.requestError.serviceException.text
                        // });
                        return { status: 1, message: 'Consent Allowed, Driver Location not Accquired' }

                    }
                    var latitude = getLocation.terminalLocationList.terminalLocation[0].currentLocation.latitude;
                    var longitude = getLocation.terminalLocationList.terminalLocation[0].currentLocation.longitude;
                    location.plant_location = latitude + ',' + longitude;
                    location.driver_consent_status = "ALLOWED";
                    var getoneshipmentUpdate = await get_oneshipmentUpdate(getoneshipmentData, location)
                    var formatDate = await format_Date(new Date())
                    timings.plant_driver_sms_rcvd_time = formatDate;
                    timings.driver_consent_status = 'ALLOWED';
                    var getoneInvoiceUpdate = await get_oneInvoiceUpdate(timings, args)
                    // console.log("getoneshipmentUpdate ",getoneshipmentUpdate);
                    return { status: 1, message: 'Driver Location Accquired' }

                } else if (getConsent && (getConsent.Consent.status == 'PENDING' || getConsent.Consent.status == 'DENIED')) {
                    var formatDate = await format_Date(new Date())
                    timings.plant_driver_sms_rcvd_time = formatDate;
                    timings.driver_consent_status = getConsent.Consent.status;
                    var getoneInvoiceUpdate = await get_oneInvoiceUpdate(timings, args)
                    location.driver_consent_status = getConsent.Consent.status;
                    var getoneshipmentUpdate = await get_oneshipmentUpdate(getoneshipmentData, location)
                    logging(args, resp, ip)
                    // callback({
						// status: 1,
                        // response: JSON.stringify({ responseMessage: 'Driver did not reply the message and not gave Allowed consent.' })
                    // });
                    return { status: 1, message: 'Driver did not reply the message and not gave Allowed consent.' }
                }

            } else {
                if(!getoneshipmentData)
				{
                    return {status: 1,  response: 'Shipment not yet created for this invoice'};
				}
                if(getoneshipmentData && getoneshipmentData.driver_using_smartphone_or_sim_plant == 'EPOD')
				{
                    return {status: 1,  response: 'Its Epod'};
				}
            }

        }

        invodata(args).then((data) => {
            // console.log("dtata===  ", data);
            logging(args, resp, ip)
            callback(data);
        }, error => {
			
		})


    }, error => {
        logging(args, error, ip)
        callback({
            response: error.original.sqlMessage,
            status: 0
        });
    });


}

function cancelInvoice(args, callback, headers, req) {
    var ip = req.connection.remoteAddress;

    args.invoice_cancellation_date = String(args.invoice_cancellation_date).substring(0, 4) + '-' + String(args.invoice_cancellation_date).substring(4, 6) + '-' + String(args.invoice_cancellation_date).substring(6, 8)

    args.invoice_cancellation_time = String(args.invoice_cancellation_time).substring(0, 2) + ':' + String(args.invoice_cancellation_time).substring(2, 4) + ':' + String(args.invoice_cancellation_time).substring(4, 6)

    Invoice.update(args, { where: { invoice_number: args.invoice_number } }).then((resp) => {
        console.log('cancel  ==>>', resp);
        if (resp[0] == 0) {
            logging(args, resp, ip)
            callback({
                response: JSON.stringify({ responseMessage: 'The Invoice Number you entered does not exist.If you want to cancel Invoice' + args.invoice_number + 'first you have to create it.' })
            });
        } else if (resp[0] == 1) {
            logging(args, resp, ip)
            callback({
                response: JSON.stringify(resp)
            });
        }
    }, error => {
        logging(args, error, ip)
        callback({
            response: error.original.sqlMessage
        });
    });
}

function createPurchaseOrder(args, callback, headers, req) {

    var data = args.pos;

    var asyncTask = [];
    data.forEach(function(purchaseOrder) {
        var asyncCall = function(callback) {


            purchaseOrder.purchase_order_date = String(purchaseOrder.purchase_order_date).substring(0, 4) + '-' + String(purchaseOrder.purchase_order_date).substring(4, 6) + '-' + String(purchaseOrder.purchase_order_date).substring(6, 8)

            PurchaseOrder.create(purchaseOrder).then((resp) => {
                callback(null, {
                    po: purchaseOrder,
                    status: true
                });
            }, error => {
                console.log('error', error);
                callback(null, {
                    po: purchaseOrder,
                    status: false,
                    error: error.original.sqlMessage,
                })
            })
        }
        asyncTask.push(asyncCall);
    });

    async.parallel(asyncTask,
        function(err, results) {
            if (err) {
                callback({
                    response: JSON.stringify(err)
                });
            } else {
                callback({
                    response: JSON.stringify(results)
                });
            }
        });

}

function cancelPurchaseOrder(args, callback, headers, req) {
    var ip = req.connection.remoteAddress;

    args.purchase_order_cancellation_date = String(args.purchase_order_cancellation_date).substring(0, 4) + '-' + String(args.purchase_order_cancellation_date).substring(4, 6) + '-' + String(args.purchase_order_cancellation_date).substring(6, 8)

    PurchaseOrder.update(args, { where: { purchase_order_number: args.purchase_order_number } }).then((resp) => {
        if (resp[0] == 0) {
            logging(args, resp, ip)
            callback({
                response: JSON.stringify({ responseMessage: 'The Purchase Order Number you entered does not exist.If you want to cancel Purchase Order' + args.purchase_order_number + 'first you have to create it.' })
            });
        } else if (resp[0] == 1) {
            logging(args, resp, ip)
            callback({
                response: JSON.stringify(resp)
            });
        }
    }, error => {
        logging(args, error, ip)
        callback({
            response: error.original.sqlMessage
        });
    });
}

function sendMessage(driverObj) {
    var text = "Hello " + driverObj.driver_name + ", download the mobile app from this link : https://play.google.com/store/apps/details?id=com.orient.odl";
    var reqURLSMS = smsURL.replace('[number]', driverObj.driver_phoneno).replace('[smsText]', text)


    request(reqURLSMS, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            return ({ message: 'successfully message send to driver', status: true, response: response });
        }
    })
}

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
    return new Promise((resolve, reject) => {

        var url = 'https://india-agw.telenity.com/apigw/testconsent/v2/location?address=tel:+91' + args.driver_phoneno;

        var headers = {
            'Host': 'india-agw.telenity.com',
            'Cache-Control': 'no-cache',
            'Authorization': 'Bearer' + ' ' + getToken.access_token,
            'User-Agent': 'application/json'
        };


        request.get({ headers: headers, url: url, method: 'GET' }, function(e, r, body) {

            var bodyValues = JSON.parse(body);
            // console.log('body:', bodyValues);
            if (bodyValues.errorCode) {
                reject(bodyValues)
            } else if (bodyValues.requestError) {
                reject(bodyValues)
            } else {
                resolve(bodyValues)
            }
        });
    })
}

function get_userLocation(args, getToken) {
    return new Promise((resolve, reject) => {

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
            if (bodyValues.requestError) {
                reject(bodyValues)
            } else {
                resolve(bodyValues)
            }

        });
    })
}

function get_oneshipmentData(args) {
    return new Promise((resolve) => {
        Shipment.findOne({ where: { shipment_number: args.shipment_number } }).then((shipresp) => {
            resolve(shipresp)
        })
    })
}

function get_oneshipmentUpdate(args, location) {
    return new Promise((resolve) => {
        Shipment.update(location, { where: { shipment_number: args.shipment_number } }).then((shipresp) => {
            // ShipmentLog.update(location,{where : {shipment_number:args.shipment_number}}).then((shipresp) => {
            resolve(shipresp)
            // })
        })
    })
}

function get_oneInvoiceUpdate(timings, args) {
    return new Promise((resolve) => {
        Invoice.update(timings, { where: { invoice_number: args.invoice_number } }).then((invoresp) => {
            resolve(invoresp);
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


function logging(request, response, ip) {

    winston.log('info', { SAP: 'SAPSAPSAPSAPSAPSAPSAPSAPSAPSAPSAPSAPSAPSAPSAPSAPSAPSAPSAPSAPSAPSAPSAPSAPSAPSAPSAPSAPSAPSAPSAP' });
    winston.log('info', { Date: new Date().toLocaleString(), IP: ip, Message: 'API REQUEST RESPONSE LOG', requestBody: request, responseBody: response });
    winston.log('info', { SAP: '--------------------------------------------------------------------------------------------' });
}
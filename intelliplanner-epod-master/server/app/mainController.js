const express = require('express');
const Sequelize = require('sequelize');
const db = require('../config/db.config.js');
const Transporter = db.transporter;
const Driver = db.driver;
const Invoice = db.invoice;
const InvoiceLog = db.invoicelog;
const Shipment = db.shipment;
const ShipmentLog = db.shipmentlog;
const Admin = db.admin;
const PurchaseOrder = db.purchaseorder;
const PurchaseOrderLog = db.purchaseorderlog;
const Plant = db.plant;
const TransporterPlant = db.transporterPlant;
const TransporterInvoices = db.transporterInvoices;

// ---------------------------------------epod------------------------------------------------------

module.exports = function(app) {

const apiRoutes = express.Router();


    app.get('/createtables', (req, res) => {
    	TransporterInvoices.sync({force: true}).then(() => {
    res.json('TransporterInvoices table created successfully.');
});

// Transporter.sync({force: true}).then(() => {
//     res.json('Transporter table created successfully.');
// });

// Driver.sync({force: true}).then(() => {
//     res.json('Driver table created successfully.');
// });

// Shipment.sync({force: true}).then(() => {
// });
// ShipmentLog.sync({force: true}).then(() => {});
// res.json('Shipment table created successfully.');

// Invoice.sync({force: true}).then(() => {
// });
// InvoiceLog.sync({force: true}).then(() => {
// });
//     res.json('Invoice table created successfully.');


// Invoice.sync({force: true}).then(() => {
// });
// InvoiceLog.sync({force: true}).then(() => {
// });
//     res.json('Invoice table created successfully.');

// Admin.sync({force: true}).then(() => {
// });


// PurchaseOrder.sync({force: true}).then(() => {
// });
// PurchaseOrderLog.sync({force: true}).then(() => {
// });
//     res.json('PurchaseOrder table created successfully.');

// Plant.sync({force: true}).then(() => {
// });
// TransporterPlant.sync({force: true}).then(() => {
// });
    // res.json('TransporterPlant table created successfully.');


    })

    app.use('/', apiRoutes);
};
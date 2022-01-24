const express = require('express');
const Sequelize = require('sequelize');
const fs = require('fs');
const db = require('../../config/db.config.js');
const sha512 = require('js-sha512');
const Op = Sequelize.Op

const Invoice = db.invoice;
const Shipment = db.shipment;
module.exports = function(app) {

    const apiRoutes = express.Router();


    app.post('/getAgentPayments', (req, res) => {
        // Payment.findAll({
        //     where: { agentId: req.body.agentId },
        //     include: { model: Dealer, as: 'dealer', attributes: ["name", "phone"] }
        // }).then(dealers => {
        //     res.json(dealers);
        // }, error => {
        //     res.json(error);
        // });
    })

    app.post('/updatePayments', (req, res) => {
        // const paymentObj = req.body.paymentObj;
        // Payment.update(paymentObj, {
        //     where: { id: paymentObj.id }
        // }).then(resp => {
        //     Order.update({ status: 'pending' }, {
        //         where: { id: paymentObj.orderId }
        //     }).then(payment => {
        //         res.json({ message: 'successfully updated payment' });
        //     }, error => {
        //         res.json(error);
        //     });

        // }, error => {
        //     res.json(error);
        // });
    })


    app.post('/getDealerPayments', (req, res) => {
        // Payment.findAll({
        //     where: { dealerId: req.body.dealerId },
        //     include: { model: Dealer, as: 'dealer', attributes: ["name", "phone"] }
        // }).then(dealers => {
        //     res.json(dealers);
        // }, error => {
        //     res.json(error);
        // });
    })

    // truck_number:     "GJ05UU1307",                                                   
         // invoice_datetime: "26-09-2018 03:19:40 ",   
         // invoice_number:  "2711008403",  
         // transporter_name:    "ANKITA LOGISTICS  PVT LTD",
         // plant:    "2000",
         // destination_code: "060032"   ,
         // destination_name:"SURAT",
         // shiptoparty_code:   "D5219", 
         // shiptoparty_name:   "ORIENT CEMENT LIMITED ",
         //  material:    "PACKED BAGS PPC",
         //  shipping_address:   "Plot No.243, Opp. Niharika dyeingmill" ,
         //  shiptoparty_number:    "7007",
         //  salesofficer_name:    "pqrs_klmn",
         //  salesofficer_number:  "20030" , 
         //  invoice_quantity:    "17",
         //  transporter_contactno: "7622019084"

    app.get('/postInvoiceDetails', (req, res) => {
     const invoice = {        
                      vehicle_no:"GJ05UU1307",
                     shipment_number:"0099991",
                     invoice_number:"2711008403",
                    salesperson_name:"pqrs_klmn",
                    salesperson_mobile_no:"7007",
                   salesperson_email_id:"salesperson1@.com",
                   invoice_status:true,
                   invoice_create_datetime:"26-09-2018 03:19:40", 
                  shipment_cost:"5000",
                  material:"PACKED BAGS PPC",
                  invoice_createdby:"company",
                  unit_No_of_Bags_per_Tons_per_Kg: 100,
                 transporter_code:"trans123",
                 transporter_name:"intelli",
                 source_code:null,
                 invoice_quantity:"17",
                 destination_code:"060032",
                 destination_name:"SURAT",
                 customer_code:"D5219",
                 customer_name:"ORIENT CEMENT LIMITED ",
                 customer_address:"Plot No.243, Opp. Niharika dyeingmill" ,
                 customer_city:"Mumbai",
                 customer_state:"Mahrashtra",
                 customer_mobile_no:"8000097"


                // vehicle_no:"GJ05UU1307",
                // shipment_number:"0099991",
                // vehicle_capacity:"800",    
                // shipment_status:true,
                // shipment_assignment_datetime:"22-09-2018 03:19:40",
                // shipment_cost:"5000",
                // shipment_assigning_user:"efgh",
                // shipment_quantity:"200",
                // transporter_code:"trans123",
                // transporter_name:"pqrs",
                // lr_no:"GJ05UU1307"

         }
        Invoice.create(invoice).then(() => {
            res.json('successfully added Shipment');
        }, error => {
            res.json(error);
        });
    })



    app.use('/', apiRoutes);
};
const express = require('express');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const db = require('../../config/db.config.js');
const Admin = db.admin;
const Transporter = db.transporter;
const Invoice = db.invoice;
const Shipment = db.shipment;
const PurchaseOrder = db.purchaseorder;
const Plant = db.plant;
const TransporterPlant = db.transporterPlant;
var request = require('request');

module.exports = function(app) {

    const apiRoutes = express.Router();

    apiRoutes.post('/adminLogin', function(req, res, next) {
        const item = req.body.adminObj;
        Admin.findOne({ username: item.username }).then((user) => {
            if (user.password == item.password) {
                res.json({ message: 'login successful', status: 1, agentID: user.id });
            } else {
                res.json({ message: 'invalid username/password', status: 0 });
            }
        }, error => {
            res.json({ message: 'invalid username/password', status: 0 });
        });

    });

    apiRoutes.post('/getAllTransporters', function(req, res, next) {
        Transporter.findAll({}).then((data) => {
                res.json(data);
        }, error => {
            res.json({ message: error, status: 0 });
        });

    });

     apiRoutes.post('/getAlltransportusers', function(req, res, next) {
        TransporterPlant.findAll({}).then((data) => {
                res.json(data);
        }, error => {
            res.json({ message: error, status: 0 });
        });

    });

    apiRoutes.post('/addTransporter', function(req, res, next) {
        const transpObj = req.body.transpObj;
        console.log("=========",transpObj)
        Transporter.create(transpObj).then((data) => {
                res.json(data);
        }, error => {
            res.json({ message: error, status: 0 });
        });

    });

    apiRoutes.post('/updateTransporter', function(req, res, next) {
        const transpObj = req.body.transpObj;
        console.log(transpObj)
        Transporter.update(transpObj,{ where: {id: transpObj.id}}).then((data) => {
                res.json({ message: 'updated transporter', status: 1 });
        }, error => {
            res.json({ message: error, status: 0 });
        });

    });

     apiRoutes.post('/updatePlantTransporter', function(req, res, next) {
        const transpObj = req.body.transpObj;
        delete transpObj.plant;
        console.log(transpObj)
        TransporterPlant.update(transpObj,{ where: {id: transpObj.id}}).then((data) => {
                res.json({ message: 'updated PlantTransporter', status: 1 });
        }, error => {
            res.json({ message: error, status: 0 });
        });

    });

    apiRoutes.post('/addPlantTransporter', function(req, res, next) {
        const transpObj = req.body.transpObj;
        delete transpObj.plant;
        console.log("sumfulful ",transpObj);
        TransporterPlant.create(transpObj).then((data) => {
                res.json(data);
        }, error => {
            res.json({ message: error, status: 0 });
        });

    });

    apiRoutes.post('/deleteTransporter', function(req, res, next) {
        const id = req.body.id;
        Transporter.destroy({ where: {id: id}}).then((data) => {
                res.json({ message: 'deleted transporter', status: 1 });
        }, error => {
            res.json({ message: error, status: 0 });
        });

    });


    apiRoutes.post('/changePassword', function(req, res, next) {
        const item = req.body.adminObj;
        Admin.update(item, { where: { id: '1' } }).then(() => {
            res.json('password changed successfully');
        }, error => {
            res.json(error);
        });

    });


    apiRoutes.post('/getAllepod', function(req, res) {
            var allepodData = {};
             async function epoddata(){
            var shipments  = await get_shipments()
            var invoices  = await get_invoices()
            var purchaseorders  = await get_purchaseorders()

             allepodData.shipments = shipments
             allepodData.invoices = invoices
             allepodData.purchaseorders = purchaseorders
             // console.log("sumfulful ",allepodData);
             return allepodData

        }
        epoddata().then((data) =>{
            // console.log("dtata  ",data);
            if(data && Object.keys(data).length > 0){
            // res.json({ shipments: data.shipments,invoices: data.invoices,purchaseorders: data.purchaseorders });    
           res.json(data);    
            }
            
        })


    });


    function get_shipments(){
        var shipmentArry = [];
        return Shipment.findAll().then((ship) => {
            return shipmentArry = ship;
        }, error => {
            res.json(error);
        });
    }

     function get_invoices(){
             return new Promise((resolve) => { 
                Invoice.findAll().then((invo) => {
                  resolve(invo);
                 }, error => {
                    res.json(error);
                 });
        })


        // var invoiceArry = [];
        // return Invoice.findAll().then((invo) => {
        //     return shipmentArry = ship;
        // }, error => {
        //     res.json(error);
        // });
    }

    function get_purchaseorders(){
             return new Promise((resolve) => { 
                PurchaseOrder.findAll().then((purch) => {
                  resolve(purch);
                 }, error => {
                    res.json(error);
                 });
        })
    }


    apiRoutes.post('/getAllepodData', function(req, res) {
        console.log("sumfulful ",req.body);
        let  where = { cancellation_indicator: {[Op.or]: ['', 'Constant'] } }
        const limit = 10;
        var tab = req.body.tab;
        let offset = limit * (req.body.limitpage - 1);
        if(tab == 'allShipments'){
         Shipment.findAndCountAll({where: where,offset:offset,limit:limit }).then(items => {
            res.send(items);
        }, error => {
            res.send(error);
        });
       }

        else if(tab == 'allInvoices'){
          Invoice.findAndCountAll({where: where,offset:offset,limit:limit }).then(items => {
            res.send(items);
        }, error => {
            res.send(error);
        });
        }

        else if(tab == 'allPos'){
         PurchaseOrder.findAndCountAll({where: where,offset:offset,limit:limit }).then(items => {
            res.send(items);
        }, error => {
            res.send(error);
        });   
        }

    })

    //    apiRoutes.post('/getshipment', function(req, res) {
    //     console.log("getshipment ",req.body);

    //     const limit = 2;
    //     var tab = req.body.tab;
    //     let offset = limit * (req.body.value - 1);
        
    //     Shipment.findAndCountAll({offset:offset,limit:limit }).then(items => {
    //         res.send(items);
    //     }, error => {
    //         res.send(error);
    //     });

    // })

    //  apiRoutes.post('/getinvoice', function(req, res) {
    //     console.log("getinvoice ",req.body);

    //     const limit = 2;
    //     var tab = req.body.tab;
    //     let offset = limit * (req.body.value - 1);
        
    //     Invoice.findAndCountAll({offset:offset,limit:limit }).then(items => {
    //         res.send(items);
    //     }, error => {
    //         res.send(error);
    //     });

    // })

    //  apiRoutes.post('/getpos', function(req, res) {
    //     console.log("getpos ",req.body);

    //     const limit = 2;
    //     var tab = req.body.tab;
    //     let offset = limit * (req.body.value - 1);
        
    //     PurchaseOrder.findAndCountAll({offset:offset,limit:limit }).then(items => {
    //         res.send(items);
    //     }, error => {
    //         res.send(error);
    //     });

    // })


      apiRoutes.post('/searchedClickedItem', (req, res) => {
        const searchTerm = req.body.searchTerm;
        const clickedTab = req.body.tab;
        const filter = req.body.dateFilter;
        console.log("clickedTab  ",searchTerm);
        delete searchTerm.fromDate;
        delete searchTerm.toDate;
        // var where = {}
        if(clickedTab == 'allShipments'){
             // where = searchTerm;
        let where = {
            [Op.or]: [{
                lr_number: {
                    [Op.like]: '%' + searchTerm.lr_number + '%'
                },
            }, {
                shipment_number: {
                    [Op.like]: '%' + searchTerm.shipment_number + '%'
                },
            },
            {
                plant: {
                    [Op.like]: '%' + searchTerm.plant + '%'
                },
            }]
        }

        if (filter.fromDate != null && filter.toDate != null) {
            where.shipment_creation_date = {
                [Op.between]: [filter.fromDate, filter.toDate]
            }
        }

        Shipment.findAll({
            where: where
        }).then((resp1) => {
            console.log("resp==--  ", resp1);
            res.status(200).send({resps:resp1,tab:clickedTab});
        }, error => {
            res.send(error);
        });
     }

        if(clickedTab == 'allInvoices'){
             // where = searchTerm;
        let where = {
            [Op.or]: [{
                invoice_number: {
                    [Op.like]: '%' + searchTerm.invoice_number + '%'
                },
            }, {
                plant: {
                    [Op.like]: '%' + searchTerm.plant + '%'
                },
            }]
        }

        if (filter.fromDate != null && filter.toDate != null) {
            where.invoice_date = {
                [Op.between]: [filter.fromDate, filter.toDate]
            }
        }

        Invoice.findAll({
            where: where
        }).then((resp2) => {
            console.log("resp==--  ", resp2);
            res.status(200).send({resps:resp2,tab:clickedTab});
        }, error => {
            res.send(error);
        });
     }

       if(clickedTab == 'allPos'){
             // where = searchTerm;
        let where = {
            [Op.or]: [{
                purchase_order_number: {
                    [Op.like]: '%' + searchTerm.purchase_order_number + '%'
                },
            }, {
                plant: {
                    [Op.like]: '%' + searchTerm.plant + '%'
                },
            }]
        }

        if (filter.fromDate != null && filter.toDate != null) {
            where.purchase_order_date = {
                [Op.between]: [filter.fromDate, filter.toDate]
            }
        }

        PurchaseOrder.findAll({
            where: where
        }).then((resp3) => {
            console.log("resp==--  ", resp3);
            res.status(200).send({resps:resp3,tab:clickedTab});
        }, error => {
            res.send(error);
        });
     }
       
    })

       apiRoutes.post('/getPlants', (req, res) => { 
         Plant.findAll().then((resp5) => {
       res.json(resp5);
        }, error => {
            res.json(error);
        });

    })

         apiRoutes.post('/getPlantsTransporter', (req, res) => { 
         var trnspcode = req.body.tcode;
        
            console.log("resp==--  ", trnspcode);
        TransporterPlant.findAll({where:{transporter_code:trnspcode}}).then((resp4) => {
  
               res.json(resp4);         
       }, error => {
            res.json(error);
        })
          
    })

         apiRoutes.post('/getCustomerInvoices', (req, res) => { 
         var phoneNumber = req.body.phoneNumber;
        
		
        let where = {
            [Op.and]: [{
				
                [Op.or]: [{
                    destination_location: {
					[Op.ne]: null
					}
                }, {
                    signed_lr_image: {
					[Op.ne]: null
					}
                }]

            }, {
                [Op.or]: [{
                    soldtoparty_mobileno: phoneNumber
                }, {
                    shiptoparty_mobileno: phoneNumber
                }]
            }, {
                customer_accepted: {
					[Op.or]: [null,0]
					}
            }]
        }		
//signed_lr_image
        Invoice.findAll({where: where}).then((resp) => {
               res.json(resp);         
       }, error => {
            res.json(error);
        })
          
    })

    apiRoutes.post('/transporterUpload', (req, res) => {   /*only for upload transporter*/
        const data = req.body.transporter;
        console.log("data  ==>>",data.length);
        Transporter.bulkCreate(data).then(() => {
            res.status(200).send('Transporter uploaded');
        }, error => {
            res.send(error);
        });

    })

    app.use('/', apiRoutes);
};
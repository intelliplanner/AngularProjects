module.exports = (sequelize, Sequelize) => {
    const Shipment = sequelize.define('shipment', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        vehicle_no: {
            type: Sequelize.STRING
        },
        shipment_number: {
            type: Sequelize.STRING
        },
        vehicle_capacity: {
            type: Sequelize.STRING
        },
        shipment_status: {
            type: Sequelize.STRING
        },
        shipment_assignment_datetime: {
            type: Sequelize.STRING
        },
         shipment_cost: {
            type: Sequelize.STRING
        },
        shipment_assigning_user: {
            type: Sequelize.STRING
        },
        shipment_quantity: {
            type: Sequelize.STRING
        },
        transporter_code: {
            type: Sequelize.STRING
        },
        transporter_name: {
            type: Sequelize.STRING
        },
        plant: {
            type: Sequelize.STRING
        },
        tro_no: {
            type: Sequelize.STRING
        },
        load_type_bulk_bag: {
            type: Sequelize.STRING
        },
        truck_capacity: {
            type: Sequelize.STRING
        },
        truckyard_entry_datetime: {
            type: Sequelize.STRING
        },
        vehicle_classification_Market_Own: {
            type: Sequelize.STRING
        }, 
        lr_number: {
            type: Sequelize.STRING
        }, 
        salesoffice_name: {
            type: Sequelize.STRING
        }, 
        destination_name: {
            type: Sequelize.STRING
        }, 
        destination_code: {
            type: Sequelize.STRING
        }, 
        zone_name: {
            type: Sequelize.STRING
        }, 
        concerned_sales_officer_name: {
            type: Sequelize.STRING
        }, 
        concerned_sales_officer_phoneno: {
            type: Sequelize.STRING
        }, 
        driver_name: {
            type: Sequelize.STRING
        }, 
        driver_phoneno: {
            type: Sequelize.STRING
        }, 
        driver_using_smartphone_sim: {
            type: Sequelize.STRING
        }
          
          
    });

    return Shipment;
}
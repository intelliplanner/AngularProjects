module.exports = (sequelize, Sequelize) => {
    const Shipment = sequelize.define('shipment', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        shipment_number: {
            type: Sequelize.STRING
        },
        plant: {
            type: Sequelize.STRING
        },
        shipment_status: {
            type: Sequelize.STRING
        },
        shipment_creation_date: {
            type: Sequelize.DATE
        },
        shipment_creation_time: {
            type: Sequelize.TIME
        },
        shipment_assigning_user: {
            type: Sequelize.STRING
        },
        shipment_quantity: {
            type: Sequelize.STRING
        }, 
        vehicle_no: {
            type: Sequelize.STRING
        },
        tro_no: {
            type: Sequelize.STRING
        },
        load_type: {
            type: Sequelize.STRING
        },
        truck_capacity: {
            type: Sequelize.STRING
        },
        vehicle_classification_market_own: {
            type: Sequelize.STRING
        }, 
        lr_number: {
            type: Sequelize.STRING
        },
        flag: {
            type: Sequelize.STRING
        },
        salesoffice_name: {
            type: Sequelize.STRING
        }, 
        destination_name1: {
            type: Sequelize.STRING
        },
        destination_name2: {
            type: Sequelize.STRING
        },
        destination_name3: {
            type: Sequelize.STRING
        },
        destination_name4: {
            type: Sequelize.STRING
        }, 
        destination_name5: {
            type: Sequelize.STRING
        },
        transporter_code: {
            type: Sequelize.STRING
        },
        transporter_name: {
            type: Sequelize.STRING
        },
        driver_name: {
            type: Sequelize.STRING
        }, 
        driver_phoneno: {
            type: Sequelize.STRING
        }, 
        driver_using_smartphone_or_sim_plant: {
            type: Sequelize.STRING
        },
        sto: {
            type: Sequelize.STRING
        },
        do_number1: {
            type: Sequelize.STRING
        },
        do_number2: {
            type: Sequelize.STRING
        },
        do_number3: {
            type: Sequelize.STRING
        },
        do_number4: {
            type: Sequelize.STRING
        },
        do_number5: {
            type: Sequelize.STRING
        },
        ship_to_party1: {
            type: Sequelize.STRING
        },
        ship_to_party2: {
            type: Sequelize.STRING
        },
        ship_to_party3: {
            type: Sequelize.STRING
        },
        ship_to_party4: {
            type: Sequelize.STRING
        },
        ship_to_party5: {
            type: Sequelize.STRING
        },
        do_distribution_channel: {
            type: Sequelize.STRING
        },
        shipment_cancellation_date: {
            type: Sequelize.DATE
        },
        shipment_cancellation_time: {
            type: Sequelize.TIME
        },
        cancellation_indicator: {
            type: Sequelize.STRING
        },
        new_driver_status: { 
            type: Sequelize.TINYINT
        },
        new_driverloc_timing: { 
            type: Sequelize.DATE
        },
        shipment_cancellation_datetime: {
            type: Sequelize.DATE
        },
        dist_channel1: {
            type: Sequelize.STRING
        },
        dist_channel2: {
            type: Sequelize.STRING
        },
        dist_channel3: {
            type: Sequelize.STRING
        },
        dist_channel4: {
            type: Sequelize.STRING
        },
        dist_channel5: {
            type: Sequelize.STRING
        },
        signed_lr_image: {
            type: Sequelize.STRING
        },
        second_driver_name: {
            type: Sequelize.STRING
        }, 
        second_driver_phoneno: {
            type: Sequelize.STRING
        }, 
        second_driver_vehicle_no: {
            type: Sequelize.STRING
        }, 
        second_driver_tro_no: {
            type: Sequelize.STRING
        }, 
        second_driver_start_location: {
            type: Sequelize.STRING
        }, 
        second_driver_using_smartphone_or_sim: {
            type: Sequelize.STRING
        }, 
        plant_location: {
            type: Sequelize.STRING
        },
        destination_location: {
            type: Sequelize.STRING
        }, 
        first_driver_appstatus: {
            type: Sequelize.BOOLEAN,
			default: false
        }, 
        second_driver_appstatus: {
            type: Sequelize.BOOLEAN,
			default: false
        }, 
        shipment_assigning_user: {
            type: Sequelize.STRING
        },
        driver_consent_status: {
            type: Sequelize.STRING
        },
        middle_location: {
            type: Sequelize.STRING
        },
        customer_accepted: {
            type: Sequelize.INTEGER
        },
        customer_accepted_quantity: {
            type: Sequelize.INTEGER
        },
        customer_declined_reason: {
            type: Sequelize.STRING
        }
              
    });

    return Shipment;
}
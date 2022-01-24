module.exports = (sequelize, Sequelize) => {
    const InvoiceLog = sequelize.define('invoicelog', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        invoice_date: {
            type: Sequelize.DATE
        },
        invoice_time: {
            type: Sequelize.TIME
        },
        invoice_number: {
            type: Sequelize.STRING
        },
        invoice_quantity: {
            type: Sequelize.STRING
        },
        do_number: {
            type: Sequelize.STRING
        },
        plant: {
            type: Sequelize.STRING
        },
        destination_code: {
            type: Sequelize.STRING
        },
        destination_name: {
            type: Sequelize.STRING
        },
        destination_location: {
            type: Sequelize.STRING
        },
        shiptoparty_code: {
            type: Sequelize.STRING
        },
        shiptoparty_name: {
            type: Sequelize.STRING
        },
        shiptoparty_address: {      
            type: Sequelize.STRING
        },
        shiptoparty_address1: {      
            type: Sequelize.STRING
        },
        shiptoparty_address2: {      
            type: Sequelize.STRING
        },
        shiptoparty_mobileno: {       
            type: Sequelize.STRING
        },
        soldtoparty_name: {
            type: Sequelize.STRING
        },
        soldtoparty_mobileno: {      
            type: Sequelize.STRING
        },
        material_description: {
            type: Sequelize.STRING
        }, 
        inco_terms: {
            type: Sequelize.STRING
        },
        trade_nontrade: {
            type: Sequelize.STRING
        },
        salesofficer_name: {
            type: Sequelize.STRING
        },
        salesofficer_number: {
            type: Sequelize.STRING
        },
        salesofficer_location: {
            type: Sequelize.STRING
        },
        salesofficer_emailid: {
            type: Sequelize.STRING
        },
        customer_emailid: {
            type: Sequelize.STRING
        },
        shipment_number: {
            type: Sequelize.STRING
        },
        shipment_date: {
            type: Sequelize.DATE
        },
        lr_number: {
            type: Sequelize.STRING
        },
        signed_lr_image: {
            type: Sequelize.STRING
        },
        invoice_status: {
            type: Sequelize.STRING
        },
        customer_reply_status: {
            type: Sequelize.STRING
        },
        customer_accepted: {
            type: Sequelize.TINYINT
        },
        customer_declined_reason: {
            type: Sequelize.STRING
        },
        customer_accepted_quantity: {
            type: Sequelize.STRING
        },
        cancellation_indicator: {
            type: Sequelize.STRING
        },
        invoice_cancellation_date: {
            type: Sequelize.DATE
        },
        invoice_cancellation_time: {
            type: Sequelize.TIME
        },
        vehicle_capacity: {
            type: Sequelize.STRING
        },
        load_type_bulk_bag: {
            type: Sequelize.STRING
        },
        address1: {
            type: Sequelize.STRING
        },
        address2: {
            type: Sequelize.STRING
        },
        address3: {
            type: Sequelize.STRING
        },
        transporter_name: {
            type: Sequelize.STRING
        },
        transporter_code: {
            type: Sequelize.STRING
        },
        distance: {
            type: Sequelize.STRING
        },
        transporter_contact_number: {
            type: Sequelize.STRING
        },
        salesoffice: {
            type: Sequelize.STRING
        },
        depot_plant: {
            type: Sequelize.STRING
        },
        tro_number: {
            type: Sequelize.STRING
        },
        shipment_cancellation_datetime: {
            type: Sequelize.DATE
        },
        shipment_cost: {
            type: Sequelize.STRING
        },
        invoice_submit_status: {
            type: Sequelize.STRING
        },
        unit_no_of_bags_per_tons_per_kg: {
            type: Sequelize.STRING
        },

        customer_code: {
            type: Sequelize.STRING
        },
        customer_name: {
            type: Sequelize.STRING
        },
        customer_city: {
            type: Sequelize.STRING
        },
        customer_state: {
            type: Sequelize.STRING
        },
        intermediate_location: {
            type: Sequelize.STRING
        },
        driver_consent_status: {
            type: Sequelize.STRING
        },
        plant_driver_sms_rcvd_time: {
            type: Sequelize.DATE
        },
        dest_driver_loc_time: {
            type: Sequelize.DATE
        },
        dest_driver_reach_time: {
            type: Sequelize.DATE
        }
    });

    return InvoiceLog;
}

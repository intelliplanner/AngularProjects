module.exports = (sequelize, Sequelize) => {
    const PurchaseOrder = sequelize.define('purchaseorder', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        purchase_order_date: {
            type: Sequelize.DATE
        },
        purchase_order_number: {
            type: Sequelize.STRING
        },
        plant: {
            type: Sequelize.STRING
        },
        left_submit: {
            type: Sequelize.INTEGER
        },
        shipment_number: {
            type: Sequelize.STRING
        },
        shipment_cost_number: {
            type: Sequelize.STRING
        },
        shipment_cost: {
            type: Sequelize.STRING
        },
        invoice_number1: {
            type: Sequelize.STRING
        },
        invoice_number2: {
            type: Sequelize.STRING
        },
        invoice_number3: {
            type: Sequelize.STRING
        },
        invoice_number4: {
            type: Sequelize.STRING
        },
        invoice_number5: {
            type: Sequelize.STRING
        },
        transporter_name: {
            type: Sequelize.STRING
        },
        rate: {
            type: Sequelize.STRING
        },
        quantity: {
            type: Sequelize.STRING
        },
        purchase_order_create_datetime: {
            type: Sequelize.DATE
        },
        freight_details: {
            type: Sequelize.STRING
        },
        purchase_order_cancellation_date: {
            type: Sequelize.DATE
        },
        cancellation_indicator: {
            type: Sequelize.STRING
        }       
    });

    return PurchaseOrder;
}
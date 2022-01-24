module.exports = (sequelize, Sequelize) => {
    const TransporterInvoices = sequelize.define('transporterInvoices', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        transporter_code: {
            type: Sequelize.STRING
        },
        purchase_order_number: {
            type: Sequelize.STRING
        },
        shipment_number: {
            type: Sequelize.STRING
        },
        plant: {
            type: Sequelize.STRING
        },
        invoice_number: {
            type: Sequelize.STRING
        },
        invoice_html: {
            type: Sequelize.BLOB
        },
        transporter_invoice_number: {
            type: Sequelize.STRING
        },
        invoice_submit_date: {
            type: Sequelize.STRING
        },
        transporter_ID: {
            type: Sequelize.STRING
        }
    });

    return TransporterInvoices;
}
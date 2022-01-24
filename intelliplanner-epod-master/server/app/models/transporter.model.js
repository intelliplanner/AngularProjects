module.exports = (sequelize, Sequelize) => {
    const Transporter = sequelize.define('transporter', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.BOOLEAN
        },
        transporter_code: {
            type: Sequelize.STRING
        },
        street: {
            type: Sequelize.STRING
        },
        street_1: {
            type: Sequelize.STRING
        },
        street_2: {
            type: Sequelize.STRING
        },
        postal_code: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        district: {
            type: Sequelize.STRING
        },
        state: {
            type: Sequelize.STRING
        },
        gst_number: {
            type: Sequelize.STRING
        },
        pan_number: {
            type: Sequelize.STRING
        },
        check_gst: {
            type: Sequelize.STRING
        },
        igst: {
            type: Sequelize.FLOAT
        },
        cgst: {
            type: Sequelize.FLOAT
        },
        sgst: {
            type: Sequelize.FLOAT
        }
    });

    return Transporter;
}
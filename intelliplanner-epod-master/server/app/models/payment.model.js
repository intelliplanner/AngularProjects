module.exports = (sequelize, Sequelize) => {
    const Payment = sequelize.define('payment', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        paymentDate: {
            type: Sequelize.DATE
        },
        paymentRequested: {
            type: Sequelize.INTEGER
        },
        paymentMode: {
            type: Sequelize.STRING
        },
        referenceNumber: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        }
    });

    return Payment;
}
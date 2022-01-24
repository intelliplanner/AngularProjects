module.exports = (sequelize, Sequelize) => {
    const wsdlLog = sequelize.define('wsdlLog', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        received_at: {
            type: Sequelize.STRING
        },
        request_envelope: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.INTEGER
        },
        error: {
            type: Sequelize.STRING
        },
        response: {
            type: Sequelize.STRING
        },
        ip: {
            type: Sequelize.STRING
        }
    });

    return wsdlLog;
}
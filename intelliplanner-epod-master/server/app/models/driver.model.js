module.exports = (sequelize, Sequelize) => {
    const Driver = sequelize.define('driver', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        vehicle_number: {
            type: Sequelize.STRING
        },
        tracking_type: {
            type: Sequelize.STRING
        },
        active: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        sim_serial_number: {
            type: Sequelize.STRING
        },
        device_id: {
            type: Sequelize.STRING
        },
        transporter_code: {
            type: Sequelize.STRING
        },
        app_installed: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
    });

    return Driver;
}
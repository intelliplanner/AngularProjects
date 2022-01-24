module.exports = (sequelize, Sequelize) => {
    const TransporterPlant = sequelize.define('transporterPlant', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        transporter_ID: {
            type: Sequelize.STRING
        },
        plant_code: {
            type: Sequelize.STRING
        },
        plant_name: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        transporter_code: {
            type: Sequelize.STRING
        }
    });

    return TransporterPlant;
}
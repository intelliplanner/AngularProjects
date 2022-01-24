module.exports = (sequelize, Sequelize) => {
    const Plant = sequelize.define('plant', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        plant_code: {
            type: Sequelize.STRING,
            unique: true
        },
        plant_name: {
            type: Sequelize.STRING
        },
        company_name: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        gst_no: {
            type: Sequelize.STRING
        },
        pan_no: {
            type: Sequelize.STRING
        }
    });

    return Plant;
}
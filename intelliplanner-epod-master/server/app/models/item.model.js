module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define('item', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        deviceID: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        simNumber: {
            type: Sequelize.STRING
        },
        vendorName: {
            type: Sequelize.STRING
        },
        deviceType: {
            type: Sequelize.STRING
        },
        installDate: {
            type: Sequelize.DATE
        },
        purchaseDate: {
            type: Sequelize.DATE
        },
        returnDate: {
            type: Sequelize.DATE
        },
        returnReason: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        active: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });

    return Item;
}
module.exports = (sequelize, Sequelize) => {
    const Settings = sequelize.define('settings', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        smtp_server: {
            type: Sequelize.STRING
        },
        smtp_port: {
            type: Sequelize.INTEGER
        },
        smtp_username: {
            type: Sequelize.STRING
        },
        smtp_password: {
            type: Sequelize.STRING
        }
    });

    return Settings;
}
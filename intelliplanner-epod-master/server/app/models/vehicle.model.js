module.exports = (sequelize, Sequelize) => {
    const Vehicle = sequelize.define('vehicle', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    }, {
  // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,
  // your other configuration here
});

    return Vehicle;
}
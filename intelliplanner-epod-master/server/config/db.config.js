const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.settings = require('../app/models/settings.model.js')(sequelize, Sequelize);
db.driver = require('../app/models/driver.model.js')(sequelize, Sequelize);
db.transporter = require('../app/models/transporter.model.js')(sequelize, Sequelize);
db.vehicle = require('../app/models/vehicle.model.js')(sequelize, Sequelize);

db.invoice = require('../app/models/invoice.model.js')(sequelize, Sequelize);
db.invoicelog = require('../app/models/invoicelog.model.js')(sequelize, Sequelize);

db.shipment = require('../app/models/shipment.model.js')(sequelize, Sequelize);
db.shipmentlog = require('../app/models/shipmentlog.model.js')(sequelize, Sequelize);

db.purchaseorder = require('../app/models/purchaseorder.model.js')(sequelize, Sequelize);
db.purchaseorderlog = require('../app/models/purchaseorderlog.model.js')(sequelize, Sequelize);

db.admin = require('../app/models/admin.model.js')(sequelize, Sequelize);
db.plant = require('../app/models/plant.model.js')(sequelize, Sequelize);
db.transporterPlant = require('../app/models/transporterPlant.model.js')(sequelize, Sequelize);

db.transporterInvoices = require('../app/models/transporterInvoices.model.js')(sequelize, Sequelize);
db.wsdlLog = require('../app/models/wsdlservicelog.model.js')(sequelize, Sequelize);
// db.returnDevice.belongsTo(db.dealer);

db.invoice.belongsTo(db.driver);
// db.transporterPlant.belongsTo(db.transporter);
// db.invoice.belongsTo(db.transporter);
// db.invoice.belongsTo(db.transporter);

module.exports = db;
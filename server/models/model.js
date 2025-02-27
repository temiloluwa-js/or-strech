const dbConfig = require("../db.js");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.accounts = require("./accountModel.js")(sequelize, DataTypes);
db.users = require("./userModel.js")(sequelize, DataTypes);
db.tags = require("./tagModel.js")(sequelize, DataTypes);
db.events = require("./eventModel.js")(sequelize, DataTypes);
db.links = require("./linkModel.js")(sequelize, DataTypes);
module.exports = db;

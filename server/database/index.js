const { Sequelize, Model } = require("sequelize");
const { LogsConfiguration } = require("./logs");
const { UserConfiguration } = require("./user");
const { ProductConfiguration } = require("./product");
const { HistoryConfiguration } = require("./history");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
	// dialect: 'postgres',
	// protocol: 'postgres',
	// dialectOptions: {
	// 	ssl: {
	// 		// require: true,
	// 		sslmode: "require",
	// 		rejectUnauthorized: false,
	// 	},
	// },
	// logging: (...msg) => console.log(msg),
	// logging: console.log,
	logging: false,
});

class Logs extends Model {}
Logs.init(LogsConfiguration, {
	sequelize,
});

class User extends Model {}
User.init(UserConfiguration, {
	sequelize,
});

class Product extends Model {}
Product.init(ProductConfiguration, {
	sequelize,
});

class History extends Model {}
History.init(HistoryConfiguration, {
	sequelize,
});

User.belongsToMany(Product, {
	through: { model: History, unique: false },
});
Product.belongsToMany(User, {
	through: { model: History, unique: false },
});

User.hasMany(History);
History.belongsTo(User);
Product.hasMany(History);
History.belongsTo(Product);

const connection = async () => {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
		await sequelize.sync({ force: false, alter: false });
		console.log("Sync successful.");
	} catch (error) {
		console.error("Unable to connect to the database:", error.message);
	}
};

module.exports = { connection, Logs, User, History, Product };

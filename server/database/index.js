const { Sequelize, Model } = require("sequelize");
const { LogsConfiguration } = require("./logs");
const { UserConfiguration } = require("./user");
const { ProductConfiguration } = require("./product");
const { HistoryConfiguration } = require("./history");
const { ActivityConfiguration } = require("./activity");
const { ActivityHistoryConfiguration } = require("./activityHistory");

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

class Activity extends Model {}
Activity.init(ActivityConfiguration, {
	sequelize,
});

class ActivityHistory extends Model {}
ActivityHistory.init(ActivityHistoryConfiguration, {
	sequelize,
});

User.belongsToMany(Activity, {
	through: { model: ActivityHistory, unique: false },
});
Activity.belongsToMany(User, {
	through: { model: ActivityHistory, unique: false },
});

User.hasMany(ActivityHistory);
ActivityHistory.belongsTo(User);
Activity.hasMany(ActivityHistory);
ActivityHistory.belongsTo(Activity);

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

module.exports = {
	connection,
	Logs,
	User,
	Product,
	History,
	Activity,
	ActivityHistory,
};

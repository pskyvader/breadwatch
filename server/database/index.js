const { Sequelize, Model } = require("sequelize");
const { LogsConfiguration } = require("./logs");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
	// dialect: 'postgres',
	// protocol: 'postgres',
	dialectOptions: {
		ssl: {
			// require: true,
			sslmode: "require",
			rejectUnauthorized: false,
		},
	},
	// logging: (...msg) => console.log(msg),
	// logging: console.log,
	logging: false,
});

class Logs extends Model {}
Logs.init(LogsConfiguration, {
	// Other model options go here
	sequelize, // We need to pass the connection instance
	// modelName: "Logs", // We need to choose the model name
});

const connection = async () => {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
		// await sequelize.sync({ force: true });
		// console.log("Force Sync successful.");
		// sequelize.sync({ alter: true });
		sequelize.sync();
	} catch (error) {
		console.error("Unable to connect to the database:", error.message);
	}
};

module.exports = { connection, Logs };

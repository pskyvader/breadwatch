const { DataTypes } = require("sequelize");
const LogsConfiguration = {
	// Model attributes are defined here
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
		unique: true,
	},
	date: {
		type: DataTypes.DATEONLY,
		allowNull: false,
		defaultValue: DataTypes.NOW,
	},
	bread: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	cookie: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	cake: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
};
module.exports = { LogsConfiguration };

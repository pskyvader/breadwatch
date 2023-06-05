const { DataTypes } = require("sequelize");
const ActivityHistoryConfiguration = {
	// Model attributes are defined here
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
		unique: true,
	},
	date: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: DataTypes.NOW,
	},
};
module.exports = { ActivityHistoryConfiguration };

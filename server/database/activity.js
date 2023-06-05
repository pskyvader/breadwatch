const { DataTypes } = require("sequelize");
const ActivityConfiguration = {
	// Model attributes are defined here
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
		unique: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	calories: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	active: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
	},
};
module.exports = { ActivityConfiguration };

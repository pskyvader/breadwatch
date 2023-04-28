const { DataTypes } = require("sequelize");
const UserConfiguration = {
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
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	token: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	active: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	},
};
module.exports = { UserConfiguration };

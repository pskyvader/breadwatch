const { createUser } = require("./createUser");
const { getUser, getUserByPassword, getAllUsers } = require("./getUser");
const { hashPassword } = require("./hashPassword");
const { updateUser } = require("./updateUser");

module.exports = {
	createUser,
	getUser,
	getUserByPassword,
	getAllUsers,
	hashPassword,
	updateUser,
};

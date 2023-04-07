const { User } = require("../../database");
const bcrypt = require("bcrypt");

const getUser = (idUser = null, email = null) => {
	if (idUser === null && email === null) {
		return { error: true, message: "Missing required fields" };
	}
	const where = email !== null ? { email: email } : { id: idUser };

	return User.findOne({
		where: where,
	}).catch((err) => {
		return { error: true, message: "Get user error: " + err.message };
	});
};

const getUserByPassword = (email = null, password = null) => {
	if (email === null || password === null) {
		return { error: true, message: "Missing required fields" };
	}
	return User.findOne({
		where: { email: email },
	})
		.then((user) => {
			if (user === null) {
				return {
					error: true,
					message: "User not found or password does not match",
				};
			}
			return bcrypt.compare(password, user.password).then((res) => {
				if (res === true) {
					return user;
				}
				return {
					error: true,
					message: "User not found or password does not match",
				};
			});
		})
		.catch((err) => {
			return { error: true, message: "Get user error: " + err.message };
		});
};

const getAllUsers = (active = null) => {
	const where = active !== null ? { active: active } : {};

	return User.findAll({ where: where }).catch((err) => {
		return { error: true, message: "Get all users error: " + err.message };
	});
};

module.exports = {
	getUser,
	getUserByPassword,
	getAllUsers,
};

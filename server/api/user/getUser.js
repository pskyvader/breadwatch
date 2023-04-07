const { User } = require("../../database");

const getUser = (idUser = null, email = null) => {
	if (idUser === null && email === null) {
		return { error: true, message: "No querry available" };
	}
	const where = email !== null ? { email: email } : { id: idUser };

	return User.findOne({
		where: where,
	}).catch((err) => {
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
	getAllUsers,
};

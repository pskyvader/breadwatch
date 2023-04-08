const { User } = require("../../database");
const {
	validateId,
	validateEmail,
	validatePassword,
	validateActive,
	validateHashedPassword,
} = require("./validations");

const getUser = (idUser = null, email = null) => {
	if (idUser === null && email === null) {
		return { error: true, message: "Missing required fields" };
	}
	try {
		if (email) {
			validateEmail(email);
		}
		if (idUser) {
			validateId(idUser);
		}
	} catch (error) {
		return { error: true, message: error.message };
	}

	const where = email ? { email: email } : { id: idUser };

	return User.findOne({
		where: where,
	})
		.then((user) => {
			if (user === null) {
				return { error: true, message: "User not found" };
			}
			return user;
		})
		.catch((err) => {
			return { error: true, message: "Get user error: " + err.message };
		});
};

const getUserByPassword = (email = null, password = null) => {
	if (email === null || password === null) {
		return { error: true, message: "Missing required fields" };
	}

	try {
		validateEmail(email);
		validatePassword(password);
	} catch (error) {
		return { error: true, message: error.message };
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
			return validateHashedPassword(password, user.password).then(
				(response) => {
					if (response.error) {
						return response;
					}

					delete user.password;
					return user;
				}
			);
		})
		.catch((err) => {
			return { error: true, message: "Get user error: " + err.message };
		});
};

const getAllUsers = (active = null) => {
	if (active !== null) {
		try {
			validateActive(active);
		} catch (error) {
			return { error: true, message: error.message };
		}
	}
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

const { User } = require("../../database");
const { hashPassword } = require("./hashPassword");
const {
	validateName,
	validateEmail,
	validatePassword,
	validateActive,
} = require("./validations");

const createUser = (fields) => {
	try {
		validateName(fields.name);
		validateEmail(fields.email);
		validatePassword(fields.password);
		validateActive(fields.active);
	} catch (error) {
		return { error: true, message: error.message };
	}

	return hashPassword(fields.password)
		.then((hash) => {
			if (hash.error) {
				return hash;
			}
			return User.create({
				name: fields.name,
				email: fields.email,
				password: hash,
				active: fields.active,
			});
		})
		.catch((err) => {
			return {
				error: true,
				message: "Create user error: " + err.message,
			};
		});
};

module.exports = {
	createUser,
};

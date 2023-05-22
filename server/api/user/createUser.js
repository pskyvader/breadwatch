const { User } = require("../../database");
const { hashPassword } = require("./hashPassword");
const {
	validateName,
	validateEmail,
	validatePassword,
	validatePasswordMatch,
	validateActive,
} = require("./validations");

const validateFields = (fields) => {
	const validatedFields = {};
	validateName(fields.name);
	validatedFields.name = fields.name;
	validateEmail(fields.email);
	validatedFields.email = fields.email;
	validatePassword(fields.password);
	validatePasswordMatch(fields.password, fields.confirm_password);
	validatedFields.password = fields.password;
	validateActive(fields.active);
	validatedFields.active = fields.active;

	return validatedFields;
};

const createUser = (fields) => {
	try {
		const validatedFields = validateFields(fields);
		return hashPassword(validatedFields.password)
			.then((hash) => {
				if (hash.error) {
					return hash;
				}
				return User.create({
					...validatedFields,
					password: hash,
				});
			})
			.catch((err) => {
				return {
					error: true,
					message: "Create user error: " + err.message,
				};
			});
	} catch (error) {
		return {
			error: true,
			message: error.message,
		};
	}
};

module.exports = {
	createUser,
};

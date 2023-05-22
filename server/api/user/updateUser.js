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
	if (fields.name !== undefined) {
		validateName(fields.name);
		validatedFields.name = fields.name;
	}
	if (fields.email !== undefined) {
		validateEmail(fields.email);
		validatedFields.email = fields.email;
	}
	if (fields.password !== undefined) {
		validatePassword(fields.password);
		validatePasswordMatch(fields.password, fields.confirm_password);
		validatedFields.password = fields.password;
	}
	if (fields.active !== undefined) {
		validateActive(fields.active);
		validatedFields.active = fields.active;
	}

	return validatedFields;
};

const updateUser = async (user, fields) => {
	try {
		const updateFields = validateFields(fields);
		if (!user || Object.keys(updateFields).length === 0) {
			return { error: true, message: "Missing required fields" };
		}

		if (updateFields.password) {
			const hashedPassword = await hashPassword(updateFields.password);
			if (hashedPassword.error) {
				return hashedPassword;
			}
			updateFields.password = hashedPassword;
		}

		return user.update(updateFields).catch((err) => {
			return {
				error: true,
				message: "Update user error: " + err.message,
			};
		});
	} catch (error) {
		return { error: true, message: error.message };
	}
};

module.exports = {
	updateUser,
};

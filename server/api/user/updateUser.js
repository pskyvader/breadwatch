const { hashPassword } = require("./hashPassword");
const {
	validateName,
	validateEmail,
	validatePassword,
	validateActive,
} = require("./validations");

const updateUser = async (user, fields) => {
	if (
		!user ||
		(!fields.name &&
			!fields.email &&
			!fields.password &&
			fields.active === undefined)
	) {
		return { error: true, message: "Missing required fields" };
	}

	try {
		validateName(fields.name);
		validateEmail(fields.email);
		validatePassword(fields.password);
		validateActive(fields.active);
	} catch (error) {
		return { error: true, message: error.message };
	}

	const updateFields = {};
	if (fields.name) {
		updateFields.name = fields.name;
	}
	if (fields.email) {
		updateFields.email = fields.email;
	}
	if (fields.password) {
		const hashedPassword = await hashPassword(fields.password);
		if (hashedPassword.error) {
			return hashedPassword;
		}
		updateFields.password = hashedPassword;
	}
	if (fields.active !== undefined) {
		updateFields.active = fields.active;
	}

	return user.update(updateFields).catch((err) => {
		return {
			error: true,
			message: "Update user error: " + err.message,
		};
	});
};

module.exports = {
	updateUser,
};

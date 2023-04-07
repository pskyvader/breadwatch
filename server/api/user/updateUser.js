const { hashPassword } = require("./hashPassword");

const updateUser = async (user, fields) => {
	if (
		!user ||
		(!fields.name && !fields.email && !fields.password && !fields.active)
	) {
		return { error: true, message: "Missing required fields" };
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
	if (fields.active) {
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

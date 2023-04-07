const { User } = require("../../database");
const { hashPassword } = require("./hashPassword");

const createUser = (fields) => {
	if (!fields.name || !fields.email || !fields.password || !fields.active) {
		return { error: true, message: "Missing required fields" };
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

const bcrypt = require("bcrypt");

const hashPassword = (password) => {
	const saltRounds = 10;
	return bcrypt
		.hash(password, saltRounds)
		.then((hash) => hash)
		.catch((err) => {
			return {
				error: true,
				message: "Create user error: " + err.message,
			};
		});
};

module.exports = { hashPassword };

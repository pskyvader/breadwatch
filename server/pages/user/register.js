const { createUser, getUser } = require("../../api/user");
const { validateEmail } = require("../../api/user/validations");

const register = (req) => {
	const name = req.body.name;
	const email = req.body.email;
	const password = req.body.password;
	const confirm_password = req.body.confirm_password;
	const active = true;
	const fields = { name, email, password, confirm_password, active };
	try {
		validateEmail(email);
	} catch (error) {
		return { error: true, message: error.message };
	}

	return getUser(null, email).then((existingUser) => {
		if (!existingUser.error) {
			return { error: true, message: "User Already exists" };
		}

		return createUser(fields).then((user) => {
			if (!user.error) {
				req.session.loggedin = true;
				req.session.token = user.token;
			}
			return user;
		});
	});
};

module.exports = { register };

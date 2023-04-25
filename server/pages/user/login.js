const { getUserByPassword } = require("../../api/user");
const login = (req) => {
	const email = req.body.email;
	const password = req.body.password;
	return getUserByPassword(email, password).then((user) => {
		if (!user.error) {
			req.session.loggedin = true;
			req.session.token = user.token;
		}
		return user;
	});
};

module.exports = { login };

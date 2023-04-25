const { getUserByToken } = require("../../api/user");
const loginCookie = (req) => {
	const token = req.cookies.token;
	return getUserByToken(token).then((user) => {
		if (!user.error) {
			req.session.loggedin = true;
			req.session.token = user.token;
		}
		return user;
	});
};

module.exports = { loginCookie };

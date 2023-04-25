const logout = (req, res) => {
	req.session.loggedin = false;
	req.session.token = null;
	res.clearCookie("token");
	return { error: false, message: "User logged out successfully" };
};

module.exports = { logout };

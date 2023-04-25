const { logout } = require("../logout");

describe("logout", () => {
	it("clears session properties and removes token cookie", () => {
		const req = { session: { loggedin: true, token: "abc123" } };
		const res = { clearCookie: jest.fn() };
		const result = logout(req, res);
		expect(req.session.loggedin).toBe(false);
		expect(req.session.token).toBeNull();
		expect(res.clearCookie).toHaveBeenCalledWith("token");
		expect(result).toEqual({
			error: false,
			message: "User logged out successfully",
		});
	});
});

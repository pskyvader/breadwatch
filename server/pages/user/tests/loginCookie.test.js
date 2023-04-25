// Import the necessary modules and functions
const { loginCookie } = require("../loginCookie");
const { getUserByToken } = require("../../../api/user");

// Mock the getUserByToken function to return a sample user object
jest.mock("../../../api/user", () => ({
	getUserByToken: jest.fn(() =>
		Promise.resolve({
			username: "testuser",
			token: "abc123",
		})
	),
}));

describe("loginCookie", () => {
	it("sets session properties when a valid token is provided", async () => {
		const req = { cookies: { token: "valid_token" }, session: {} };
		const user = await loginCookie(req);
		expect(getUserByToken).toHaveBeenCalledWith("valid_token");
		expect(req.session.loggedin).toBe(true);
		expect(req.session.token).toBe("abc123");
		expect(user).toEqual({ username: "testuser", token: "abc123" });
	});

	it("returns an error object when an invalid token is provided", async () => {
		const req = { cookies: { token: "invalid_token" }, session: {} };
		getUserByToken.mockResolvedValueOnce({ error: "Invalid token" });
		const user = await loginCookie(req);
		expect(getUserByToken).toHaveBeenCalledWith("invalid_token");
		expect(req.session.loggedin).toBeUndefined();
		expect(req.session.token).toBeUndefined();
		expect(user).toEqual({ error: "Invalid token" });
	});
});

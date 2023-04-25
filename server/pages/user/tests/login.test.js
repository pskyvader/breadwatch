const { login } = require("../login");
const { getUserByPassword } = require("../../../api/user");

jest.mock("../../../api/user", () => {
	return {
		getUserByPassword: jest.fn(),
	};
});

test("login with correct credentials should log in user and return user object with token", async () => {
	const req = {
		body: { email: "test@test.com", password: "password" },
		session: {},
	};
	const user = { token: "1234567890" };
	getUserByPassword.mockResolvedValue(user);

	await login(req);

	expect(getUserByPassword).toHaveBeenCalledWith(
		req.body.email,
		req.body.password
	);
	expect(req.session.loggedin).toBe(true);
	expect(req.session.token).toBe(user.token);
});

test("login with incorrect credentials should return error", async () => {
	const req = {
		body: { email: "test@test.com", password: "password" },
		session: {},
	};
	const error = { error: "Incorrect email or password" };
	getUserByPassword.mockResolvedValue(error);

	const result = await login(req);

	expect(getUserByPassword).toHaveBeenCalledWith(
		req.body.email,
		req.body.password
	);
	expect(req.session.loggedin).toBeUndefined();
	expect(req.session.token).toBeUndefined();
	expect(result).toBe(error);
});

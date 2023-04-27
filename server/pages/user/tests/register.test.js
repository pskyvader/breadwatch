const { register } = require("../register");
const { getUser, createUser } = require("../../../api/user");

// Mock the createUser function globally
jest.mock("../../../api/user", () => ({
	getUser: jest.fn(),
	createUser: jest.fn(() =>
		Promise.resolve({
			name: "John Doe",
			email: "johndoe@example.com",
			token: "token",
			active: true,
		})
	),
}));

describe("register function", () => {
	beforeEach(() => {
		// Reset the createUser mock before each test
		createUser.mockReset();
		getUser.mockReset();
	});

	it("should return an error if the email is invalid", async () => {
		const req = {
			body: {
				name: "John Doe",
				email: "johndoe.com",
				password: "password",
				confirm_password: "password",
			},
		};
		const result = await register(req);
		expect(result).toEqual({
			error: true,
			message: "Invalid email",
		});
	});

	it("should return an error if the email already exists", async () => {
		getUser.mockResolvedValueOnce({
			name: "Jane Doe",
			email: "johndoe@example.com",
			token: "token",
			active: true,
		});
		const req = {
			body: {
				name: "John Doe",
				email: "johndoe@example.com",
				password: "password",
				confirm_password: "password",
			},
		};

		const result = await register(req);
		expect(getUser).toHaveBeenCalledWith(null, "johndoe@example.com");
		expect(result).toEqual({ error: true, message: "User Already exists" });
	});

	it("should register a new user with a generated token", async () => {
		// Mock the createUser function to return a user object with a generated token
		// getUser.mockResolvedValueOnce(null);
		const req = {
			body: {
				name: "John Doe",
				email: "johndoe@example.com",
				password: "password",
				confirm_password: "password",
			},
			session: {},
		};

		const user = await register(req);
		console.log(user);

		// Check that the returned user object has the correct properties
		expect(user.name).toEqual("John Doe");
		expect(user.email).toEqual("johndoe@example.com");
		expect(user.active).toBeTruthy();

		// Check that the session variables are set correctly
		expect(req.session.loggedin).toBeTruthy();
		expect(req.session.token).toEqual("generated_token");

		// Check that the createUser function was called with the correct arguments
		expect(createUser).toHaveBeenCalledWith({
			name: "John Doe",
			email: "johndoe@example.com",
			password: "password",
			confirm_password: "password",
			active: true,
		});
	});

	it("should return an error if the password and confirm_password do not match", async () => {
		const req = {
			body: {
				name: "John Doe",
				email: "johndoe@example.com",
				password: "password",
				confirm_password: "different_password",
			},
			session: {},
		};
		const error = { error: true, message: "Incorrect email or password" };
		createUser.mockResolvedValue(error);

		const user = await register(req);

		// Check that the returned user object has an error property
		expect(user.error).toBeDefined();

		// Check that the createUser function was called
		expect(createUser).toHaveBeenCalled();
	});

	it("should return an error if createUser function returns an error", async () => {
		// Mock the createUser function to return an error object
		createUser.mockResolvedValueOnce({
			error: "Something went wrong",
		});

		const req = {
			body: {
				name: "John Doe",
				email: "johndoe@example.com",
				password: "password",
				confirm_password: "password",
			},
			session: {},
		};

		const user = await register(req);

		// Check that the returned user object has an error property
		expect(user.error).toBeDefined();

		// Check that the session variables are not set
		expect(req.session.loggedin).toBeFalsy();
		expect(req.session.token).toBeUndefined();

		// Check that the createUser function was called with the correct arguments
		expect(createUser).toHaveBeenCalledWith({
			name: "John Doe",
			email: "johndoe@example.com",
			password: "password",
			confirm_password: "password",
			active: true,
		});
	});
});

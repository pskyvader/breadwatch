const { createUser } = require("../createUser");
const { User } = require("../../../database");
const { hashPassword } = require("../hashPassword");

jest.mock("../../../database", () => ({
	User: {
		create: jest.fn(),
	},
}));

jest.mock("../hashPassword", () => ({
	hashPassword: jest.fn((password) => {
		if (password === "validpassword") {
			return Promise.resolve("hashedpassword");
		} else {
			return Promise.reject(new Error("Invalid password"));
		}
	}),
}));
describe("createUser function", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("should create a user with valid data and return hashed password", async () => {
		const mockFields = {
			name: "John Doe",
			email: "johndoe@example.com",
			password: "validpassword",
			confirm_password: "validpassword",
			active: true,
		};
		const mockHashedPassword = "hashedpassword";

		hashPassword.mockResolvedValueOnce(mockHashedPassword);

		const expectedUserData = {
			name: mockFields.name,
			email: mockFields.email,
			password: mockHashedPassword,
			active: mockFields.active,
		};

		User.create.mockResolvedValueOnce(expectedUserData);

		const result = await createUser(mockFields);

		expect(hashPassword).toHaveBeenCalledWith(mockFields.password);
		expect(User.create).toHaveBeenCalledWith(expectedUserData);
		expect(result).toEqual(expectedUserData);
	});

	test("should return an error if an error occurs while hashing the password", async () => {
		const mockFields = {
			name: "John Doe",
			email: "johndoe@example.com",
			password: "invalidpassword",
			confirm_password: "invalidpassword",
			active: true,
		};
		const mockHashError = new Error("Invalid password");

		hashPassword.mockRejectedValueOnce(mockHashError);

		const result = await createUser(mockFields);

		expect(hashPassword).toHaveBeenCalledWith(mockFields.password);
		expect(User.create).not.toHaveBeenCalled();
		expect(result).toEqual({
			error: true,
			message: "Create user error: " + mockHashError.message,
		});
	});

	test("should return an error if an error occurs while creating the user", async () => {
		const mockFields = {
			name: "John Doe",
			email: "johndoe@example.com",
			password: "validpassword",
			confirm_password: "validpassword",
			active: true,
		};
		const mockCreateError = new Error("Error creating user");

		hashPassword.mockResolvedValueOnce("hashedpassword");
		User.create.mockRejectedValueOnce(mockCreateError);

		const result = await createUser(mockFields);

		expect(hashPassword).toHaveBeenCalledWith(mockFields.password);
		expect(User.create).toHaveBeenCalledWith({
			name: mockFields.name,
			email: mockFields.email,
			password: "hashedpassword",
			active: mockFields.active,
		});
		expect(result).toEqual({
			error: true,
			message: "Create user error: " + mockCreateError.message,
		});
	});
});

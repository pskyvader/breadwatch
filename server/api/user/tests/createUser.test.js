require("dotenv").config();
const { User } = require("../../../database");
const { createUser } = require("../createUser");
const { hashPassword } = require("../hashPassword");
const {
	validateName,
	validateEmail,
	validatePassword,
	validateActive,
} = require("../validations");

jest.mock("../hashPassword");
jest.mock("../../../database", () => ({
	User: {
		create: jest.fn(),
	},
}));

describe("createUser function", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should return error when missing required fields", async () => {
		const fields = {
			name: "John Doe",
			email: "johndoe@example.com",
			password: "password123",
		};

		const result = await createUser(fields);

		expect(result).toEqual({
			error: true,
			message: "Invalid active value",
		});
		expect(hashPassword).not.toHaveBeenCalled();
		expect(User.create).not.toHaveBeenCalled();
	});

	test("should return an error message when a validation fails", async () => {
		const fields = {
			name: "John Doe",
			email: "johndoe@example.com",
			password: "12345",
			active: true,
		};
		const errorMsg = "Password must be at least 6 characters long";

		[validateName, validateEmail, validateActive].forEach((v) =>
			v.mockReturnValue()
		);
		validatePassword.mockImplementation(() => {
			throw new Error(errorMsg);
		});

		const result = await createUser(fields);

		expect(validateName).toHaveBeenCalledWith(fields.name);
		expect(validateEmail).toHaveBeenCalledWith(fields.email);
		expect(validatePassword).toHaveBeenCalledWith(fields.password);
		expect(validateActive).toHaveBeenCalledWith(fields.active);
		expect(hashPassword).not.toHaveBeenCalled();
		expect(User.create).not.toHaveBeenCalled();
		expect(result).toEqual({ error: true, message: errorMsg });
	});

	it("should create a new user with hashed password and return the user object", async () => {
		const fields = {
			name: "John Doe",
			email: "john.doe@example.com",
			password: "password",
			active: true,
		};
		const hashedPassword = "hashedPassword";
		hashPassword.mockResolvedValue(hashedPassword);
		User.create.mockResolvedValue({
			id: 1,
			...fields,
			password: hashedPassword,
		});
		const result = await createUser(fields);
		expect(hashPassword).toHaveBeenCalledWith(fields.password);
		expect(User.create).toHaveBeenCalledWith({
			name: fields.name,
			email: fields.email,
			password: hashedPassword,
			active: fields.active,
		});
		expect(result).toEqual({ id: 1, ...fields, password: hashedPassword });
	});

	it("should return an error message if creating the user fails", async () => {
		const fields = {
			name: "John Doe",
			email: "john.doe@example.com",
			password: "password",
			active: true,
		};
		const error = new Error("Create user failed");
		const hashedPassword = "hashedPassword";
		hashPassword.mockResolvedValue(hashedPassword);
		User.create.mockRejectedValue(error);
		const result = await createUser(fields);
		expect(hashPassword).toHaveBeenCalledWith(fields.password);
		expect(User.create).toHaveBeenCalledWith({
			name: fields.name,
			email: fields.email,
			password: hashedPassword,
			active: fields.active,
		});
		expect(result).toEqual({
			error: true,
			message: "Create user error: Create user failed",
		});
	});
});

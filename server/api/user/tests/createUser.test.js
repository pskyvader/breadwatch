require("dotenv").config();
const { User } = require("../../../database");
const { createUser } = require("../createUser");
const { hashPassword } = require("../hashPassword");

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

	it("should return an error message if required fields are missing", async () => {
		const fields = { name: "John Doe" };
		const result = await createUser(fields);
		expect(result).toEqual({
			error: true,
			message: "Missing required fields",
		});
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

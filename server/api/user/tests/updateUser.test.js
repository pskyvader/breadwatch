const { updateUser } = require("../updateUser");
const { hashPassword } = require("../hashPassword");

jest.mock("../hashPassword", () => ({
	hashPassword: jest.fn(),
}));

describe("updateUser function", () => {
	let user;
	let fields;

	beforeEach(() => {
		user = {
			update: jest.fn(),
		};
		fields = {
			name: "John Doe",
			email: "johndoe@example.com",
			password: "password123",
			confirm_password: "password123",
			active: true,
		};
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should return an error if user is missing or fields are missing", async () => {
		const result = await updateUser(null, {});
		expect(result).toEqual({
			error: true,
			message: "Missing required fields",
		});
	});

	test("returns an error for missing required fields", async () => {
		// Call updateUser with empty fields
		const result = await updateUser(user, {});

		// Check that an error is returned with the correct message
		expect(result).toEqual({
			error: true,
			message: "Missing required fields",
		});

		// Check that the update function was not called
		expect(user.update).not.toHaveBeenCalled();
	});

	test("returns an error for invalid fields", async () => {
		// Call updateUser with invalid fields
		const result = await updateUser(user, {
			name: "J",
			email: "invalid.email",
			password: "pass",
			active: "yes",
		});

		// Check that an error is returned with the correct message for each invalid field
		expect(result).toEqual({
			error: true,
			message: "Invalid name",
		});

		// Check that the update function was not called
		expect(user.update).not.toHaveBeenCalled();
	});

	it("should return an error if hashPassword fails", async () => {
		const error = { error: true, message: "hashPassword error" };
		hashPassword.mockResolvedValueOnce(error);

		const result = await updateUser(user, fields);
		expect(result).toEqual(error);
	});

	it("should update user with new fields and return the updated user", async () => {
		const updatedUser = {
			id: 1,
			name: fields.name,
			email: fields.email,
			password: "hashedPassword",
			active: fields.active,
		};

		hashPassword.mockResolvedValueOnce("hashedPassword");
		user.update.mockResolvedValueOnce(updatedUser);

		const result = await updateUser(user, fields);
		expect(hashPassword).toHaveBeenCalledWith(fields.password);
		expect(user.update).toHaveBeenCalledWith({
			name: fields.name,
			email: fields.email,
			password: "hashedPassword",
			active: fields.active,
		});
		expect(result).toEqual(updatedUser);
	});

	it("should return an error if user.update fails", async () => {
		const error = { error: true, message: "user.update error" };
		hashPassword.mockResolvedValueOnce("hashedPassword");
		user.update.mockRejectedValueOnce(error);

		const result = await updateUser(user, fields);
		expect(result).toEqual({
			error: true,
			message: "Update user error: user.update error",
		});
	});
});

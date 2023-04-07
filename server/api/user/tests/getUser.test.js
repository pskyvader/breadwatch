require("dotenv").config();
const { User } = require("../../../database");
const { getUser, getUserByPassword, getAllUsers } = require("../getUser");
const { hashPassword } = require("../hashPassword");

jest.mock("../../../database");

describe("getUser function", () => {
	test("should return an error if no id or email is provided", async () => {
		const result = await getUser();
		expect(result).toEqual({
			error: true,
			message: "Missing required fields",
		});
	});

	test("should return a user if id is provided", async () => {
		User.findOne.mockResolvedValueOnce({
			id: 1,
			email: "test@example.com",
		});
		const result = await getUser(1);
		expect(result.id).toEqual(1);
		expect(result.email).toEqual("test@example.com");
	});

	test("should return a user if email is provided", async () => {
		User.findOne.mockResolvedValueOnce({
			id: 1,
			email: "test@example.com",
		});
		const result = await getUser(null, "test@example.com");
		expect(result.id).toEqual(1);
		expect(result.email).toEqual("test@example.com");
	});

	test("should return an error if user not found", async () => {
		User.findOne.mockResolvedValueOnce(null);
		const result = await getUser(123456789);
		expect(result).toEqual({
			error: true,
			message: "User not found",
		});
	});
});

describe("getUserByPassword function", () => {
	test("missing fields", async () => {
		const result = await getUserByPassword();
		expect(result).toEqual({
			error: true,
			message: "Missing required fields",
		});
	});

	test("user not found", async () => {
		User.findOne.mockResolvedValueOnce(null);
		const result = await getUserByPassword(
			"test@example.com",
			"password123"
		);
		expect(result).toEqual({
			error: true,
			message: "User not found or password does not match",
		});
	});

	test("incorrect password", async () => {
		User.findOne.mockResolvedValueOnce({
			id: 1,
			email: "test@example.com",
			password:
				"$2b$10$WcYrvb7P5o5FvS8ol5CKeeuwGe4tHEaK4Qv4fX4WnQZoJzDfo.J1q",
		});
		const result = await getUserByPassword(
			"test@example.com",
			"wrongpassword"
		);
		expect(result).toEqual({
			error: true,
			message: "User not found or password does not match",
		});
	});

	test("correct email and password", async () => {
		const password = "password";
		const hashedPassword = await hashPassword(password);
		User.findOne.mockResolvedValueOnce({
			id: 1,
			name: "Alice",
			email: "alice@example.com",
			password: hashedPassword,
		});
		const result = await getUserByPassword("alice@example.com", password);
		expect(result.id).toEqual(1);
		expect(result.name).toEqual("Alice");
		expect(result.email).toEqual("alice@example.com");
		expect(result.password).toBeUndefined();
	});

	test("database error", async () => {
		const errorMsg = "Database error";
		User.findOne.mockRejectedValueOnce(new Error(errorMsg));
		const result = await getUserByPassword("alice@example.com", "password");
		expect(result).toEqual({
			error: true,
			message: "Get user error: " + errorMsg,
		});
	});
});

describe("getAllUsers function", () => {
	test("no active parameter", async () => {
		User.findAll.mockResolvedValueOnce([
			{ id: 1, name: "Alice", email: "alice@example.com", active: true },
			{ id: 2, name: "Bob", email: "bob@example.com", active: false },
			{
				id: 3,
				name: "Charlie",
				email: "charlie@example.com",
				active: true,
			},
		]);
		const result = await getAllUsers();
		expect(result).toHaveLength(3);
		expect(result[0].name).toEqual("Alice");
		expect(result[1].email).toEqual("bob@example.com");
		expect(result[2].active).toEqual(true);
	});

	test("active parameter is true", async () => {
		User.findAll.mockResolvedValueOnce([
			{ id: 1, name: "Alice", email: "alice@example.com", active: true },
			{
				id: 3,
				name: "Charlie",
				email: "charlie@example.com",
				active: true,
			},
		]);
		const result = await getAllUsers(true);
		expect(result).toHaveLength(2);
		expect(result[0].name).toEqual("Alice");
		expect(result[1].email).toEqual("charlie@example.com");
	});

	test("active parameter is false", async () => {
		User.findAll.mockResolvedValueOnce([
			{ id: 2, name: "Bob", email: "bob@example.com", active: false },
		]);
		const result = await getAllUsers(false);
		expect(result).toHaveLength(1);
		expect(result[0].name).toEqual("Bob");
		expect(result[0].active).toEqual(false);
	});

	test("database error", async () => {
		const errorMsg = "Database error";
		User.findAll.mockRejectedValueOnce(new Error(errorMsg));
		const result = await getAllUsers();
		expect(result).toEqual({
			error: true,
			message: "Get all users error: " + errorMsg,
		});
	});
});

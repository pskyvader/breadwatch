const { getUser } = require("../getUser");
const { User } = require("../../../database");

jest.mock("../../../database", () => {
	return {
		User: {
			findOne: jest.fn(),
			findAll: jest.fn(),
		},
	};
});

describe("getUser", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("should return an error message when no user ID or email is provided", async () => {
		const result = await getUser();
		expect(result.error).toBe(true);
		expect(result.message).toBe("Missing required fields");
	});

	test("should return an error message when an invalid user ID is provided", async () => {
		const result = await getUser("invalid_id");
		expect(result.error).toBe(true);
		expect(result.message).toBe("Invalid user ID");
	});

	test("should return an error message when an invalid email is provided", async () => {
		const result = await getUser(null, "invalid_email");
		expect(result.error).toBe(true);
		expect(result.message).toBe("Invalid email");
	});

	test("should return an error message when user is not found", async () => {
		User.findOne.mockResolvedValueOnce(null); // mock the database function to return null
		const result = await getUser(1);
		expect(result.error).toBe(true);
		expect(result.message).toBe("User not found");
	});

	test("should return the user when valid ID is provided", async () => {
		const mockUser = {
			id: 1,
			name: "John Doe",
			email: "johndoe@example.com",
		};
		User.findOne.mockResolvedValueOnce(mockUser); // mock the database function to return a user object
		const result = await getUser(1);

		expect(result.error).toBeUndefined();
		expect(result).toEqual(mockUser);
	});

	test("should return the user when valid email is provided", async () => {
		const mockUser = {
			id: 1,
			name: "John Doe",
			email: "johndoe@example.com",
		};
		User.findOne.mockResolvedValueOnce(mockUser); // mock the database function to return a user object
		const result = await getUser(null, "johndoe@example.com");
		expect(result.error).toBeUndefined();
		expect(result).toEqual(mockUser);
	});
});

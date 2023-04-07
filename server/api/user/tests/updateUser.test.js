const { updateUser } = require("../updateUser");
describe("updateUser", () => {
	const user = {
		id: 1,
		name: "John Doe",
		email: "john.doe@example.com",
		password: "password",
		active: true,
		update: jest.fn().mockImplementation((fields) => {
			return Promise.resolve({
				...user,
				...fields,
			});
		}),
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	test("returns error if no user is provided", async () => {
		const result = await updateUser(null, { name: "New Name" });
		expect(result).toEqual({
			error: true,
			message: "Missing required fields",
		});
	});

	test("returns error if no update fields are provided", async () => {
		const result = await updateUser(user, {});
		expect(result).toEqual({
			error: true,
			message: "Missing required fields",
		});
	});

	test("updates user name", async () => {
		const result = await updateUser(user, { name: "New Name" });
		expect(result).toEqual({
			id: 1,
			name: "New Name",
			email: "john.doe@example.com",
			password: "password",
			active: true,
			update: expect.any(Function),
		});
	});

	test("updates user email", async () => {
		const result = await updateUser(user, {
			email: "new.email@example.com",
		});
		expect(result).toEqual({
			id: 1,
			name: "John Doe",
			email: "new.email@example.com",
			password: "password",
			active: true,
			update: expect.any(Function),
		});
	});

	test("updates user password", async () => {
		const result = await updateUser(user, { password: "newpassword" });
		expect(result).toEqual({
			id: 1,
			name: "John Doe",
			email: "john.doe@example.com",
			password: expect.any(String),
			active: true,
			update: expect.any(Function),
		});
	});

	test("updates user active status", async () => {
		const result = await updateUser(user, { active: false });
		expect(result).toEqual({
			id: 1,
			name: "John Doe",
			email: "john.doe@example.com",
			password: "password",
			active: false,
			update: expect.any(Function),
		});
	});

	test("returns error if update fails", async () => {
		user.update = jest.fn().mockImplementation(() => {
			return Promise.reject(new Error("Update error"));
		});
		const result = await updateUser(user, { name: "New Name" });
		expect(result).toEqual({
			error: true,
			message: "Update user error: Update error",
		});
	});
});

const { hashPassword } = require("../hashPassword");

test("hashes a password with salt rounds", async () => {
	const password = "password";
	const hashedPassword = await hashPassword(password);
	expect(hashedPassword.startsWith("$2b$10$")).toBe(true);
});

test("throws an error if password is missing", async () => {
	const result = await hashPassword();
	expect(result).toEqual({
		error: true,
		message: "Create user error: data and salt arguments required",
	});
});

test("throws an error if password is not a string", async () => {
	const result = await hashPassword(123);
	expect(result).toEqual({
		error: true,
		message:
			"Create user error: data must be a string or Buffer and salt must either be a salt string or a number of rounds",
	});
});

const validateId = (value) => {
	if (!Number.isInteger(value) || value <= 0) {
		throw new Error("Invalid user ID");
	}
};

const validateName = (value) => {
	if (typeof value !== "string" || value.length < 2) {
		throw new Error("Invalid name");
	}
};
const validateToken = (value) => {
	if (typeof value !== "string" || value.length < 2) {
		throw new Error("Invalid token");
	}
};

const validateEmail = (value) => {
	if (
		typeof value !== "string" ||
		!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
	) {
		throw new Error("Invalid email");
	}
};

const validatePassword = (value) => {
	if (typeof value !== "string" || value.length < 6) {
		throw new Error("Invalid password, must have at least 6 characters");
	}
};

const validatePasswordMatch = (value, value2) => {
	if (value !== value2) {
		throw new Error("Passwords don't match");
	}
};

const validateActive = (value) => {
	if (typeof value !== "boolean") {
		throw new Error("Invalid active value");
	}
};

const validateHashedPassword = (password, hash) => {
	return bcrypt.compare(password, hash).then((res) => {
		if (res === true) {
			return true;
		}
		return {
			error: true,
			message: "password does not match",
		};
	});
};

module.exports = {
	validateId,
	validateToken,
	validateName,
	validateEmail,
	validatePassword,
	validatePasswordMatch,
	validateActive,
	validateHashedPassword,
};

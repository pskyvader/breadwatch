const validateId = (value) => {
	if (!Number.isInteger(value) || value <= 0) {
		throw new Error("Invalid id");
	}
};

const validateName = (value) => {
	if (typeof value !== "string" || value.length < 2) {
		throw new Error("Invalid name");
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
		throw new Error("Invalid password");
	}
};

const validateActive = (value) => {
	if (typeof value !== "boolean") {
		throw new Error("Invalid active value");
	}
};

module.exports = {
	validateId,
	validateName,
	validateEmail,
	validatePassword,
	validateActive,
};

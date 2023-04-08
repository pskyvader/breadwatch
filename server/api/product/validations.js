const validateId = (value) => {
	if (typeof value !== "number" || isNaN(value) || value < 1) {
		throw new Error("Invalid id. Id must be a positive integer.");
	}
};
const validateName = (value) => {
	if (typeof value !== "string" || value.length < 2) {
		throw new Error(
			"Invalid name. Name must be a string with at least 2 characters."
		);
	}
};

const validateCalories = (value) => {
	if (typeof value !== "number" || isNaN(value) || value < 0) {
		throw new Error(
			"Invalid calories. Calories must be a positive number."
		);
	}
};

const validateHealthy = (value) => {
	if (typeof value !== "boolean") {
		throw new Error(
			"Invalid healthy value. Healthy must be a boolean (true or false)."
		);
	}
};

const validateActive = (value) => {
	if (typeof value !== "boolean") {
		throw new Error(
			"Invalid active value. Active must be a boolean (true or false)."
		);
	}
};
module.exports = {
	validateName,
	validateCalories,
	validateHealthy,
	validateActive,
	validateId,
};

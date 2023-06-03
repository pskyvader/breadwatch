const validateId = (value) => {
	if (typeof value !== "number" || isNaN(value) || value < 1) {
		throw new Error("Invalid id. Id must be a positive integer.");
	}
};
const validateDate = (value) => {
	if (!(value instanceof Date) || isNaN(value.getTime())) {
		throw new Error("Invalid date. Date must be a valid date.");
	}
};

module.exports = {
	validateDate,
	validateId,
};

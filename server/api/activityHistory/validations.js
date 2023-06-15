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
const validateDateRange = (date1, date2) => {
	if (date1 >= date2) {
		throw new Error(
			"Invalid date range. Date 1 must be earlier than Date 2."
		);
	}
};

module.exports = {
	validateDate,
	validateDateRange,
	validateId,
};

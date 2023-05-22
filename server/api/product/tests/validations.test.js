const {
	validateName,
	validateCalories,
	validateHealthy,
	validateActive,
	validateId,
} = require("../validations"); // Replace "your-validations-file" with the correct file path

// Unit tests for validateId function
describe("validateId function", () => {
	test("should throw error if input is not a number", () => {
		expect(() => validateId("a")).toThrow(
			"Invalid id. Id must be a positive integer."
		);
	});

	test("should throw error if input is NaN", () => {
		expect(() => validateId(NaN)).toThrow(
			"Invalid id. Id must be a positive integer."
		);
	});

	test("should throw error if input is less than 1", () => {
		expect(() => validateId(0)).toThrow(
			"Invalid id. Id must be a positive integer."
		);
	});

	test("should not throw error if input is a positive integer", () => {
		expect(() => validateId(1)).not.toThrow();
	});
});

// Unit tests for validateName function
describe("validateName function", () => {
	test("should throw error if input is not a string", () => {
		expect(() => validateName(1)).toThrow(
			"Invalid name. Name must be a string with at least 2 characters."
		);
	});

	test("should throw error if input length is less than 2", () => {
		expect(() => validateName("a")).toThrow(
			"Invalid name. Name must be a string with at least 2 characters."
		);
	});

	test("should not throw error if input is a string with at least 2 characters", () => {
		expect(() => validateName("apple")).not.toThrow();
	});
});

// Unit tests for validateCalories function
describe("validateCalories function", () => {
	test("should throw error if input is not a number", () => {
		expect(() => validateCalories("a")).toThrow(
			"Invalid calories. Calories must be a positive number."
		);
	});

	test("should throw error if input is NaN", () => {
		expect(() => validateCalories(NaN)).toThrow(
			"Invalid calories. Calories must be a positive number."
		);
	});

	test("should throw error if input is less than 0", () => {
		expect(() => validateCalories(-1)).toThrow(
			"Invalid calories. Calories must be a positive number."
		);
	});

	test("should not throw error if input is a positive number", () => {
		expect(() => validateCalories(1)).not.toThrow();
	});
});

// Unit tests for validateHealthy function
describe("validateHealthy function", () => {
	test("should throw error if input is not a boolean", () => {
		expect(() => validateHealthy("a")).toThrow(
			"Invalid healthy value. Healthy must be a boolean (true or false)."
		);
	});

	test("should not throw error if input is true", () => {
		expect(() => validateHealthy(true)).not.toThrow();
	});

	test("should not throw error if input is false", () => {
		expect(() => validateHealthy(false)).not.toThrow();
	});
});

// Unit tests for validateActive function
describe("validateActive function", () => {
	test("should throw error if input is not a boolean", () => {
		expect(() => validateActive("a")).toThrow(
			"Invalid active value. Active must be a boolean (true or false)."
		);
	});

	test("should not throw error if input is true", () => {
		expect(() => validateActive(true)).not.toThrow();
	});

	test("should not throw error if input is false", () => {
		expect(() => validateActive(false)).not.toThrow();
	});
});

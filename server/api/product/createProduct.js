const { Product } = require("../../database");
const {
	validateName,
	validateCalories,
	validateHealthy,
	validateActive,
} = require("./validations");

const validateFields = (fields) => {
	const validatedFields = {};

	validateName(fields.name);
	validatedFields.name = fields.name;

	validateCalories(fields.calories);
	validatedFields.calories = fields.calories;

	validateHealthy(fields.healthy);
	validatedFields.healthy = fields.healthy;

	validateActive(fields.active);
	validatedFields.active = fields.active;

	return validatedFields;
};

const createProduct = (fields) => {
	try {
		const validatedFields = validateFields(fields);
		return Product.create(validatedFields).catch((err) => {
			return {
				error: true,
				message: "Create Product error: " + err.message,
			};
		});
	} catch (error) {
		return {
			error: true,
			message: error.message,
		};
	}
};

module.exports = {
	createProduct,
};

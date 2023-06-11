const { Activity } = require("../../database");
const {
	validateName,
	validateCalories,
	validateActive,
} = require("./validations");

const validateFields = (fields) => {
	const validatedFields = {};

	validateName(fields.name);
	validatedFields.name = fields.name;

	validateCalories(fields.calories);
	validatedFields.calories = fields.calories;

	validateActive(fields.active);
	validatedFields.active = fields.active;

	return validatedFields;
};

const createActivity = (fields) => {
	try {
		const validatedFields = validateFields(fields);
		return Activity.create(validatedFields).catch((err) => {
			return {
				error: true,
				message: "Create Activity error: " + err.message,
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
	createActivity,
};

const {
	validateName,
	validateCalories,
	validateActive,
	validateId,
} = require("./validations");

const validateFields = (fields) => {
	const updateFields = {};

	if (fields.id !== undefined) {
		validateId(fields.id);
		updateFields.id = fields.id;
	}

	if (fields.name !== undefined) {
		validateName(fields.name);
		updateFields.name = fields.name;
	}

	if (fields.calories !== undefined) {
		validateCalories(fields.calories);
		updateFields.calories = fields.calories;
	}

	if (fields.active !== undefined) {
		validateActive(fields.active);
		updateFields.active = fields.active;
	}

	return updateFields;
};

const updateActivity = async (Activity, fields) => {
	try {
		const updateFields = validateFields(fields);
		if (!Activity || Object.keys(updateFields).length === 0) {
			return { error: true, message: "Missing required fields" };
		}

		return Activity.update(updateFields).catch((err) => {
			return {
				error: true,
				message: "Update Activity error: " + err.message,
			};
		});
	} catch (error) {
		return { error: true, message: error.message };
	}
};

module.exports = {
	updateActivity,
};

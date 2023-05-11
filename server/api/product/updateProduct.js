const {
	validateName,
	validateCalories,
	validateHealthy,
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

	if (fields.healthy !== undefined) {
		validateHealthy(fields.healthy);
		updateFields.healthy = fields.healthy;
	}

	if (fields.active !== undefined) {
		validateActive(fields.active);
		updateFields.active = fields.active;
	}

	return updateFields;
};

const updateProduct = async (product, fields) => {
	console.log(product, Object.keys(fields).length);
	if (!product || Object.keys(fields).length === 0) {
		return { error: true, message: "Missing required fields" };
	}

	try {
		const updateFields = validateFields(fields);

		return product.update(updateFields).catch((err) => {
			throw new Error("Update Product error: " + err.message);
		});
	} catch (error) {
		return { error: true, message: error.message };
	}
};

module.exports = {
	updateProduct,
};

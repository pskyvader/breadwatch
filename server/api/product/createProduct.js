const { Product } = require("../../database");

const createProduct = (fields) => {
	if (!fields.name || !fields.calories || !fields.healthy || !fields.active) {
		return { error: true, message: "Missing required fields" };
	}
	return Product.create({
		name: fields.name,
		calories: fields.calories,
		healthy: fields.healthy,
		active: fields.active,
	}).catch((err) => {
		return {
			error: true,
			message: "Create Product error: " + err.message,
		};
	});
};

module.exports = {
	createProduct,
};

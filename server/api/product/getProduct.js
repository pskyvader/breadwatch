const { Product } = require("../../database");

const getProduct = (idProduct = null) => {
	if (idProduct === null) {
		return { error: true, message: "Missing required fields" };
	}
	return Product.findByPk(idProduct)
		.then((Product) => {
			if (Product === null) {
				return {
					error: true,
					message: "Product not found",
				};
			}
			return Product;
		})
		.catch((err) => {
			return {
				error: true,
				message: "Get Product error: " + err.message,
			};
		});
};

const getAllProducts = (active = null) => {
	const where = active !== null ? { active: active } : {};

	return Product.findAll({ where: where }).catch((err) => {
		return {
			error: true,
			message: "Get all Products error: " + err.message,
		};
	});
};

module.exports = {
	getProduct,
	getAllProducts,
};

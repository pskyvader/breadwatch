const { Product } = require("../../database");
const { validateId, validateActive } = require("./validations");

const getProduct = (idProduct) => {
	try {
		validateId(idProduct);
	} catch (error) {
		return { error: true, message: error.message };
	}
	return Product.findByPk(idProduct)
		.then((product) => {
			if (product === null) {
				return {
					error: true,
					message: "Product not found",
				};
			}
			return product;
		})
		.catch((err) => {
			return {
				error: true,
				message: "Get product error: " + err.message,
			};
		});
};

const getAllProducts = (active = undefined) => {
	if (active !== undefined) {
		try {
			if (active) {
				validateActive(active);
			}
		} catch (error) {
			return { error: true, message: error.message };
		}
	}
	const where = active !== undefined ? { active: active } : {};

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

const { ProductHistory } = require("../../database");
const createProductHistory = (product, user) => {
	return ProductHistory.create({
		UserId: user.id,
		ProductId: product.id,
	}).catch((err) => {
		return {
			error: true,
			message: "Create history error: " + err.message,
		};
	});
};

module.exports = {
	createProductHistory,
};

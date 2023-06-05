const { History } = require("../../database");
const createHistory = (product, user) => {
	return History.create({
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
	createHistory,
};

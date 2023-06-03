const { History } = require("../../database");
const createHistory = (product, user) => {
	try {
		return History.create({
			UserId: user.id,
			ProductId: product.id,
		}).catch((err) => {
			return {
				error: true,
				message: "Create history error: " + err.message,
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
	createHistory,
};

require("dotenv").config();
const { Logs, User, History, Product } = require("../database");

const transferLogsToHistory = async (userId, logs) => {
	const user = await User.findByPk(userId);
	if (!user) {
		throw new Error(`User with id ${userId} does not exist.`);
	}
	const products = await Product.findAll();

	const historyData = [];
	for (const log of logs) {
		const product = products.find((p) => p.name === log.product);
		if (product) {
			for (let i = 0; i < log.quantity; i++) {
				historyData.push({
					date: new Date(log.date),
					UserId: user.id,
					ProductId: product.id,
				});
			}
		} else {
			console.warn(`Log with id ${log.id} has an invalid product name.`);
		}
	}

	await History.bulkCreate(historyData);
};
module.exports = { transferLogsToHistory };

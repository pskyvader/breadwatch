require("dotenv").config();
const { User, ProductHistory, Product } = require("../database");

const transferLogsToHistory = async (userId, logs) => {
	if (!logs || logs.length === 0) return;
	const user = await User.findByPk(userId);
	if (!user) {
		throw new Error(`User with id ${userId} does not exist.`);
	}
	const products = await Product.findAll();

	const historyData = [];
	for (const log of logs) {
		for (const [productName, quantity] of Object.entries(log)) {
			if (productName === "date") {
				continue;
			}
			const product = products.find((p) => p.name === productName);
			if (!product) {
				throw new Error(`Invalid product name: ${productName}`);
			}
			const currentDate = new Date(log.date);
			for (let i = 0; i < quantity; i++) {
				historyData.push({
					date: currentDate,
					UserId: user.id,
					ProductId: product.id,
				});
			}
		}
	}
	await ProductHistory.bulkCreate(historyData);
};
module.exports = { transferLogsToHistory };

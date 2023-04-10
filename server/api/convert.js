require("dotenv").config();
const { Logs, User, History, Product } = require("../database");

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
			const currentDate = new Date(log.date);
			if (product) {
				for (let i = 0; i < quantity; i++) {
					historyData.push({
						date: currentDate,
						UserId: user.id,
						ProductId: product.id,
					});
				}
			} else {
				throw new Error(`Invalid product name: ${productName}`);
			}
		}
	}
	await History.bulkCreate(historyData);
};
module.exports = { transferLogsToHistory };

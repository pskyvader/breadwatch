const { createProductHistory } = require("./createProductHistory");
const { deleteProductHistory } = require("./deleteProductHistory");
const {
	getProductHistoriesByUser,
	getAllProductHistories,
	getProductHistoriesByDate,
	getProductHistoriesByDateRange,
	getProductHistoryById,
} = require("./getProductHistory");

module.exports = {
	createProductHistory,
	deleteProductHistory,
	getProductHistoriesByUser,
	getAllProductHistories,
	getProductHistoriesByDate,
	getProductHistoriesByDateRange,
	getProductHistoryById,
};

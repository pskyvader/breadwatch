const { ProductHistory } = require("../../database");
const { validateDate, validateId } = require("./validations");
const { Op } = require("sequelize");

const getProductHistoryById = (historyId) => {
	try {
		validateId(historyId);
	} catch (error) {
		return {
			error: true,
			message: error.message,
		};
	}
	return ProductHistory.findByPk(historyId).catch((err) => {
		return {
			error: true,
			message: "Error retrieving history by ID: " + err.message,
		};
	});
};

const getProductHistoriesByDate = (user, date) => {
	try {
		validateDate(date);
	} catch (error) {
		return {
			error: true,
			message: error.message,
		};
	}
	const formattedDate = new Date(date);
	formattedDate.setUTCHours(0, 0, 0, 0); // Set the time to start of day (midnight)

	const startDate = formattedDate;
	const endDate = new Date(formattedDate.getTime() + 24 * 60 * 60 * 1000);

	return user
		.getProductHistories({
			where: {
				date: {
					[Op.between]: [startDate, endDate],
				},
			},
		})
		.catch((err) => {
			return {
				error: true,
				message: "Error retrieving histories by date: " + err.message,
			};
		});
};

const getProductHistoriesByDateRange = (user, startDate, endDate) => {
	try {
		validateDate(startDate);
		validateDate(endDate);
	} catch (error) {
		return {
			error: true,
			message: error.message,
		};
	}
	return user
		.getProductHistories({
			where: {
				date: {
					[Op.between]: [
						startDate,
						new Date(
							endDate.getTime() + 24 * 60 * 60 * 1000
						).toISOString(),
					],
				},
			},
		})
		.catch((err) => {
			return {
				error: true,
				message:
					"Error retrieving histories by date range: " + err.message,
			};
		});
};

const getProductHistoriesByUser = (user) => {
	return user
		.getHistories({
			order: ["date", "DESC"],
		})
		.catch((err) => {
			return {
				error: true,
				message: "Error retrieving histories by date: " + err.message,
			};
		});
};

const getAllProductHistories = () => {
	return ProductHistory.findAll().catch((err) => {
		return {
			error: true,
			message: "Error retrieving histories: " + err.message,
		};
	});
};

module.exports = {
	getProductHistoriesByUser,
	getAllProductHistories,
	getProductHistoriesByDate,
	getProductHistoriesByDateRange,
	getProductHistoryById,
};
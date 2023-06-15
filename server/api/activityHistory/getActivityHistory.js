const { ActivityHistory } = require("../../database");
const {
	validateDate,
	validateDateRange,
	validateId,
} = require("./validations");
const { Op } = require("sequelize");

const getActivityHistoryById = (historyId) => {
	try {
		validateId(historyId);
	} catch (error) {
		return {
			error: true,
			message: error.message,
		};
	}
	return ActivityHistory.findByPk(historyId)
		.catch((err) => {
			return {
				error: true,
				message: "Error retrieving activity history by ID: " + err.message,
			};
		})
		.then((result) => {
			if (result == null) {
				return {
					error: true,
					message: "Activity history not found",
				};
			}
			return result;
		});
};

const getActivityHistoriesByDate = (user, date) => {
	try {
		validateDate(date);
	} catch (error) {
		return {
			error: true,
			message: error.message,
		};
	}
	const formattedDate = date;
	formattedDate.setUTCHours(0, 0, 0, 0); // Set the time to start of day (midnight)

	const startDate = formattedDate;
	const endDate = new Date(formattedDate.getTime() + 24 * 60 * 60 * 1000);

	return user
		.getActivityHistories({
			where: {
				date: {
					[Op.between]: [startDate, endDate],
				},
			},
		})
		.catch((err) => {
			return {
				error: true,
				message: "Error retrieving activity histories by date: " + err.message,
			};
		});
};

const getActivityHistoriesByDateRange = (user, startDate, endDate) => {
	try {
		validateDate(startDate);
		validateDate(endDate);
		validateDateRange(startDate, endDate);
	} catch (error) {
		return {
			error: true,
			message: error.message,
		};
	}
	return user
		.getActivityHistories({
			where: {
				date: {
					[Op.between]: [
						startDate,
						new Date(endDate.getTime() + 24 * 60 * 60 * 1000),
					],
				},
			},
		})
		.catch((err) => {
			return {
				error: true,
				message:
					"Error retrieving activity histories by date range: " + err.message,
			};
		});
};

const getActivityHistoriesByUser = (user) => {
	return user
		.getHistories({
			order: ["date", "DESC"],
		})
		.catch((err) => {
			return {
				error: true,
				message: "Error retrieving activity histories by user: " + err.message,
			};
		});
};

const getAllActivityHistories = () => {
	return ActivityHistory.findAll().catch((err) => {
		return {
			error: true,
			message: "Error retrieving all activity histories: " + err.message,
		};
	});
};

module.exports = {
	getActivityHistoriesByUser,
	getAllActivityHistories,
	getActivityHistoriesByDate,
	getActivityHistoriesByDateRange,
	getActivityHistoryById,
};

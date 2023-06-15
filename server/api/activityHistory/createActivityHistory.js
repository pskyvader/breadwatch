const { ActivityHistory } = require("../../database");
const createActivityHistory = (activity, user) => {
	return ActivityHistory.create({
		UserId: user.id,
		ActivityId: activity.id,
	}).catch((err) => {
		return {
			error: true,
			message: "Create activity history error: " + err.message,
		};
	});
};

module.exports = {
	createActivityHistory,
};

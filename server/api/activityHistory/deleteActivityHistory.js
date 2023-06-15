const deleteActivityHistory = (activityHistory) => {
	return activityHistory.destroy().catch((err) => {
		return {
			error: true,
			message: "Delete activity History error: " + err.message,
		};
	});
};

module.exports = {
	deleteActivityHistory,
};

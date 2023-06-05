const deleteHistory = (history) => {
	return history.destroy().catch((err) => {
		return {
			error: true,
			message: "Delete history error: " + err.message,
		};
	});
};

module.exports = {
	deleteHistory,
};

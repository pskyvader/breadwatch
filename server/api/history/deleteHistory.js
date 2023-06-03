const deleteHistory = (history) => {
	try {
		return history.destroy().catch((err) => {
			return {
				error: true,
				message: "Delete history error: " + err.message,
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
	deleteHistory,
};

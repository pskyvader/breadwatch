const deleteProductHistory = (productHistory) => {
	return productHistory.destroy().catch((err) => {
		return {
			error: true,
			message: "Delete productHistory error: " + err.message,
		};
	});
};

module.exports = {
	deleteProductHistory,
};

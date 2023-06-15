const deleteProductHistory = (productHistory) => {
	return productHistory.destroy().catch((err) => {
		return {
			error: true,
			message: "Delete product history error: " + err.message,
		};
	});
};

module.exports = {
	deleteProductHistory,
};

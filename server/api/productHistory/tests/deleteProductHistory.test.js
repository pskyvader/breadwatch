const { deleteProductHistory } = require("../deleteProductHistory");
// const { ProductHistory } = require("../../../database"); // Assuming you have the ProductHistory model in your database module

// jest.mock("../../../database", () => ({
// 	ProductHistory: {
// 		destroy: jest.fn(),
// 	},
// }));

describe("deleteProductHistory", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should delete the product history", async () => {
		// Create a mock productHistory instance
		const productHistory = {
			id: 1,
			destroy: jest.fn().mockResolvedValue(),
		};

		// Call the deleteProductHistory function
		await deleteProductHistory(productHistory);

		// Check if the destroy method of the productHistory instance was called
		expect(productHistory.destroy).toHaveBeenCalled();
	});

	it("should return an error object if deletion fails", async () => {
		// Create a mock productHistory instance
		const productHistory = {
			id: 1,
			destroy: jest.fn().mockRejectedValue(new Error("Deletion error")),
		};

		// Call the deleteProductHistory function
		const result = await deleteProductHistory(productHistory);

		// Check if the destroy method of the productHistory instance was called
		expect(productHistory.destroy).toHaveBeenCalled();

		// Check if the result contains an error
		expect(result).toEqual({
			error: true,
			message: "Delete productHistory error: Deletion error",
		});
	});
});

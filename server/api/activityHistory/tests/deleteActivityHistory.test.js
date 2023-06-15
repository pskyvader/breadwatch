const { deleteActivityHistory } = require("../deleteActivityHistory");
// const { ActivityHistory } = require("../../../database"); // Assuming you have the ActivityHistory model in your database module

// jest.mock("../../../database", () => ({
// 	ActivityHistory: {
// 		destroy: jest.fn(),
// 	},
// }));

describe("deleteActivityHistory", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should delete the activity history", async () => {
		// Create a mock activityHistory instance
		const activityHistory = {
			id: 1,
			destroy: jest.fn().mockResolvedValue(),
		};

		// Call the deleteActivityHistory function
		await deleteActivityHistory(activityHistory);

		// Check if the destroy method of the activityHistory instance was called
		expect(activityHistory.destroy).toHaveBeenCalled();
	});

	it("should return an error object if deletion fails", async () => {
		// Create a mock activityHistory instance
		const activityHistory = {
			id: 1,
			destroy: jest.fn().mockRejectedValue(new Error("Deletion error")),
		};

		// Call the deleteActivityHistory function
		const result = await deleteActivityHistory(activityHistory);

		// Check if the destroy method of the activityHistory instance was called
		expect(activityHistory.destroy).toHaveBeenCalled();

		// Check if the result contains an error
		expect(result).toEqual({
			error: true,
			message: "Delete activity History error: Deletion error",
		});
	});
});

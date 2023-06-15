const { createActivityHistory } = require("../createActivityHistory");
const { ActivityHistory } = require("../../../database");

// Mock Activity model and functions
jest.mock("../../../database", () => ({
	ActivityHistory: {
		create: jest.fn(),
	},
}));

describe("createActivityHistory", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should create a activity history entry", async () => {
		// Mock data
		const activity = { id: 1 };
		const user = { id: 1 };

		// Mock the create method of ActivityHistory model
		ActivityHistory.create.mockResolvedValue({
			UserId: user.id,
			ActivityId: activity.id,
		});

		// Call the function
		const result = await createActivityHistory(activity, user);

		// Assert the result
		expect(result).toEqual({ UserId: user.id, ActivityId: activity.id });

		// Verify the create method was called with the correct arguments
		expect(ActivityHistory.create).toHaveBeenCalledWith({
			UserId: user.id,
			ActivityId: activity.id,
		});
	});

	it("should return an error object if creation fails", async () => {
		// Mock data
		const activity = { id: 1 };
		const user = { id: 1 };

		// Mock the create method of ActivityHistory model to throw an error
		const errorMessage = "Creation failed";
		ActivityHistory.create.mockRejectedValue(new Error(errorMessage));

		// Call the function
		const result = await createActivityHistory(activity, user);

		// Assert the error object
		expect(result).toEqual({
			error: true,
			message: "Create activity history error: " + errorMessage,
		});

		// Verify the create method was called with the correct arguments
		expect(ActivityHistory.create).toHaveBeenCalledWith({
			UserId: user.id,
			ActivityId: activity.id,
		});
	});
});

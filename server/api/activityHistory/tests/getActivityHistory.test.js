const {
	getActivityHistoryById,
	getActivityHistoriesByDate,
	getActivityHistoriesByDateRange,
	getActivityHistoriesByUser,
	getAllActivityHistories,
} = require("../getActivityHistory");

const { ActivityHistory, User } = require("../../../database");
const { Op } = require("sequelize");

jest.mock("../../../database", () => ({
	ActivityHistory: {
		findByPk: jest.fn(),
		findAll: jest.fn(),
	},
	User: {
		create: jest.fn(() => ({
			getHistories: jest.fn(),
			getActivityHistories: jest.fn(),
		})),
	},
}));
describe("getActivityHistoryById", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should retrieve activity history by ID", async () => {
		ActivityHistory.findByPk.mockResolvedValue({ id: 1 });
		const result = await getActivityHistoryById(1);
		expect(ActivityHistory.findByPk).toHaveBeenCalledWith(1);
		expect(result).toEqual({ id: 1 });
	});

	it("should handle an error when retrieving activity history by ID", async () => {
		const errorMessage = "Failed to retrieve activity history";
		ActivityHistory.findByPk.mockRejectedValue(new Error(errorMessage));
		const result = await getActivityHistoryById(1);
		expect(ActivityHistory.findByPk).toHaveBeenCalledWith(1);
		expect(result).toEqual({
			error: true,
			message: "Error retrieving activity history by ID: " + errorMessage,
		});
	});

	it("should handle retrieving a activity history by an invalid ID", async () => {
		const result = await getActivityHistoryById("invalidId");
		expect(ActivityHistory.findByPk).not.toHaveBeenCalled();
		expect(result).toEqual({
			error: true,
			message: "Invalid id. Id must be a positive integer.",
		});
	});

	it("should handle retrieving a non-existent activity history", async () => {
		ActivityHistory.findByPk.mockResolvedValue(null);
		const result = await getActivityHistoryById(999);
		expect(ActivityHistory.findByPk).toHaveBeenCalledWith(999);
		expect(result).toEqual({
			error: true,
			message: "Activity history not found",
		});
	});

	it("should retrieve a activity history with different attributes", async () => {
		const activityHistory = {
			id: 1,
			activityId: 123,
			date: new Date("2023-06-11"),
			quantity: 2,
			userId: 456,
		};
		ActivityHistory.findByPk.mockResolvedValue(activityHistory);
		const result = await getActivityHistoryById(1);
		expect(ActivityHistory.findByPk).toHaveBeenCalledWith(1);
		expect(result).toEqual(activityHistory);
	});
});

describe("getActivityHistoriesByDate", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should retrieve activity histories by date", async () => {
		const user = User.create();
		const activityHistories = [{ id: 1 }, { id: 2 }];
		user.getActivityHistories.mockResolvedValue(activityHistories);
		const startDate = new Date("2023-06-11");
		const endDate = new Date("2023-06-12");
		const result = await getActivityHistoriesByDate(user, startDate);
		expect(user.getActivityHistories).toHaveBeenCalledWith(
			expect.objectContaining({
				where: {
					date: {
						[Op.between]: [startDate, endDate],
					},
				},
			})
		);
		expect(result).toEqual(activityHistories);
	});

	it("should handle an error when retrieving activity histories by date", async () => {
		const user = User.create();
		const errorMessage = "Failed to retrieve activity histories";
		user.getActivityHistories.mockRejectedValue(new Error(errorMessage));
		const result = await getActivityHistoriesByDate(user, new Date());
		expect(user.getActivityHistories).toHaveBeenCalled();
		expect(result).toEqual({
			error: true,
			message:
				"Error retrieving activity histories by date: " + errorMessage,
		});
	});

	it("should retrieve an empty array if no activity histories exist for the date", async () => {
		const user = User.create();
		const activityHistories = [];
		user.getActivityHistories.mockResolvedValue(activityHistories);
		const result = await getActivityHistoriesByDate(user, new Date());
		expect(user.getActivityHistories).toHaveBeenCalled();
		expect(result).toEqual([]);
	});

	it("should handle retrieving activity histories for a user with no activity histories", async () => {
		const user = User.create();
		user.getActivityHistories.mockResolvedValue([]);
		const result = await getActivityHistoriesByDate(user, new Date());
		expect(user.getActivityHistories).toHaveBeenCalled();
		expect(result).toEqual([]);
	});
});

describe("getActivityHistoriesByDateRange", () => {
	it("should retrieve activity histories by date range", async () => {
		const user = User.create();
		const activityHistories = [{ id: 1 }, { id: 2 }];
		user.getActivityHistories.mockResolvedValue(activityHistories);
		const startDate = new Date("2023-06-11");
		const endDate = new Date("2023-06-12");
		const result = await getActivityHistoriesByDateRange(
			user,
			startDate,
			endDate
		);
		expect(user.getActivityHistories).toHaveBeenCalledWith(
			expect.objectContaining({
				where: {
					date: {
						[Op.between]: [
							startDate,
							new Date(endDate.getTime() + 24 * 60 * 60 * 1000),
						],
					},
				},
			})
		);
		expect(result).toEqual(activityHistories);
	});

	it("should handle an error when retrieving activity histories by date range", async () => {
		const user = User.create();
		const errorMessage = "Failed to retrieve activity histories";
		const startDate = new Date("2023-06-11");
		const endDate = new Date("2023-06-12");
		user.getActivityHistories.mockRejectedValue(new Error(errorMessage));
		const result = await getActivityHistoriesByDateRange(
			user,
			startDate,
			endDate
		);
		expect(user.getActivityHistories).toHaveBeenCalled();
		expect(result).toEqual({
			error: true,
			message:
				"Error retrieving activity histories by date range: " +
				errorMessage,
		});
	});

	it("should retrieve an empty array if no activity histories exist for the date range", async () => {
		const user = User.create();
		const activityHistories = [];
		const startDate = new Date("2023-06-11");
		const endDate = new Date("2023-06-12");
		user.getActivityHistories.mockResolvedValue(activityHistories);
		const result = await getActivityHistoriesByDateRange(
			user,
			startDate,
			endDate
		);
		expect(user.getActivityHistories).toHaveBeenCalled();
		expect(result).toEqual([]);
	});

	it("should handle retrieving activity histories for a user with no activity histories in the given date range", async () => {
		const user = User.create();
		const startDate = new Date("2023-06-11");
		const endDate = new Date("2023-06-12");
		user.getActivityHistories.mockResolvedValue([]);
		const result = await getActivityHistoriesByDateRange(
			user,
			startDate,
			endDate
		);
		expect(user.getActivityHistories).toHaveBeenCalled();
		expect(result).toEqual([]);
	});

	it("should handle an invalid date range", async () => {
		const user = User.create();
		user.getActivityHistories.mockResolvedValue([]);
		const startDate = new Date("2023-06-12");
		const endDate = new Date("2023-06-11");
		const result = await getActivityHistoriesByDateRange(
			user,
			startDate,
			endDate
		);
		expect(user.getActivityHistories).not.toHaveBeenCalled();
		expect(result).toEqual({
			error: true,
			message: "Invalid date range. Date 1 must be earlier than Date 2.",
		});
	});
});

describe("getActivityHistoriesByUser", () => {
	it("should retrieve activity histories by user", async () => {
		const user = User.create();
		const activityHistories = [{ id: 1 }, { id: 2 }];
		user.getHistories.mockResolvedValue(activityHistories);
		const result = await getActivityHistoriesByUser(user);
		expect(user.getHistories).toHaveBeenCalled();
		expect(result).toEqual(activityHistories);
	});

	it("should handle an error when retrieving activity histories by user", async () => {
		const user = User.create();
		const errorMessage = "Failed to retrieve activity histories";
		user.getHistories.mockRejectedValue(new Error(errorMessage));
		const result = await getActivityHistoriesByUser(user);
		expect(user.getHistories).toHaveBeenCalled();
		expect(result).toEqual({
			error: true,
			message:
				"Error retrieving activity histories by user: " + errorMessage,
		});
	});

	it("should handle retrieving activity histories for a user with no activity histories", async () => {
		const user = User.create();
		user.getHistories.mockResolvedValue([]);
		const result = await getActivityHistoriesByUser(user);
		expect(user.getHistories).toHaveBeenCalled();
		expect(result).toEqual([]);
	});
});

describe("getAllActivityHistories", () => {
	it("should retrieve all activity histories", async () => {
		const activityHistories = [{ id: 1 }, { id: 2 }];
		ActivityHistory.findAll.mockResolvedValue(activityHistories);
		const result = await getAllActivityHistories();
		expect(ActivityHistory.findAll).toHaveBeenCalled();
		expect(result).toEqual(activityHistories);
	});

	it("should handle an error when retrieving all activity histories", async () => {
		const errorMessage = "Failed to retrieve activity histories";
		ActivityHistory.findAll.mockRejectedValue(new Error(errorMessage));
		const result = await getAllActivityHistories();
		expect(ActivityHistory.findAll).toHaveBeenCalled();
		expect(result).toEqual({
			error: true,
			message: "Error retrieving all activity histories: " + errorMessage,
		});
	});

	it("should retrieve an empty array if no activity histories exist", async () => {
		const activityHistories = [];
		ActivityHistory.findAll.mockResolvedValue(activityHistories);
		const result = await getAllActivityHistories();
		expect(ActivityHistory.findAll).toHaveBeenCalled();
		expect(result).toEqual([]);
	});
});

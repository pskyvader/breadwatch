const {
	getProductHistoryById,
	getProductHistoriesByDate,
	getProductHistoriesByDateRange,
	getProductHistoriesByUser,
	getAllProductHistories,
} = require("../getProductHistory");

const { ProductHistory, User } = require("../../../database");
const { Op } = require("sequelize");

jest.mock("../../../database", () => ({
	ProductHistory: {
		findByPk: jest.fn(),
		findAll: jest.fn(),
	},
	User: {
		create: jest.fn(() => ({
			getHistories: jest.fn(),
			getProductHistories: jest.fn(),
		})),
	},
}));
describe("getProductHistoryById", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should retrieve product history by ID", async () => {
		ProductHistory.findByPk.mockResolvedValue({ id: 1 });
		const result = await getProductHistoryById(1);
		expect(ProductHistory.findByPk).toHaveBeenCalledWith(1);
		expect(result).toEqual({ id: 1 });
	});

	it("should handle an error when retrieving product history by ID", async () => {
		const errorMessage = "Failed to retrieve product history";
		ProductHistory.findByPk.mockRejectedValue(new Error(errorMessage));
		const result = await getProductHistoryById(1);
		expect(ProductHistory.findByPk).toHaveBeenCalledWith(1);
		expect(result).toEqual({
			error: true,
			message: "Error retrieving product history by ID: " + errorMessage,
		});
	});

	it("should handle retrieving a product history by an invalid ID", async () => {
		const result = await getProductHistoryById("invalidId");
		expect(ProductHistory.findByPk).not.toHaveBeenCalled();
		expect(result).toEqual({
			error: true,
			message: "Invalid id. Id must be a positive integer.",
		});
	});

	it("should handle retrieving a non-existent product history", async () => {
		ProductHistory.findByPk.mockResolvedValue(null);
		const result = await getProductHistoryById(999);
		expect(ProductHistory.findByPk).toHaveBeenCalledWith(999);
		expect(result).toEqual({
			error: true,
			message: "Product history not found",
		});
	});

	it("should retrieve a product history with different attributes", async () => {
		const productHistory = {
			id: 1,
			productId: 123,
			date: new Date("2023-06-11"),
			quantity: 2,
			userId: 456,
		};
		ProductHistory.findByPk.mockResolvedValue(productHistory);
		const result = await getProductHistoryById(1);
		expect(ProductHistory.findByPk).toHaveBeenCalledWith(1);
		expect(result).toEqual(productHistory);
	});
});

describe("getProductHistoriesByDate", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should retrieve product histories by date", async () => {
		const user = User.create();
		const productHistories = [{ id: 1 }, { id: 2 }];
		user.getProductHistories.mockResolvedValue(productHistories);
		const startDate = new Date("2023-06-11");
		const endDate = new Date("2023-06-12");
		const result = await getProductHistoriesByDate(user, startDate);
		expect(user.getProductHistories).toHaveBeenCalledWith(
			expect.objectContaining({
				where: {
					date: {
						[Op.between]: [startDate, endDate],
					},
				},
			})
		);
		expect(result).toEqual(productHistories);
	});

	it("should handle an error when retrieving product histories by date", async () => {
		const user = User.create();
		const errorMessage = "Failed to retrieve product histories";
		user.getProductHistories.mockRejectedValue(new Error(errorMessage));
		const result = await getProductHistoriesByDate(user, new Date());
		expect(user.getProductHistories).toHaveBeenCalled();
		expect(result).toEqual({
			error: true,
			message: "Error retrieving product histories by date: " + errorMessage,
		});
	});

	it("should retrieve an empty array if no product histories exist for the date", async () => {
		const user = User.create();
		const productHistories = [];
		user.getProductHistories.mockResolvedValue(productHistories);
		const result = await getProductHistoriesByDate(user, new Date());
		expect(user.getProductHistories).toHaveBeenCalled();
		expect(result).toEqual([]);
	});

	it("should handle retrieving product histories for a user with no product histories", async () => {
		const user = User.create();
		user.getProductHistories.mockResolvedValue([]);
		const result = await getProductHistoriesByDate(user, new Date());
		expect(user.getProductHistories).toHaveBeenCalled();
		expect(result).toEqual([]);
	});
});

describe("getProductHistoriesByDateRange", () => {
	it("should retrieve product histories by date range", async () => {
		const user = User.create();
		const productHistories = [{ id: 1 }, { id: 2 }];
		user.getProductHistories.mockResolvedValue(productHistories);
		const startDate = new Date("2023-06-11");
		const endDate = new Date("2023-06-12");
		const result = await getProductHistoriesByDateRange(
			user,
			startDate,
			endDate
		);
		expect(user.getProductHistories).toHaveBeenCalledWith(
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
		expect(result).toEqual(productHistories);
	});

	it("should handle an error when retrieving product histories by date range", async () => {
		const user = User.create();
		const errorMessage = "Failed to retrieve product histories";
		const startDate = new Date("2023-06-11");
		const endDate = new Date("2023-06-12");
		user.getProductHistories.mockRejectedValue(new Error(errorMessage));
		const result = await getProductHistoriesByDateRange(
			user,
			startDate,
			endDate
		);
		expect(user.getProductHistories).toHaveBeenCalled();
		expect(result).toEqual({
			error: true,
			message:
				"Error retrieving product histories by date range: " + errorMessage,
		});
	});

	it("should retrieve an empty array if no product histories exist for the date range", async () => {
		const user = User.create();
		const productHistories = [];
		const startDate = new Date("2023-06-11");
		const endDate = new Date("2023-06-12");
		user.getProductHistories.mockResolvedValue(productHistories);
		const result = await getProductHistoriesByDateRange(
			user,
			startDate,
			endDate
		);
		expect(user.getProductHistories).toHaveBeenCalled();
		expect(result).toEqual([]);
	});

	it("should handle retrieving product histories for a user with no product histories in the given date range", async () => {
		const user = User.create();
		const startDate = new Date("2023-06-11");
		const endDate = new Date("2023-06-12");
		user.getProductHistories.mockResolvedValue([]);
		const result = await getProductHistoriesByDateRange(
			user,
			startDate,
			endDate
		);
		expect(user.getProductHistories).toHaveBeenCalled();
		expect(result).toEqual([]);
	});

	it("should handle an invalid date range", async () => {
		const user = User.create();
		user.getProductHistories.mockResolvedValue([]);
		const startDate = new Date("2023-06-12");
		const endDate = new Date("2023-06-11");
		const result = await getProductHistoriesByDateRange(
			user,
			startDate,
			endDate
		);
		expect(user.getProductHistories).not.toHaveBeenCalled();
		expect(result).toEqual({
			error: true,
			message: "Invalid date range. Date 1 must be earlier than Date 2.",
		});
	});
});

describe("getProductHistoriesByUser", () => {
	it("should retrieve product histories by user", async () => {
		const user = User.create();
		const productHistories = [{ id: 1 }, { id: 2 }];
		user.getHistories.mockResolvedValue(productHistories);
		const result = await getProductHistoriesByUser(user);
		expect(user.getHistories).toHaveBeenCalled();
		expect(result).toEqual(productHistories);
	});

	it("should handle an error when retrieving product histories by user", async () => {
		const user = User.create();
		const errorMessage = "Failed to retrieve product histories";
		user.getHistories.mockRejectedValue(new Error(errorMessage));
		const result = await getProductHistoriesByUser(user);
		expect(user.getHistories).toHaveBeenCalled();
		expect(result).toEqual({
			error: true,
			message: "Error retrieving product histories by user: " + errorMessage,
		});
	});

	it("should handle retrieving product histories for a user with no product histories", async () => {
		const user = User.create();
		user.getHistories.mockResolvedValue([]);
		const result = await getProductHistoriesByUser(user);
		expect(user.getHistories).toHaveBeenCalled();
		expect(result).toEqual([]);
	});
});

describe("getAllProductHistories", () => {
	it("should retrieve all product histories", async () => {
		const productHistories = [{ id: 1 }, { id: 2 }];
		ProductHistory.findAll.mockResolvedValue(productHistories);
		const result = await getAllProductHistories();
		expect(ProductHistory.findAll).toHaveBeenCalled();
		expect(result).toEqual(productHistories);
	});

	it("should handle an error when retrieving all product histories", async () => {
		const errorMessage = "Failed to retrieve product histories";
		ProductHistory.findAll.mockRejectedValue(new Error(errorMessage));
		const result = await getAllProductHistories();
		expect(ProductHistory.findAll).toHaveBeenCalled();
		expect(result).toEqual({
			error: true,
			message: "Error retrieving all product histories: " + errorMessage,
		});
	});

	it("should retrieve an empty array if no product histories exist", async () => {
		const productHistories = [];
		ProductHistory.findAll.mockResolvedValue(productHistories);
		const result = await getAllProductHistories();
		expect(ProductHistory.findAll).toHaveBeenCalled();
		expect(result).toEqual([]);
	});
});

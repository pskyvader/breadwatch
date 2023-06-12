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
	it("should retrieve product history by ID", async () => {
		ProductHistory.findByPk.mockResolvedValue({ id: 1 });
		const result = await getProductHistoryById(1);
		expect(ProductHistory.findByPk).toHaveBeenCalledWith(1);
		expect(result).toEqual({ id: 1 });
	});

	// Rest of the test cases...
});

describe("getProductHistoriesByDate", () => {
	it("should retrieve product histories by date", async () => {
		const user = User.create();
		const productHistories = [{ id: 1 }, { id: 2 }];
		user.getProductHistories.mockResolvedValue(productHistories);
		const startDate = "2023-06-11";
		const endDate = new Date("2023-06-12");
		const result = await getProductHistoriesByDate(user, startDate);
		expect(user.getProductHistories).toHaveBeenCalledWith(
			expect.objectContaining({
				where: {
					date: {
						[Op.between]: [
							new Date(startDate),
							new Date(endDate.getTime() + 24 * 60 * 60 * 1000),
						],
					},
				},
			})
		);
		expect(result).toEqual(productHistories);
	});

	// Rest of the test cases...
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

	// Rest of the test cases...
});

// Rest of the test cases...

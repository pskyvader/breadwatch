const {
	getProductHistoryById,
	getProductHistoriesByDate,
	getProductHistoriesByDateRange,
	getProductHistoriesByUser,
	getAllProductHistories,
} = require("../getProductHistory"); // Replace "your-file-name" with the actual file name

const { ProductHistory } = require("../../../database"); // Assuming you have the ProductHistory model in your database module
const { Op } = require("sequelize");

jest.mock("../../../database", () => ({
	ProductHistory: {
		findByPk: jest.fn(),
		findAll: jest.fn(),
	},
}));

describe("getProductHistoryById", () => {
	it("should retrieve product history by ID", async () => {
		ProductHistory.findByPk.mockResolvedValue({ id: 1 });
		const result = await getProductHistoryById(1);
		expect(ProductHistory.findByPk).toHaveBeenCalledWith(1);
		expect(result).toEqual({ id: 1 });
	});

	it("should return an error object if validation fails", async () => {
		const result = await getProductHistoryById("invalid-id");
		expect(result).toEqual({
			error: true,
			message: "Invalid id. Id must be a positive integer.",
		});
	});

	it("should return an error object if retrieval fails", async () => {
		ProductHistory.findByPk.mockRejectedValue(new Error("Retrieval error"));
		const result = await getProductHistoryById(1);
		expect(ProductHistory.findByPk).toHaveBeenCalledWith(1);
		expect(result).toEqual({
			error: true,
			message: "Error retrieving history by ID: Retrieval error",
		});
	});
});

describe("getProductHistoriesByDate", () => {
	it("should retrieve product histories by date", async () => {
		const productHistories = [{ id: 1 }, { id: 2 }];
		ProductHistory.findAll.mockResolvedValue(productHistories);
		const result = await getProductHistoriesByDate("user", "2023-06-11");
		expect(ProductHistory.findAll).toHaveBeenCalledWith({
			where: {
				date: {
					[Op.between]: [
						"2023-06-11T00:00:00.000Z",
						"2023-06-12T00:00:00.000Z",
					],
				},
			},
		});
		expect(result).toEqual(productHistories);
	});

	it("should return an error object if validation fails", async () => {
		const result = await getProductHistoriesByDate("user", "invalid-date");
		expect(result).toEqual({
			error: true,
			message: "Invalid date",
		});
	});

	it("should return an error object if retrieval fails", async () => {
		ProductHistory.findAll.mockRejectedValue(new Error("Retrieval error"));
		const result = await getProductHistoriesByDate("user", "2023-06-11");
		expect(ProductHistory.findAll).toHaveBeenCalledWith({
			where: {
				date: {
					[Op.between]: [
						"2023-06-11T00:00:00.000Z",
						"2023-06-12T00:00:00.000Z",
					],
				},
			},
		});
		expect(result).toEqual({
			error: true,
			message: "Error retrieving histories by date: Retrieval error",
		});
	});
});

describe("getProductHistoriesByDateRange", () => {
	it("should retrieve product histories by date range", async () => {
		const productHistories = [{ id: 1 }, { id: 2 }];
		ProductHistory.findAll.mockResolvedValue(productHistories);
		const result = await getProductHistoriesByDateRange(
			"user",
			"2023-06-11",
			"2023-06-12"
		);
		expect(ProductHistory.findAll).toHaveBeenCalledWith({
			where: {
				date: {
					[Op.between]: [
						"2023-06-11T00:00:00.000Z",
						"2023-06-12T00:00:00.000Z",
					],
				},
			},
		});
		expect(result).toEqual(productHistories);
	});

	it("should return an error object if validation fails", async () => {
		const result = await getProductHistoriesByDateRange(
			"user",
			"invalid-start-date",
			"invalid-end-date"
		);
		expect(result).toEqual({
			error: true,
			message: "Invalid date",
		});
	});

	it("should return an error object if retrieval fails", async () => {
		ProductHistory.findAll.mockRejectedValue(new Error("Retrieval error"));
		const result = await getProductHistoriesByDateRange(
			"user",
			"2023-06-11",
			"2023-06-12"
		);
		expect(ProductHistory.findAll).toHaveBeenCalledWith({
			where: {
				date: {
					[Op.between]: [
						"2023-06-11T00:00:00.000Z",
						"2023-06-12T00:00:00.000Z",
					],
				},
			},
		});
		expect(result).toEqual({
			error: true,
			message:
				"Error retrieving histories by date range: Retrieval error",
		});
	});
});

const { transferLogsToHistory } = require("../convert");
const { Logs, User, History, Product } = require("../../database");

const logs = [
	{ id: 1, userId: 1, product: "bread", quantity: 2, date: "2022-01-01" },
	{
		id: 2,
		userId: 1,
		product: "cookies",
		quantity: 3,
		date: "2022-01-01",
	},
	{ id: 3, userId: 1, product: "cake", quantity: 1, date: "2022-01-01" },
	{ id: 4, userId: 1, product: "fruit", quantity: 2, date: "2022-01-01" },
];

const products = [
	{ id: 1, name: "bread", calories: 200, healthy: false, active: true },
	{ id: 2, name: "cookies", calories: 100, healthy: false, active: true },
	{ id: 3, name: "cake", calories: 300, healthy: false, active: true },
	{ id: 4, name: "fruit", calories: 50, healthy: true, active: true },
];

const user = { id: 1 };
const history = [
	{
		date: new Date("2022-01-01"),
		UserId: 1,
		ProductId: 1,
	},
	{
		date: new Date("2022-01-01"),
		UserId: 1,
		ProductId: 1,
	},
	{
		date: new Date("2022-01-01"),
		UserId: 1,
		ProductId: 2,
	},
	{
		date: new Date("2022-01-01"),
		UserId: 1,
		ProductId: 2,
	},
	{
		date: new Date("2022-01-01"),
		UserId: 1,
		ProductId: 2,
	},
	{
		date: new Date("2022-01-01"),
		UserId: 1,
		ProductId: 3,
	},
	{
		date: new Date("2022-01-01"),
		UserId: 1,
		ProductId: 4,
	},
	{
		date: new Date("2022-01-01"),
		UserId: 1,
		ProductId: 4,
	},
];

jest.mock("../../database", () => {
	return {
		Logs: {
			findAll: jest.fn().mockImplementation((options) => {
				if (options.where.userId === 1) {
					return Promise.resolve(logs);
				} else if (options.where.userId === 2) {
					return Promise.resolve([]);
				}
				throw new Error("Database error occurred");
			}),
		},
		Product: {
			findAll: jest.fn().mockResolvedValue(products),
		},
		User: {
			findByPk: jest.fn().mockResolvedValue(user),
		},
		History: {
			bulkCreate: jest.fn(),
		},
	};
});

describe("transferLogsToHistory", () => {
	beforeAll(() => {
		jest.clearAllMocks();
	});

	it("should transfer logs to history for a user with logs", async () => {
		await transferLogsToHistory(1, logs);

		expect(User.findByPk).toHaveBeenCalledTimes(1);
		expect(User.findByPk).toHaveBeenCalledWith(1);

		expect(Product.findAll).toHaveBeenCalledTimes(1);

		expect(History.bulkCreate).toHaveBeenCalledTimes(1);
		expect(History.bulkCreate).toHaveBeenCalledWith(history);
	});
	it("should throw an error if an invalid user ID is provided", async () => {
		await expect(transferLogsToHistory(undefined, logs)).rejects.toThrow();
		await expect(transferLogsToHistory(null, logs)).rejects.toThrow();
		await expect(transferLogsToHistory("abc", logs)).rejects.toThrow();
		await expect(transferLogsToHistory({}, logs)).rejects.toThrow();
		await expect(transferLogsToHistory([], logs)).rejects.toThrow();
	});

	it("should return undefined if logs array is empty", async () => {
		const result = await transferLogsToHistory(1, []);
		expect(User.findByPk).not.toHaveBeenCalled();
		expect(Product.findAll).not.toHaveBeenCalled();
		expect(History.bulkCreate).not.toHaveBeenCalled();
		expect(result).toBeUndefined();
	});

	it("should throw an error if the bulkCreate database call fails", async () => {
		const errorMessage = "Database error";
		History.bulkCreate.mockRejectedValue(new Error(errorMessage));
		await expect(transferLogsToHistory(1, logs)).rejects.toThrow(
			errorMessage
		);

		expect(User.findByPk).toHaveBeenCalledTimes(1);
		expect(User.findByPk).toHaveBeenCalledWith(1);

		expect(Product.findAll).toHaveBeenCalledTimes(1);

		expect(History.bulkCreate).toHaveBeenCalledTimes(1);
		expect(History.bulkCreate).toHaveBeenCalledWith(history);
	});
});

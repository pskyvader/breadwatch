const { transferLogsToHistory } = require("../convert");
const { Logs, User, History, Product } = require("../../database");

const logs = [
	{
		date: "2022-01-01",
		bread: 2,
		cookie: 3,
		cake: 0,
		fruit: 1,
		vegetable: 0,
		walk: true,
	},
	{
		date: "2022-01-02",
		bread: 3,
		cookie: 2,
		cake: 1,
		fruit: 0,
		vegetable: 0,
		walk: false,
	},
	{
		date: "2022-01-03",
		bread: 1,
		cookie: 0,
		cake: 1,
		fruit: 4,
		vegetable: 5,
		walk: true,
	},
];
const products = [
	{ id: 1, name: "bread", calories: 200, healthy: false, active: true },
	{ id: 2, name: "cookie", calories: 100, healthy: false, active: true },
	{ id: 3, name: "cake", calories: 300, healthy: false, active: true },
	{ id: 4, name: "fruit", calories: 50, healthy: true, active: true },
	{ id: 5, name: "vegetable", calories: 50, healthy: true, active: true },
	{ id: 6, name: "walk", calories: 0, healthy: true, active: true },
];

const user = { id: 1 };
const history = [
	{ date: new Date("2022-01-01T00:00:00.000Z"), UserId: 1, ProductId: 1 },
	{ date: new Date("2022-01-01T00:00:00.000Z"), UserId: 1, ProductId: 1 },
	{ date: new Date("2022-01-01T00:00:00.000Z"), UserId: 1, ProductId: 2 },
	{ date: new Date("2022-01-01T00:00:00.000Z"), UserId: 1, ProductId: 2 },
	{ date: new Date("2022-01-01T00:00:00.000Z"), UserId: 1, ProductId: 2 },
	{ date: new Date("2022-01-01T00:00:00.000Z"), UserId: 1, ProductId: 4 },
	{ date: new Date("2022-01-01T00:00:00.000Z"), UserId: 1, ProductId: 6 },
	{ date: new Date("2022-01-02T00:00:00.000Z"), UserId: 1, ProductId: 1 },
	{ date: new Date("2022-01-02T00:00:00.000Z"), UserId: 1, ProductId: 1 },
	{ date: new Date("2022-01-02T00:00:00.000Z"), UserId: 1, ProductId: 1 },
	{ date: new Date("2022-01-02T00:00:00.000Z"), UserId: 1, ProductId: 2 },
	{ date: new Date("2022-01-02T00:00:00.000Z"), UserId: 1, ProductId: 2 },
	{ date: new Date("2022-01-02T00:00:00.000Z"), UserId: 1, ProductId: 3 },
	{ date: new Date("2022-01-03T00:00:00.000Z"), UserId: 1, ProductId: 1 },
	{ date: new Date("2022-01-03T00:00:00.000Z"), UserId: 1, ProductId: 3 },
	{ date: new Date("2022-01-03T00:00:00.000Z"), UserId: 1, ProductId: 4 },
	{ date: new Date("2022-01-03T00:00:00.000Z"), UserId: 1, ProductId: 4 },
	{ date: new Date("2022-01-03T00:00:00.000Z"), UserId: 1, ProductId: 4 },
	{ date: new Date("2022-01-03T00:00:00.000Z"), UserId: 1, ProductId: 4 },
	{ date: new Date("2022-01-03T00:00:00.000Z"), UserId: 1, ProductId: 5 },
	{ date: new Date("2022-01-03T00:00:00.000Z"), UserId: 1, ProductId: 5 },
	{ date: new Date("2022-01-03T00:00:00.000Z"), UserId: 1, ProductId: 5 },
	{ date: new Date("2022-01-03T00:00:00.000Z"), UserId: 1, ProductId: 5 },
	{ date: new Date("2022-01-03T00:00:00.000Z"), UserId: 1, ProductId: 5 },
	{ date: new Date("2022-01-03T00:00:00.000Z"), UserId: 1, ProductId: 6 },
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
			findByPk: jest.fn().mockImplementation((id) => {
				if (id && typeof id === "number" && id > 0) {
					return Promise.resolve(user);
				} else {
					return Promise.reject(new Error("Invalid user ID"));
				}
			}),
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
		jest.clearAllMocks();
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
		jest.clearAllMocks();
		const result = await transferLogsToHistory(1, []);
		expect(User.findByPk).not.toHaveBeenCalled();
		expect(Product.findAll).not.toHaveBeenCalled();
		expect(History.bulkCreate).not.toHaveBeenCalled();
		expect(result).toBeUndefined();
	});

	it("should throw an error if the bulkCreate database call fails", async () => {
		jest.clearAllMocks();
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
	it("should throw an error for invalid product names", async () => {
		jest.clearAllMocks();
        const products = [
            { id: 1, name: "bread", calories: 200, healthy: false, active: true },
            { id: 2, name: "cookie", calories: 100, healthy: false, active: true },
            { id: 3, name: "cake", calories: 300, healthy: false, active: true },
            { id: 4, name: "fruit", calories: 50, healthy: true, active: true },
            { id: 5, name: "vegetable", calories: 50, healthy: true, active: true },
        ];//removed product "walk"
        Product.findAll.mockResolvedValue(products);


		await expect(transferLogsToHistory(1, logs)).rejects.toThrow(
			"Invalid product name: walk"
		);

		expect(User.findByPk).toHaveBeenCalledTimes(1);
		expect(User.findByPk).toHaveBeenCalledWith(1);

		expect(Product.findAll).toHaveBeenCalledTimes(1);

		expect(History.bulkCreate).not.toHaveBeenCalled();
	});
});

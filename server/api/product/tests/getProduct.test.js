const { Product } = require("../../../database");
const { getProduct, getAllProducts } = require("../getProduct");

// Mock Product model and functions
jest.mock("../../../database", () => ({
	Product: {
		findByPk: jest.fn(),
		findAll: jest.fn(),
	},
}));

describe("getProduct function", () => {
	beforeEach(() => {
		// Clear all mock calls between tests
		jest.clearAllMocks();
	});

	test("should return error if idProduct is missing", async () => {
		const result = await getProduct();
		expect(result).toEqual({
			error: true,
			message: "Invalid id. Id must be a positive integer.",
		});
	});

	test("should return error if idProduct is invalid", async () => {
		const result = await getProduct("invalid_id");
		expect(result).toEqual({
			error: true,
			message: "Invalid id. Id must be a positive integer.",
		});
	});

	test("should return error if product is not found", async () => {
		Product.findByPk.mockResolvedValueOnce(null); // mock the database function to return null

		const result = await getProduct(1);
		expect(Product.findByPk).toHaveBeenCalledWith(1);
		expect(result).toEqual({
			error: true,
			message: "Product not found",
		});
	});

	test("should return product if found", async () => {
		// Mock Product.findByPk to return a mock product
		const mockProduct = { id: 1, name: "Mock Product" };
		Product.findByPk.mockResolvedValueOnce(mockProduct); // mock the database function to return null

		const result = await getProduct(1);
		expect(Product.findByPk).toHaveBeenCalledWith(1);
		expect(result).toEqual(mockProduct);
	});

	test("should return error if database throws an error", async () => {
		// Mock Product.findByPk to throw an error
		Product.findByPk.mockRejectedValue(new Error("Database error"));

		const result = await getProduct(1);
		expect(Product.findByPk).toHaveBeenCalledWith(1);
		expect(result).toEqual({
			error: true,
			message: "Get product error: Database error",
		});
	});
});

describe("getAllProducts", () => {
	it("should return all products when active is undefined", async () => {
		Product.findAll.mockResolvedValue([
			{ id: 1, name: "Product 1" },
			{ id: 2, name: "Product 2" },
		]);
		const result = await getAllProducts();
		expect(result).toEqual([
			{ id: 1, name: "Product 1" },
			{ id: 2, name: "Product 2" },
		]);
	});

	it("should return all active products when active is true", async () => {
		Product.findAll.mockResolvedValue([
			{ id: 1, name: "Product 1", active: true },
			{ id: 2, name: "Product 2", active: true },
		]);
		const result = await getAllProducts(true);
		expect(result).toEqual([
			{ id: 1, name: "Product 1", active: true },
			{ id: 2, name: "Product 2", active: true },
		]);
	});

	it("should return all inactive products when active is false", async () => {
		Product.findAll.mockResolvedValue([
			{ id: 3, name: "Product 3", active: false },
		]);
		const result = await getAllProducts(false);
		expect(result).toEqual([{ id: 3, name: "Product 3", active: false }]);
	});

	it("should return an error when active is not a boolean", async () => {
		const result = await getAllProducts("invalid");
		expect(result).toEqual({
			error: true,
			message:
				"Invalid active value. Active must be a boolean (true or false).",
		});
	});

	it("should return an error when the database query fails", async () => {
		const error = new Error("Database query error");
		Product.findAll.mockRejectedValue(error);
		const result = await getAllProducts();
		expect(result).toEqual({
			error: true,
			message: "Get all Products error: Database query error",
		});
	});
});

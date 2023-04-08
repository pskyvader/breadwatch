const { getProduct, getAllProducts } = require("../getProduct");
const { Product } = require("../../../database");

jest.mock("../../../database", () => ({
	Product: {
		findByPk: jest.fn(),
		findAll: jest.fn(),
	},
}));

describe("getProduct", () => {
	test("returns error when idProduct is missing", async () => {
		const result = await getProduct();
		expect(result).toEqual({
			error: true,
			message: "Missing required fields",
		});
	});

	test("returns error when product is not found", async () => {
		Product.findByPk.mockResolvedValue(null);
		const result = await getProduct(123);
		expect(result).toEqual({ error: true, message: "Product not found" });
	});

	test("returns product when found", async () => {
		const product = { id: 123, name: "Test Product" };
		Product.findByPk.mockResolvedValue(product);
		const result = await getProduct(123);
		expect(result).toEqual(product);
	});

	test("returns error when there's an error getting the product", async () => {
		Product.findByPk.mockRejectedValue(new Error("Database error"));
		const result = await getProduct(123);
		expect(result).toEqual({
			error: true,
			message: "Get Product error: Database error",
		});
	});
});

describe("getAllProducts", () => {
	test("returns all active products when active is true", async () => {
		const activeProducts = [
			{ id: 1, name: "Active Product 1", active: true },
			{ id: 2, name: "Active Product 2", active: true },
		];
		Product.findAll.mockResolvedValue(activeProducts);
		const result = await getAllProducts(true);
		expect(result).toEqual(activeProducts);
	});

	test("returns all inactive products when active is false", async () => {
		const inactiveProducts = [
			{ id: 3, name: "Inactive Product 1", active: false },
			{ id: 4, name: "Inactive Product 2", active: false },
		];
		Product.findAll.mockResolvedValue(inactiveProducts);
		const result = await getAllProducts(false);
		expect(result).toEqual(inactiveProducts);
	});

	test("returns all products when active is null", async () => {
		const allProducts = [
			{ id: 1, name: "Active Product 1", active: true },
			{ id: 2, name: "Active Product 2", active: true },
			{ id: 3, name: "Inactive Product 1", active: false },
			{ id: 4, name: "Inactive Product 2", active: false },
		];
		Product.findAll.mockResolvedValue(allProducts);
		const result = await getAllProducts(null);
		expect(result).toEqual(allProducts);
	});

	test("returns error when there's an error getting the products", async () => {
		Product.findAll.mockRejectedValue(new Error("Database error"));
		const result = await getAllProducts(true);
		expect(result).toEqual({
			error: true,
			message: "Get all Products error: Database error",
		});
	});
});

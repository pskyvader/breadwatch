const { getProduct, getAllProducts } = require("../getProduct");
const { Product } = require("../../../database");

jest.mock("../../../database", () => ({
	Product: {
		findByPk: jest.fn(),
		findAll: jest.fn(),
	},
}));

describe("getProduct", () => {
	test("should return an error if idProduct is missing", async () => {
		const result = await getProduct();
		expect(result).toEqual({
			error: true,
			message: "Missing required fields",
		});
	});

	test("should return an error if product is not found", async () => {
		Product.findByPk.mockResolvedValueOnce(null);
		const result = await getProduct(2);
		expect(result).toEqual({
			error: true,
			message: "Product not found",
		});
	});

	test("should return the product if it exists", async () => {
		const mockedProduct = {
			id: 1,
			name: "Mocked product",
			calories: 100,
			healthy: true,
			active: true,
		};
		Product.findByPk.mockResolvedValueOnce(mockedProduct);
		const result = await getProduct(mockedProduct.id);
		expect(result).toEqual(mockedProduct);
	});

	test("should return an error if there's a database error", async () => {
		Product.findByPk.mockRejectedValueOnce(new Error("Database error"));
		const result = await getProduct(1);
		expect(result).toEqual({
			error: true,
			message: "Get Product error: Database error",
		});
	});
});

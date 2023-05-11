const { updateProduct } = require("../updateProduct");
const { Product } = require("../../../database");

jest.mock("../../../database", () => ({
	Product: {
		create: jest.fn().mockResolvedValue({
			id: 1,
			name: "Existing Product",
			calories: 100,
			healthy: true,
			active: true,
			update: jest.fn().mockResolvedValue([1]),
		}),
	},
}));

describe("updateProduct", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("should update product with valid fields", async () => {
		const mockProduct = await Product.create();
		const mockNewProduct = {
			name: "New Product Name",
			calories: 200,
			healthy: true,
			active: false,
		};
		await updateProduct(mockProduct, mockNewProduct);
		expect(mockProduct.update).toHaveBeenCalledWith(mockNewProduct);
	});

	test("should return error for missing required fields", async () => {
		const mockProduct = await Product.create();

		const result = await updateProduct(mockProduct, {});

		expect(result).toEqual({
			error: true,
			message: "Missing required fields",
		});
		expect(mockProduct.update).not.toHaveBeenCalled();
	});

	test("should return error for invalid field values", async () => {
		const mockProduct = await Product.create();

		const result = await updateProduct(mockProduct, {
			name: 123,
			calories: "invalid",
			healthy: "yes",
			active: 1,
		});

		expect(result).toEqual({
			error: true,
			message: expect.stringContaining("Invalid"),
		});
		expect(mockProduct.update).not.toHaveBeenCalled();
	});
});

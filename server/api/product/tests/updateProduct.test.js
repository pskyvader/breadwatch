const { updateProduct } = require("../updateProduct");
const { Product } = require("../../../database");

jest.mock("../../../database", () => ({
	Product: {
		create: jest.fn(),
		update: jest.fn(),
	},
}));

describe("updateProduct", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("should update product with valid fields", async () => {
		const mockProduct = await Product.create({
			id: 1,
			name: "Existing Product",
			calories: 100,
			healthy: true,
			active: true,
		});

		mockProduct.update = jest.fn().mockResolvedValue();
		Product.update.mockResolvedValue([1]);

		await updateProduct(mockProduct, {
			name: "New Product Name",
			calories: 200,
			healthy: true,
			active: false,
		});

		expect(Product.update).toHaveBeenCalledWith(
			{
				name: "New Product Name",
				calories: 200,
				healthy: true,
				active: false,
			},
			{ where: { id: 1 } }
		);
	});

	test("should return error for missing required fields", async () => {
		const mockProduct = await Product.create({
			id: 1,
			name: "Existing Product",
			calories: 100,
			healthy: true,
			active: true,
		});

		const result = await updateProduct(mockProduct, {});

		expect(result).toEqual({
			error: true,
			message: "Missing required fields",
		});
		expect(Product.update).not.toHaveBeenCalled();
	});

	test("should return error for invalid field values", async () => {
		const mockProduct = await Product.create({
			id: 1,
			name: "Existing Product",
			calories: 100,
			healthy: true,
			active: true,
		});

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
		expect(Product.update).not.toHaveBeenCalled();
	});
});

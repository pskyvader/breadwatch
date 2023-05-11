const { createProduct } = require("../createProduct"); // Replace "your-module" with the correct module path
const { Product } = require("../../../database");

jest.mock("../../../database", () => ({
	Product: {
		create: jest.fn(),
	},
}));

describe("createProduct", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("should create product with valid fields", async () => {
		const fields = {
			name: "Product Name",
			calories: 100,
			healthy: true,
			active: true,
		};

		const expectedResult = { id: 1, ...fields };
		Product.create.mockResolvedValue(expectedResult);

		const result = await createProduct(fields);

		expect(result).toEqual(expectedResult);
		expect(Product.create).toHaveBeenCalledWith(fields);
	});

	test("should return error for missing required fields", async () => {
		const fields = {};

		const expectedResult = {
			error: true,
			message: "Missing required fields",
		};

		const result = await createProduct(fields);

		expect(result).toEqual(expectedResult);
		expect(Product.create).not.toHaveBeenCalled();
	});

	test("should return error for invalid field values", async () => {
		const fields = {
			name: 123,
			calories: "invalid",
			healthy: "yes",
			active: 1,
		};

		const expectedError = expect.objectContaining({
			error: true,
			message: expect.stringContaining("Invalid"),
		});

		const result = await createProduct(fields);

		expect(result).toEqual(expectedError);
		expect(Product.create).not.toHaveBeenCalled();
	});
});

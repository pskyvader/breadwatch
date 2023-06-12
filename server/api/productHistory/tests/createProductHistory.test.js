const { createProductHistory } = require("../createProductHistory");
const { ProductHistory } = require("../../../database");

// Mock Product model and functions
jest.mock("../../../database", () => ({
	ProductHistory: {
		create: jest.fn(),
	},
}));

describe("createProductHistory", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should create a product history entry", async () => {
		// Mock data
		const product = { id: 1 };
		const user = { id: 1 };

		// Mock the create method of ProductHistory model
		ProductHistory.create.mockResolvedValue({
			UserId: user.id,
			ProductId: product.id,
		});

		// Call the function
		const result = await createProductHistory(product, user);

		// Assert the result
		expect(result).toEqual({ UserId: user.id, ProductId: product.id });

		// Verify the create method was called with the correct arguments
		expect(ProductHistory.create).toHaveBeenCalledWith({
			UserId: user.id,
			ProductId: product.id,
		});
	});

	it("should return an error object if creation fails", async () => {
		// Mock data
		const product = { id: 1 };
		const user = { id: 1 };

		// Mock the create method of ProductHistory model to throw an error
		const errorMessage = "Creation failed";
		ProductHistory.create.mockRejectedValue(new Error(errorMessage));

		// Call the function
		const result = await createProductHistory(product, user);

		// Assert the error object
		expect(result).toEqual({
			error: true,
			message: "Create history error: " + errorMessage,
		});

		// Verify the create method was called with the correct arguments
		expect(ProductHistory.create).toHaveBeenCalledWith({
			UserId: user.id,
			ProductId: product.id,
		});
	});
});

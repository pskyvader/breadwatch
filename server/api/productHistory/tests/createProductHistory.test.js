const { createProductHistory } = require("../createProductHistory");

const { Product, User, ProductHistory } = require("../../../database");

// Mock Product model and functions
jest.mock("../../../database", () => ({
	Product: {
		create: jest.fn(),
	},
	User: {
		create: jest.fn(),
	},
	ProductHistory: {
		create: jest.fn(),
	},
}));

describe("createProductHistory function", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should create a product history entry", async () => {
		// Test setup
		const product = { id: 1 };
		const user = { id: 1 };

		// Call the function
		const result = await createProductHistory(product, user);

		// Assert the result
		expect(result).not.toHaveProperty("error");
		expect(result).toHaveProperty("UserId", user.id);
		expect(result).toHaveProperty("ProductId", product.id);
	});

	it("should return an error object if creation fails", async () => {
		// Test setup
		const product = { id: 1 };
		const user = { id: 1 };

		// Simulate creation failure
		jest.spyOn(ProductHistory, "create").mockRejectedValue(
			new Error("Creation failed")
		);

		// Call the function
		const result = await createProductHistory(product, user);

		// Assert the error object
		expect(result).toHaveProperty("error", true);
		expect(result).toHaveProperty(
			"message",
			"Create history error: Creation failed"
		);
	});
});

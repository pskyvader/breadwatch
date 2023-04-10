require("dotenv").config();
const { Logs } = require("../database");

const getAllLogs = async () => {
	const logs = await Logs.findAll({
		order: [["date", "ASC"]],
	});
	if (logs === null) {
		return [];
	}
	console.log(logs);
	return logs;
};

getAllLogs();

const transferLogsToHistory = async (userId, logs, productList) => {
	const user = await User.findByPk(userId);
	const products = await Product.findAll({
	  where: {
		name: {
		  [Op.in]: productList
		}
	  }
	});
  
	const historyData = [];
	for (const log of logs) {
	  const product = products.find(p => p.name === log.product);
	  if (product) {
		for (let i = 0; i < log.quantity; i++) {
		  historyData.push({
			date: log.date,
			UserId: user.id,
			ProductId: product.id
		  });
		}
	  }
	}
  
	await History.bulkCreate(historyData);
  };
  
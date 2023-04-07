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

const { getLogs } = require("/logs");

const getBread = async (date = Date.now()) => {
	const currentLog = await getLogs(date);
	if (currentLog.error) {
		return currentLog;
	}
	return currentLog.bread;
};

module.exports = { getBread };

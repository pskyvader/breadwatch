const { Logs } = require("../database");

const getLogs = async (date = Date.now()) => {
	const logs = await Logs.findOne({
		where: {
			date: {
				[Op.lte]: date,
			},
		},
	});
	if (logs === null) {
		return Logs.create({ date: date }).catch((err) => {
			return { error: true, message: "Create log error:" + err.message };
		});
	}
	return logs;
};

module.exports = { getLogs };

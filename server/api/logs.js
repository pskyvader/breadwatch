const { Op } = require("sequelize");
const { Logs } = require("../database");

const BREAD = 1;
const CAKE = 2;
const COOKIE = 3;
const WALK = 4;

const updateLogs = async (date = Date.now(), element = null, quantity = 1) => {
	const logs = await getLogs(date);
	if (logs.error) {
		return logs;
	}
	let newbread = logs.bread;
	let newcake = logs.cake;
	let newcookie = logs.cookie;
	let newwalk = logs.walk;
	if (element == BREAD) {
		newbread = logs.bread + quantity;
		if (newbread < 0) {
			newbread = 0;
		}
	}
	if (element == CAKE) {
		newcake = logs.cake + quantity;
		if (newcake < 0) {
			newcake = 0;
		}
	}
	if (element == COOKIE) {
		newcookie = logs.cookie + quantity;
		if (newcookie < 0) {
			newcookie = 0;
		}
	}
	if (element == WALK) {
		newwalk = quantity === 1 ? true : false;
	}

	const updatedLog = await logs.update({
		bread: newbread,
		cake: newcake,
		cookie: newcookie,
		walk: newwalk,
	});
	return {
		bread: updatedLog.bread,
		cake: updatedLog.cake,
		cookie: updatedLog.cookie,
		walk: updatedLog.walk,
		date: updatedLog.date,
	};
};

const getLogs = async (date = Date.now()) => {
	const logs = await Logs.findOne({
		where: {
			date: date,
		},
	});
	if (logs === null) {
		return Logs.create({ date: date }).catch((err) => {
			return { error: true, message: "Create log error:" + err.message };
		});
	}
	return logs;
};

module.exports = { getLogs, updateLogs, BREAD, CAKE, COOKIE, WALK };

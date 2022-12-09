// const { Op } = require("sequelize");
const { Logs } = require("../database");

const BREAD = "bread";
const CAKE = "cake";
const COOKIE = "cookie";
const FRUIT = "fruit";
const VEGETABLE = "vegetable";
const WALK = "walk";

const updateLogs = async (date = Date.now(), element = null, quantity = 1) => {
	const logs = await getLogs(date);
	if (logs.error) {
		return logs;
	}
	let newbread = logs.bread;
	let newcake = logs.cake;
	let newcookie = logs.cookie;
	let newfruit = logs.fruit;
	let newvegetable = logs.vegetable;
	let newwalk = logs.walk;

	if (element == BREAD) {
		newbread = logs.bread + quantity;
	}
	if (element == CAKE) {
		newcake = logs.cake + quantity;
	}

	if (element == COOKIE) {
		newcookie = logs.cookie + quantity;
	}
	if (element == FRUIT) {
		newfruit = logs.fruit + quantity;
	}
	if (element == VEGETABLE) {
		newvegetable = logs.vegetable + quantity;
	}

	if (element == WALK) {
		newwalk = quantity === 1 ? true : false;
	}

	const updatedLog = await logs.update({
		bread: (newbread >= 0 && newbread) || 0,
		cake: (newcake >= 0 && newcake) || 0,
		cookie: (newcookie >= 0 && newcookie) || 0,
		fruit: (newfruit >= 0 && newfruit) || 0,
		vegetable: (newvegetable >= 0 && newvegetable) || 0,
		walk: newwalk,
	});
	return {
		bread: updatedLog.bread,
		cake: updatedLog.cake,
		cookie: updatedLog.cookie,
		fruit: updatedLog.fruit,
		vegetable: updatedLog.vegetable,
		walk: updatedLog.walk,
		date: updatedLog.date,
	};
};

const getLogs = async (date = Date.now()) => {
	const logs = await Logs.findOne({
		where: {
			date: date,
		},
	}).catch((err) => {
		return { error: true, message: "find One log error:" + err.message };
	});
	if (logs === null) {
		return Logs.create({ date: date }).catch((err) => {
			return { error: true, message: "Create log error:" + err.message };
		});
	}
	return logs;
};

const getAllLogs = async () => {
	const logs = await Logs.findAll({
		order: [["date", "ASC"]],
	});
	if (logs === null) {
		return [];
	}
	return logs;
};

module.exports = { getAllLogs, getLogs, updateLogs, BREAD, CAKE, COOKIE, WALK };

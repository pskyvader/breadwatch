const { Activity } = require("../../database");
const { validateId, validateActive } = require("./validations");

const getActivity = (idActivity) => {
	try {
		validateId(idActivity);
	} catch (error) {
		return { error: true, message: error.message };
	}
	return Activity.findByPk(idActivity)
		.then((Activity) => {
			if (Activity === null) {
				return {
					error: true,
					message: "Activity not found",
				};
			}
			return Activity;
		})
		.catch((err) => {
			return {
				error: true,
				message: "Get Activity error: " + err.message,
			};
		});
};

const getAllActivities = (active = undefined) => {
	if (active !== undefined) {
		try {
			if (active) {
				validateActive(active);
			}
		} catch (error) {
			return { error: true, message: error.message };
		}
	}
	const where = active !== undefined ? { active: active } : {};

	return Activity.findAll({ where: where }).catch((err) => {
		return {
			error: true,
			message: "Get all Activities error: " + err.message,
		};
	});
};

module.exports = {
	getActivity,
	getAllActivities,
};

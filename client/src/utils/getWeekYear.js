const getWeekYear = (currentDate) => {
	const startDate = new Date(currentDate.getFullYear(), 0, 1);
	const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));

	const weekNumber = Math.ceil(days / 7);
	return weekNumber;
};

export default getWeekYear;

// weekday: 0 = Sunday, 1 = Monday, etc.
export const getPreviousWeekdayDate = (weekday: number) => {
	const date = new Date();
	const diff = weekday !== 0 ? ((date.getDay() - weekday + 7) % 7) + 7 : (date.getDay() - weekday + 7) % 7;
	date.setDate(date.getDate() - diff);
	return date;
};

export const getYesterday = () => {
	const date = new Date();
	date.setDate(date.getDate() - 1);
	return date;
};

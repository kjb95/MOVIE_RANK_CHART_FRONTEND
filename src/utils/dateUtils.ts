// weekday: 0 = Sunday, 1 = Monday, etc.
export const getPreviousWeekdayDate = (weekday: number): Date => {
	const date = new Date();
	const diff = weekday !== 0 ? ((date.getDay() - weekday + 7) % 7) + 7 : (date.getDay() - weekday + 7) % 7;
	date.setDate(date.getDate() - diff);
	return date;
};

export const getYesterday = (): Date => {
	const date = new Date();
	date.setDate(date.getDate() - 1);
	return date;
};

export const formatDate = (date: Date) => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}${month}${day}`;
};

export const getPreviousWeekSunday = (): Date => {
	const date = new Date();
	const day = date.getDay() == 0 ? 7 : date.getDay();
	return new Date(date.setDate(date.getDate() - day));
};

export const getPreviousWeekMonday = (): Date => {
	return new Date(getPreviousWeekSunday().setDate(getPreviousWeekSunday().getDate() - 6));
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

export const formatTimeChat = (dateString: string) => {
	const inputDate = new Date(dateString);
	const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
	const formatter = new Intl.DateTimeFormat('ko-KR', options);
	return formatter.format(inputDate);
};

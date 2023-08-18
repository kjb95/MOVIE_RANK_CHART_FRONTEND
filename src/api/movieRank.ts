import { api } from '@/api/api';

export const findMovieRankApi = (date: String, movieRankType: String) => {
	return api.get(`/v1/movie-rank/top-ten`, {
		params: { date, movieRankType },
	});
};

export const findMovieRankBarChartApi = (movieId: String) => {
	return api.get(`/v1/movie-rank/line-chart/` + movieId);
};

export const findMovieRankLineChartApi = (startDate: String, endDate: String) => {
	return api.get(`/v1/movie-rank/line-chart`, {
		params: { startDate, endDate },
	});
};

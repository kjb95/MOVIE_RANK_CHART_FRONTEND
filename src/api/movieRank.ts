import { api } from '@/api/api';

export const findMovieRankApi = (date: String, movieRankType: String) => {
	return api.get(`/v1/movie-rank/top-ten`, {
		params: { date: date, movieRankType: movieRankType },
	});
};

export const findMovieRankLineChartApi = (movieId: String) => {
	return api.get(`/v1/movie-rank/line-chart/` + movieId);
};

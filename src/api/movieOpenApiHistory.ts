import { api } from '@/api/api';

export const findMovieRankDataRangeApi = () => {
	return api.get(`/v1/movie-open-api-history`);
};

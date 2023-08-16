import { api } from '@/api/api';

export const findMoviesByTitleApi = (title: String, isConsiderSomeoneChatroom: boolean) => {
	return api.get('/v1/movies/', {
		params: { title, isConsiderSomeoneChatroom },
	});
};

export const findMoviesByIdApi = (id: string) => {
	return api.get(`/v1/movies/`, {
		params: { id },
	});
};

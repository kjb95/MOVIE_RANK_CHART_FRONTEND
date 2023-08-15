import { api } from '@/api/api';

export const findMoviesApi = (isConsiderSomeoneChatroom: boolean, title: String) => {
	return api.get('/v1/movies', {
		params: { isConsiderSomeoneChatroom: isConsiderSomeoneChatroom, title: title },
	});
};

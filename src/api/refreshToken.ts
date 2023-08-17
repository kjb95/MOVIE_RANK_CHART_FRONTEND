import { api } from '@/api/api';

export const deleteRefreshTokenApi = () => {
	return api.delete('/v1/refresh-token');
};

export const createAccessTokenApi = () => {
	return api.post('/v1/refresh-token/access-token');
};

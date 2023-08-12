import { api } from '@/api/api';

export const deleteRefreshTokenApi = () => {
	return api.delete('/v1/refresh-token');
};

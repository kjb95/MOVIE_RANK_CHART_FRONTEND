import { api } from '@/api/api';

export const findUserApi = () => {
	return api.get('/v1/users');
};

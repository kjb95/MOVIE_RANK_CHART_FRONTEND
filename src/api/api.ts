import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

import { useCookies } from 'vue3-cookies';
import { ACCESS_TOKEN_COOKIE_KEY_NAME, AUTHORIZATION_HEADER_NAME, BACKEND_BASE_URL, BEARER, REFRESH_TOKEN_COOKIE_KEY_NAME, REFRESH_TOKEN_HEADER_NAME } from '@/constants/api';

const { cookies } = useCookies();

axios.defaults.baseURL = BACKEND_BASE_URL;
export const api = axios.create();
const addToken = (config: InternalAxiosRequestConfig<any>) => {
	const accessToken = cookies.get(ACCESS_TOKEN_COOKIE_KEY_NAME);
	config.withCredentials = false;
	config.headers[AUTHORIZATION_HEADER_NAME] = BEARER + accessToken;
	return config;
};

api.interceptors.request.use(addToken);

const onRejected = (error: any) => {
	error.config.withCredentials = true;
	if (error.response.status !== 401) {
		return Promise.reject(error);
	}
	const originalRequest = error.config;
	const refreshToken = cookies.get(REFRESH_TOKEN_COOKIE_KEY_NAME);
	axios.defaults.headers[REFRESH_TOKEN_HEADER_NAME] = BEARER + refreshToken;
	return axios(originalRequest);
};

api.interceptors.response.use(
	(config: AxiosResponse<any, any>) => config,
	(error: any) => onRejected(error),
);

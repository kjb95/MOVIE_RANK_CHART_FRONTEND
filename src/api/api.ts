import axios, { type InternalAxiosRequestConfig } from 'axios';

import { useCookies } from 'vue3-cookies';
import { ACCESS_TOKEN_COOKIE_KEY_NAME, AUTHORIZATION_HEADER_NAME, BACKEND_BASE_URL, BEARER, REFRESH_TOKEN_COOKIE_KEY_NAME, REFRESH_TOKEN_HEADER_NAME } from '@/constants/api';

const { cookies } = useCookies();

axios.defaults.baseURL = BACKEND_BASE_URL;
axios.defaults.withCredentials = true;
export const api = axios.create();
const addToken = (config: InternalAxiosRequestConfig<any>) => {
	const accessToken = cookies.get(ACCESS_TOKEN_COOKIE_KEY_NAME);
	const refreshToken = cookies.get(REFRESH_TOKEN_COOKIE_KEY_NAME);
	config.headers[AUTHORIZATION_HEADER_NAME] = BEARER + accessToken;
	config.headers[REFRESH_TOKEN_HEADER_NAME] = BEARER + refreshToken;
	console.log('at : ', accessToken);
	console.log('rt : ', refreshToken);
	return config;
};

api.interceptors.request.use(addToken);

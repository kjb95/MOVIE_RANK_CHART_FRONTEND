import { defineStore } from 'pinia';
import { findUserApi } from '@/api/users';
import { computed, reactive, ref } from 'vue';
import { useCookies } from 'vue3-cookies';
import { ACCESS_TOKEN_COOKIE_KEY_NAME } from '@/constants/api';

const { cookies } = useCookies();

export const useUsersStore = defineStore('users', () => {
	const state = reactive({ id: '', email: '', name: '', picture: '' });
	const isLogin = computed(() => computeIsLogin());

	const computeIsLogin = () => {
		if (state.id === '' && cookies.isKey(ACCESS_TOKEN_COOKIE_KEY_NAME)) {
			loadUser();
		}
		return state.id !== '';
	};

	const loadUser = () => {
		findUserApi()
			.then(res => findUserApiSuccess(res.data))
			.catch(e => console.log(e));
	};

	const findUserApiSuccess = (data: any) => {
		state.id = data.usersId;
		state.email = data.email;
		state.name = data.name;
		state.picture = data.picture;
	};

	return { state, isLogin };
});

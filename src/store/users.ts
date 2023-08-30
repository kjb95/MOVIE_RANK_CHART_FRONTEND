import { defineStore } from 'pinia';
import { findUserApi } from '@/api/users';
import { computed, reactive } from 'vue';
import { createAccessTokenApi } from '@/api/refreshToken';
export const useUsersStore = defineStore('users', () => {
	const state = reactive({ id: '', email: '', name: '', picture: '', accessToken: '' });

	const loadUser = () => {
		createAccessTokenApi().then(res => createAccessTokenApiSuccess(res.data));
	};

	const createAccessTokenApiSuccess = (data: any) => {
		// 리프레시 토큰이 유효하지 않은 경우
		if (data == '') {
			clear();
			return;
		}
		state.accessToken = data.accessToken;
		findUserApi().then(res => findUserApiSuccess(res.data));
	};

	const findUserApiSuccess = (data: any) => {
		state.id = data.usersId;
		state.email = data.email;
		state.name = data.name;
		state.picture = data.picture;
	};

	const clear = () => {
		state.id = '';
		state.email = '';
		state.name = '';
		state.picture = '';
		state.accessToken = '';
	};

	const isLogin = computed(() => state.accessToken != '' && state.id != '');

	return { state, loadUser, clear, isLogin };
});

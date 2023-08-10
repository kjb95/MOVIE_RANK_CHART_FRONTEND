<template>
	<v-list>
		<v-list-item v-if="user.isLogin" :prepend-avatar="user.state.picture" :title="user.state.name" :subtitle="user.state.email"></v-list-item>
		<v-list-item v-else :prepend-avatar="defaultPicture" @click="openOauthWindow">
			<v-list-item-title class="font-weight-bold">로그인</v-list-item-title>
		</v-list-item>
	</v-list>
	<v-divider></v-divider>
</template>

<script setup lang="ts">
import { useUsersStore } from '@/store/users';
import { useCookies } from 'vue3-cookies';
import { AUTHENTICATION_DONE_COOKIE_KEY_NAME, OAUTH2_LOGIN_URL } from '@/constants/api';

const { cookies } = useCookies();

const user = useUsersStore();
const defaultPicture = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA2wuOY5tztKyvoZ3CmDZVHlo-ayTOAi9ufg&usqp=CAU';
const openOauthWindow = () => {
	const oauthWindow = window.open(OAUTH2_LOGIN_URL, '_blank', 'width=400,height=600');
	const timer = setInterval(() => oauthAuthenticationSuccess(oauthWindow, timer), 1000);
};

const oauthAuthenticationSuccess = (oauthWindow, timer) => {
	if (!cookies.isKey(AUTHENTICATION_DONE_COOKIE_KEY_NAME)) {
		return;
	}
	clearInterval(timer);
	oauthWindow.close();
	window.location.reload();
};
</script>

<style scoped></style>

<template>
	<v-bottom-navigation v-if="user.isLogin">
		<v-btn @click="logout">
			<v-icon>mdi-exit-run</v-icon>
			<span class="font-weight-bold">로그아웃</span>
		</v-btn>
	</v-bottom-navigation>
</template>
<script setup lang="ts">
import { useCookies } from 'vue3-cookies';
import { useUsersStore } from '@/store/users';
import { ACCESS_TOKEN_COOKIE_KEY_NAME, REFRESH_TOKEN_COOKIE_KEY_NAME } from '@/constants/api';
import { deleteRefreshTokenApi } from '@/api/refreshToken';

const { cookies } = useCookies();
const user = useUsersStore();

const logout = () => {
	deleteRefreshTokenApi().then(deleteRefreshTokenApiSuccess);
};

const deleteRefreshTokenApiSuccess = () => {
	cookies.remove(ACCESS_TOKEN_COOKIE_KEY_NAME);
	cookies.remove(REFRESH_TOKEN_COOKIE_KEY_NAME);
	window.location.reload();
};
</script>
<style scoped></style>

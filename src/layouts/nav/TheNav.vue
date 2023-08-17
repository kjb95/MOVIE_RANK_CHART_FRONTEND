<template>
	<v-navigation-drawer expand-on-hover rail app>
		<v-row>
			<v-col>
				<v-list>
					<v-list-item v-if="user.state.accessToken != ''" :prepend-avatar="user.state.picture" :title="user.state.name" :subtitle="user.state.email"></v-list-item>
					<v-list-item v-else :prepend-avatar="nonLoginPhotoUrl" @click="openOauthWindow">
						<v-list-item-title class="font-weight-bold">로그인</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-col>
		</v-row>
		<v-row>
			<v-divider></v-divider>
		</v-row>
	</v-navigation-drawer>
</template>

<script setup>
import { useUsersStore } from '@/store/users';
import { useCookies } from 'vue3-cookies';
import { AUTHENTICATION_DONE_COOKIE_KEY_NAME, OAUTH2_LOGIN_URL, REFRESH_TOKEN_COOKIE_KEY_NAME } from '@/constants/api';
import { nonLoginPhotoUrl } from '@/constants/path';

const { cookies } = useCookies();

const user = useUsersStore();
const openOauthWindow = () => {
	const oauthWindow = window.open(OAUTH2_LOGIN_URL, '_blank', 'width=400,height=600');
	const timer = setInterval(() => oauthAuthenticationSuccess(oauthWindow, timer), 1000);
};

const oauthAuthenticationSuccess = (oauthWindow, timer) => {
	if (!cookies.isKey(AUTHENTICATION_DONE_COOKIE_KEY_NAME)) {
		return;
	}
	clearInterval(timer);
	cookies.remove(AUTHENTICATION_DONE_COOKIE_KEY_NAME);
	oauthWindow.close();
	window.location.reload();
};
user.loadUser();
</script>

<style scoped></style>

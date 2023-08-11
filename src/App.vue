<template>
	<v-app>
		<v-app-bar app height="100">
			<v-spacer />
			<RouterView name="header" />
			<v-spacer />
		</v-app-bar>
		<v-navigation-drawer expand-on-hover rail app>
			<TheNav />
		</v-navigation-drawer>
		<v-main app>
			<RouterView />
		</v-main>
		<v-footer app>
			<TheFooter />
		</v-footer>
	</v-app>
</template>

<script setup lang="ts">
import TheFooter from '@/layouts/footer/TheFooter.vue';
import TheNav from '@/layouts/nav/TheNav.vue';
</script>

<style>
a {
	text-decoration: none;
	color: black;
}
</style>

<template>
	<v-app>
		<v-app-bar app>
			<TheHeader />
		</v-app-bar>
		<v-navigation-drawer expand-on-hover rail app>
			<TheNav />
		</v-navigation-drawer>
		<v-main app>
			<v-container>
				<TheContents />
			</v-container>
		</v-main>
		<v-footer app>
			<TheFooter />
		</v-footer>
	</v-app>
</template>

<script setup lang="ts">
import TheHeader from '@/layouts/header/TheHeader.vue';
import TheContents from '@/layouts/section/TheSection.vue';
import TheFooter from '@/layouts/footer/TheFooter.vue';
import TheNav from '@/layouts/nav/TheNav.vue';
</script>

<style>
a {
	text-decoration: none;
}
</style>

<template>
	<v-spacer />
	<v-tabs color="pink">
		<v-tab v-for="link in links" :key="link" :to="link.path" class="text-h4 font-weight-bold">
			{{ link.name }}
		</v-tab>
	</v-tabs>
	<v-spacer />
</template>

<script setup lang="ts">
const links = [
	{
		name: '랭킹',
		path: '/rank',
	},
	{
		name: '통계',
		path: '/statistics',
	},
	{
		name: '채팅',
		path: '/chat',
	},
	{
		name: '영화상세',
		path: '/movie-detail',
	},
];
</script>

<style scoped></style>

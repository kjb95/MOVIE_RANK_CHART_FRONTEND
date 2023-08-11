<template>
	<v-tab to="/rank/total/daily" class="font-weight-bold text-h4">랭킹</v-tab>
	<div>
		<v-row justify="center">
			<RouterLink to="/statistics/line-chart" class="font-weight-bold text-h4 text-pink mt-16">통계</RouterLink>
		</v-row>
		<v-row>
			<v-tabs color="pink" v-model="activeTab">
				<RouterLink to="/statistics/line-chart">
					<v-tab class="font-weight-bold text-h5" height="48" value="/statistics/line-chart">라인차트</v-tab>
				</RouterLink>
				<RouterLink to="/statistics/pie-chart">
					<v-tab class="font-weight-bold text-h5" height="48" value="/statistics/pie-chart">파이차트</v-tab>
				</RouterLink>
			</v-tabs>
		</v-row>
	</div>
	<v-tab to="/chat" class="font-weight-bold text-h4">채팅</v-tab>
	<v-tab to="/movie-detail" class="font-weight-bold text-h4">영화상세</v-tab>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';

const route = useRoute();
const activeTab = ref(route.path);
watch(
	() => route.path,
	(newPath, oldPath) => (activeTab.value = newPath),
);
</script>

<style scoped></style>

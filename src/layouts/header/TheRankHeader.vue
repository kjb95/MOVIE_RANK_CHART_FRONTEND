<template>
	<div>
		<v-row justify="center">
			<RouterLink :to="`/rank/total/${periodType}`" class="font-weight-bold text-h4 text-pink mt-16">랭킹</RouterLink>
		</v-row>
		<v-row>
			<v-tabs color="pink" v-model="activeTab">
				<RouterLink :to="`/rank/total/${periodType}`">
					<v-tab class="font-weight-bold text-h5" height="48" :value="`/rank/total/${periodType}`">전체</v-tab>
				</RouterLink>
				<RouterLink :to="`/rank/korean/${periodType}`">
					<v-tab class="font-weight-bold text-h5" height="48" :value="`/rank/korean/${periodType}`">국내</v-tab>
				</RouterLink>
				<RouterLink :to="`/rank/foreign/${periodType}`">
					<v-tab class="font-weight-bold text-h5" height="48" :value="`/rank/foreign/${periodType}`">해외</v-tab>
				</RouterLink>
			</v-tabs>
		</v-row>
	</div>
	<v-tab to="/statistics/line-chart" class="font-weight-bold text-h4">통계</v-tab>
	<v-tab to="/chat" class="font-weight-bold text-h4">채팅</v-tab>
	<v-tab to="/movie-detail" class="font-weight-bold text-h4">영화상세</v-tab>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

defineProps({
	periodType: { Type: String, default: 'daily' },
});

const route = useRoute();
const activeTab = ref(route.path);
watch(
	() => route.path,
	(newPath, oldPath) => (activeTab.value = newPath),
);
</script>

<style scoped></style>

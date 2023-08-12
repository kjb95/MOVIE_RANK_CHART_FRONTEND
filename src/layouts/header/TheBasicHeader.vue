<template>
	<v-tabs color="pink" v-model="activeTab">
		<v-tab to="/rank/total/daily" class="font-weight-bold text-h4">랭킹</v-tab>
		<v-tab to="/statistics/line-chart" class="font-weight-bold text-h4">통계</v-tab>
		<v-tab to="/chat" class="font-weight-bold text-h4">채팅</v-tab>
		<v-tab to="/movie-detail" class="font-weight-bold text-h4">영화상세</v-tab>
	</v-tabs>
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

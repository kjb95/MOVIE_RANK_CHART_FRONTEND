<template>
	<v-tabs v-model="path" selected-class="text-pink">
		<v-tab to="/rank/total/daily" class="font-weight-bold text-h4" value="/rank/total/daily">랭킹</v-tab>
		<v-tab to="/statistics/line-chart" class="font-weight-bold text-h4" value="/statistics/line-chart">통계</v-tab>
		<v-tab to="/chat" class="font-weight-bold text-h4" value="/chat">채팅</v-tab>
		<v-tab to="/movie-details" class="font-weight-bold text-h4" :value="movieDetailsPath">영화상세</v-tab>
	</v-tabs>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, ref, watchEffect } from 'vue';

const route = useRoute();

const path = ref(route.path);

const computeMovieDetailsPath = () => {
	const pathType = path.value.split('/')[1];
	return pathType == 'movie-details' ? path.value : '';
};

const movieDetailsPath = computed(computeMovieDetailsPath);

watchEffect(() => (path.value = route.path));
</script>

<style scoped></style>

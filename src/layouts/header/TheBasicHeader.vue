<template>
	<v-tabs color="pink" v-model="path">
		<v-tab to="/rank/total/daily" class="font-weight-bold text-h4">랭킹</v-tab>
		<v-tab to="/statistics/line-chart" class="font-weight-bold text-h4">통계</v-tab>
		<v-tab to="/chat" class="font-weight-bold text-h4">채팅</v-tab>
		<v-tab to="/movie-detail" class="font-weight-bold text-h4">영화상세</v-tab>
	</v-tabs>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, watchEffect } from 'vue';

const route = useRoute();
const path = ref(route.path);
watchEffect(() => (path.value = route.path));
</script>

<style scoped></style>

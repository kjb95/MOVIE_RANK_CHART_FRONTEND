<template>
	<div></div>
	<v-row class="mt-10">
		<v-col></v-col>
		<v-col></v-col>
		<v-col>
			<v-tabs color="pink" v-model="activeTab">
				<RouterLink :to="`${pathWithoutPeriodType}/daily`">
					<v-tab class="font-weight-bold text-h5" :value="`${pathWithoutPeriodType}/daily`">일간</v-tab>
				</RouterLink>
				<RouterLink :to="`${pathWithoutPeriodType}/weekly`">
					<v-tab class="font-weight-bold text-h5" :value="`${pathWithoutPeriodType}/weekly`">주간</v-tab>
				</RouterLink>
			</v-tabs>
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const pathWithoutPeriodType = ref(window.location.pathname.split('/').slice(0, 3).join('/'));

const route = useRoute();
const activeTab = ref(route.path);
watch(
	() => route.path,
	(newPath, oldPath) => {
		activeTab.value = newPath;
		pathWithoutPeriodType.value = newPath.split('/').slice(0, 3).join('/');
	},
);
</script>

<style scoped></style>

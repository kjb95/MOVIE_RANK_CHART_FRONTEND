<template>
	<v-row class="mt-3">
		<v-col />
		<v-col />
		<v-col>
			<VueDatePicker
				v-if="periodType == 'daily'"
				v-model="dailyDate"
				:enable-time-picker="false"
				class="vueDatePickerClass"
				:min-date="movieRankDataRange.state.startDate"
				:max-date="movieRankDataRange.state.endDateDaily"
			></VueDatePicker>
			<VueDatePicker
				v-if="periodType == 'weekly'"
				v-model="weeklyDate"
				class="vueDatePickerClass"
				week-picker
				:min-date="movieRankDataRange.state.startDate"
				:max-date="movieRankDataRange.state.endDateDaily"
			></VueDatePicker>
		</v-col>
		<v-col></v-col>
		<v-col>
			<v-tabs color="pink" v-model="path">
				<RouterLink :to="`${pathWithoutPeriodType}/daily`">
					<v-tab class="font-weight-bold text-h5" :value="`${pathWithoutPeriodType}/daily`">일간</v-tab>
				</RouterLink>
				<RouterLink :to="`${pathWithoutPeriodType}/weekly`">
					<v-tab class="font-weight-bold text-h5" :value="`${pathWithoutPeriodType}/weekly`">주간</v-tab>
				</RouterLink>
			</v-tabs>
		</v-col>
	</v-row>
	<v-row v-if="movieRankData.length != 0">
		<v-col cols="2"></v-col>
		<v-col v-for="n in 5" :key="n" style="margin-left: -40px">
			<MovieInfoCard
				:title="movieRankData[n - 1].title"
				:rank-increment="movieRankData[n - 1].rankIncrement"
				:rank="movieRankData[n - 1].rank"
				:poster="movieRankData[n - 1].poster"
				:opening-date="movieRankData[n - 1].openingDate"
				:new-rank="movieRankData[n - 1].newRank"
				:audience-count="movieRankData[n - 1].audienceCount"
			/>
		</v-col>
		<v-col cols="2"></v-col>
	</v-row>
	<v-row v-if="movieRankData.length != 0">
		<v-col cols="2"></v-col>
		<v-col v-for="n in 5" :key="n" style="margin-left: -40px">
			<MovieInfoCard
				:title="movieRankData[n + 4].title"
				:rank-increment="movieRankData[n + 4].rankIncrement"
				:rank="movieRankData[n + 4].rank"
				:poster="movieRankData[n + 4].poster"
				:opening-date="movieRankData[n + 4].openingDate"
				:new-rank="movieRankData[n + 4].newRank"
				:audience-count="movieRankData[n + 4].audienceCount"
			/>
		</v-col>
		<v-col cols="2"></v-col>
	</v-row>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { findMovieRankApi } from '@/api/movieRank';
import MovieInfoCard from '@/components/rank/MovieInfoCard.vue';
import { getPreviousWeekdayDate, getYesterday } from '@/utils/dateUtils';
import { useMovieRankDataRangeStore } from '@/store/movieRankDataRange';

const route = useRoute();

const movieRankDataRange = useMovieRankDataRangeStore();

const dailyDate = ref(getYesterday());
const weeklyDate = ref([getPreviousWeekdayDate(1), getPreviousWeekdayDate(0)]);
const movieRankData = ref([]);

const computeFormattedDate = () => {
	const date = periodType.value === 'daily' ? dailyDate.value : weeklyDate?.value[0];
	return String(date?.getFullYear()).padStart(2, '0') + String(date?.getMonth() + 1).padStart(2, '0') + String(date?.getDate()).padStart(2, '0');
};
const findMovieRank = () => {
	if (movieRankDataRange.state.startDate === '') {
		movieRankDataRange.findMovieDataRange();
	}
	findMovieRankApi(formattedDate.value, formattedMovieRankType.value).then(res => (movieRankData.value = res.data.findMovieRankTopTenResponseDtos));
};

const periodType = computed(() => path.value.split('/')[3]);
const pathWithoutPeriodType = computed(() => path.value.split('/').slice(0, 3).join('/'));
const formattedDate = computed(computeFormattedDate);
const path = computed(() => route.path);
const formattedMovieRankType = computed(() => path.value.split('/').slice(2, 4).join('_').toUpperCase());

watchEffect(findMovieRank);
</script>

<style scoped>
.vueDatePickerClass {
	width: 250px;
}
</style>

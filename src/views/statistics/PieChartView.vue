<template>
	<v-container>
		<v-row>
			<v-col />
			<v-col cols="3">
				<VueDatePicker
					v-model="datePeriod"
					:enable-time-picker="false"
					class="vueDatePickerClass"
					:min-date="movieRankDataRange.state.startDate"
					:max-date="movieRankDataRange.state.endDateDaily"
					week-picker
				></VueDatePicker>
			</v-col>
			<v-col />
		</v-row>
		<PieCharts :datePeriod="datePeriod" />
	</v-container>
</template>

<script setup lang="ts">
import { useMovieRankDataRangeStore } from '@/store/movieRankDataRange';
import { ref } from 'vue';
import { getPreviousWeekdayDate } from '@/utils/dateUtils';
import PieCharts from '@/components/statistics/PieCharts.vue';

const movieRankDataRange = useMovieRankDataRangeStore();
const datePeriod = ref([getPreviousWeekdayDate(1), getPreviousWeekdayDate(0)]);

movieRankDataRange.findMovieDataRange();
</script>
<style scoped>
.vueDatePickerClass {
	width: 250px;
}
</style>

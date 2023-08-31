import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { findMovieRankDataRangeApi } from '@/api/movieOpenApiHistory';

export const useMovieRankDataRangeStore = defineStore('movieRankDataRange', () => {
	const state = reactive({ startDate: '', endDateDaily: '' });

	const findMovieDataRange = async () => {
		const data: any = await findMovieRankDataRangeApi();
		state.startDate = data.startDate;
		state.endDateDaily = data.endDateDaily;
	};

	return { state, findMovieDataRange };
});

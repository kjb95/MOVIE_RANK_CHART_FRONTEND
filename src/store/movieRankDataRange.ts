import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { findMovieRankDataRangeApi } from '@/api/movieOpenApiHistory';

export const useMovieRankDataRangeStore = defineStore('movieRankDataRange', () => {
	const state = reactive({ startDate: '', endDateDaily: '' });

	const findMovieDataRange = () => {
		findMovieRankDataRangeApi()
			.then(res => findMovieRankDataRangeApiSuccess(res.data))
			.catch(e => console.log(e));
	};

	const findMovieRankDataRangeApiSuccess = (data: any) => {
		state.startDate = data.startDate;
		state.endDateDaily = data.endDateDaily;
	};
	return { state, findMovieDataRange };
});

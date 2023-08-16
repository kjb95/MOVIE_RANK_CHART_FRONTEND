<template>
	<v-container v-if="movieTitleSearchResult.length == 0">
		<LoadingSpinner />
	</v-container>
	<v-row v-else>
		<v-col cols="2"></v-col>
		<v-col>
			<v-autocomplete
				v-model="movie"
				:items="movieTitleSearchResult"
				item-value="moviesId"
				placeholder="영화명 검색"
				no-data-text="검색 결과가 없습니다."
				auto-select-first
				prepend-inner-icon="mdi-magnify"
				rounded
				variant="solo"
			></v-autocomplete>
		</v-col>
		<v-col cols="2"></v-col>
	</v-row>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { findMoviesByTitleApi } from '@/api/movies';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';

const movie = ref();
const movieTitleSearchResult = ref([]);

findMoviesByTitleApi('', false).then(res => (movieTitleSearchResult.value = res.data.movies));

watch(movie, () => (window.location.href = '/movie-details/' + movie.value));
</script>

<style scoped></style>

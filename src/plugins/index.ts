import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

import type { Router, RouteRecordRaw } from 'vue-router';

import ChatView from '../views/chat/ChatView.vue';
import RankView from '../views/rank/RankView.vue';
import StatisticsView from '@/views/statistics/StatisticsView.vue';
import MovieDetailsView from '@/views/moviedetails/MovieDetailsView.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/rank',
		name: 'rank',
		component: RankView,
	},
	{
		path: '/statistics',
		name: 'statistics',
		component: StatisticsView,
	},
	{
		path: '/chat',
		name: 'chat',
		component: ChatView,
	},
	{
		path: '/movie-detail',
		name: 'movieDetail',
		component: MovieDetailsView,
	},
];

// vue-router의 기본 모드는 hash mode
// hash mode: URL이 변경될 때 전체 리소스 로딩없이 SPA page 이동만 발생
// history mode: page 재로딩 발생
const router: Router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;

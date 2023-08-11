import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

import type { Router, RouteRecordRaw } from 'vue-router';

import ChatView from '../views/chat/ChatView.vue';
import MovieDetailsView from '@/views/moviedetails/MovieDetailsView.vue';
import RankView from '@/views/rank/RankView.vue';
import TheStatisticsHeader from '@/layouts/header/TheStatisticsHeader.vue';
import TheRankHeader from '@/layouts/header/TheRankHeader.vue';
import LineChartView from '@/views/statistics/LineChartView.vue';
import PieChartView from '@/views/statistics/PieChartView.vue';
import TheHeader from '@/layouts/header/TheHeader.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/rank/total/daily',
		name: 'totalDailyRank',
		components: { default: RankView, header: TheRankHeader },
		props: { header: { periodType: 'daily' } },
	},
	{
		path: '/rank/korean/daily',
		name: 'koreanDailyRank',
		components: { default: RankView, header: TheRankHeader },
		props: { header: { periodType: 'daily' } },
	},
	{
		path: '/rank/foreign/daily',
		name: 'foreignDailyRank',
		components: { default: RankView, header: TheRankHeader },
		props: { header: { periodType: 'daily' } },
	},
	{
		path: '/rank/total/weekly',
		name: 'totalWeeklyRank',
		components: { default: RankView, header: TheRankHeader },
		props: { header: { periodType: 'weekly' } },
	},
	{
		path: '/rank/korean/weekly',
		name: 'koreanWeeklyRank',
		components: { default: RankView, header: TheRankHeader },
		props: { header: { periodType: 'weekly' } },
	},
	{
		path: '/rank/foreign/weekly',
		name: 'foreignWeeklyRank',
		components: { default: RankView, header: TheRankHeader },
		props: { header: { periodType: 'weekly' } },
	},
	{
		path: '/statistics/line-chart',
		name: 'lineChart',
		components: { default: LineChartView, header: TheStatisticsHeader },
	},
	{
		path: '/statistics/pie-chart',
		name: 'pieChart',
		components: { default: PieChartView, header: TheStatisticsHeader },
	},

	{ path: '/chat', name: 'chat', components: { default: ChatView, header: TheHeader } },
	{
		path: '/movie-detail',
		name: 'movieDetail',
		components: { default: MovieDetailsView, header: TheHeader },
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

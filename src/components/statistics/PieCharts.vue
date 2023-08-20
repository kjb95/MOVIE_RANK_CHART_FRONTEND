<template>
	<v-container>
		<v-row justify="center" class="mt-3">
			<v-tabs v-model="pieChartType" selected-class="text-pink">
				<v-tab class="font-weight-bold text-h5" value="sales">매출액</v-tab>
				<v-tab class="font-weight-bold text-h5" value="audienceCount">관객수</v-tab>
				<v-tab class="font-weight-bold text-h5" value="screeningsCount">상영한 스크린수</v-tab>
				<v-tab class="font-weight-bold text-h5" value="theatersCount">상영된 횟수</v-tab>
			</v-tabs>
		</v-row>
		<v-row>
			<v-chart v-if="pieChartType === 'sales'" class="chart" :option="salesPieChartOption" @click="handlePieChartClick"></v-chart>
			<v-chart v-if="pieChartType === 'audienceCount'" class="chart" :option="audienceCountPieChartOption" @click="handlePieChartClick"></v-chart>
			<v-chart v-if="pieChartType === 'screeningsCount'" class="chart" :option="screeningsCountPieChartOption" @click="handlePieChartClick"></v-chart>
			<v-chart v-if="pieChartType === 'theatersCount'" class="chart" :option="theatersCountPieChartOption" @click="handlePieChartClick"></v-chart>
		</v-row>
	</v-container>
</template>
<script setup>
import VChart from 'vue-echarts';
import { ref, watchEffect } from 'vue';
import { GraphicComponent, GridComponent, LegendComponent, TitleComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { use } from 'echarts/core';
import router from '@/plugins';
import { findMovieRankPieChartApi } from '@/api/movieRank';
import { formatDate, getPreviousWeekMonday, getPreviousWeekSunday } from '@/utils/dateUtils';

use([PieChart, GridComponent, TitleComponent, GraphicComponent, LegendComponent]);

const props = defineProps({
	datePeriod: { type: Array, default: () => [getPreviousWeekMonday(), getPreviousWeekSunday()] },
});

const pieChartType = ref('rank');

const handlePieChartClick = params => {
	router.push(`/movie-details/${params.data.id}`);
};

const findMovieRankPieChartApiSuccess = res => {
	salesPieChartOption.value = { ...salesPieChartOption.value };
	audienceCountPieChartOption.value = { ...audienceCountPieChartOption.value };
	screeningsCountPieChartOption.value = { ...screeningsCountPieChartOption.value };
	theatersCountPieChartOption.value = { ...theatersCountPieChartOption.value };

	salesPieChartOption.value.series[0].data = res.data.sales;
	audienceCountPieChartOption.value.series[0].data = res.data.audienceCount;
	screeningsCountPieChartOption.value.series[0].data = res.data.screeningsCount;
	theatersCountPieChartOption.value.series[0].data = res.data.theatersCount;
};

watchEffect(() => {
	findMovieRankPieChartApi(formatDate(props.datePeriod?.[0]), formatDate(props.datePeriod?.[1])).then(findMovieRankPieChartApiSuccess);
});

const salesPieChartOption = ref({
	tooltip: {
		trigger: 'item',
		formatter: function (params) {
			return `<span style='color: ${params.color}' class='font-weight-bold'>${params.name} <br/>${(params.value / 100000000).toFixed(2)}억원 (${params.percent}%)</span>`;
		},
	},
	label: {
		fontSize: 15,
		fontWeight: 'bold',
	},
	series: [
		{
			type: 'pie',
			data: [],
			emphasis: {
				itemStyle: {
					shadowBlur: 100,
				},
			},
		},
	],
});

const audienceCountPieChartOption = ref({
	tooltip: {
		trigger: 'item',
		formatter: function (params) {
			return `<span style='color: ${params.color}' class='font-weight-bold'>${params.name} <br/>${params.value / 10000}만명 (${params.percent}%)</span>`;
		},
	},
	label: {
		fontSize: 15,
		fontWeight: 'bold',
	},
	series: [
		{
			type: 'pie',
			data: [],
			emphasis: {
				itemStyle: {
					shadowBlur: 100,
				},
			},
		},
	],
});

const screeningsCountPieChartOption = ref({
	tooltip: {
		trigger: 'item',
		formatter: function (params) {
			return `<span style='color: ${params.color}' class='font-weight-bold'>${params.name} <br/>${params.value}개 (${params.percent}%)</span>`;
		},
	},
	label: {
		fontSize: 15,
		fontWeight: 'bold',
	},
	series: [
		{
			type: 'pie',
			data: [],
			emphasis: {
				itemStyle: {
					shadowBlur: 100,
				},
			},
		},
	],
});

const theatersCountPieChartOption = ref({
	tooltip: {
		trigger: 'item',
		formatter: function (params) {
			return `<span style='color: ${params.color}' class='font-weight-bold'>${params.name} <br/>${params.value}번 (${params.percent}%)</span>`;
		},
	},
	label: {
		fontSize: 15,
		fontWeight: 'bold',
	},
	series: [
		{
			type: 'pie',
			data: [],
			emphasis: {
				itemStyle: {
					shadowBlur: 100,
				},
			},
		},
	],
});
</script>
<style scoped>
.chart {
	height: 70vh;
}
</style>

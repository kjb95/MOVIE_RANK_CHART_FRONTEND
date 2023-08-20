<template>
	<v-container>
		<v-row justify="center" class="mt-3">
			<v-tabs v-model="lineChartType" selected-class="text-pink">
				<v-tab class="font-weight-bold text-h5" value="rank">순위</v-tab>
				<v-tab class="font-weight-bold text-h5" value="sales">매출액</v-tab>
				<v-tab class="font-weight-bold text-h5" value="audienceCount">관객수</v-tab>
				<v-tab class="font-weight-bold text-h5" value="screeningsCount">상영한 스크린수</v-tab>
				<v-tab class="font-weight-bold text-h5" value="theatersCount">상영된 횟수</v-tab>
			</v-tabs>
		</v-row>
		<v-row>
			<v-chart v-if="lineChartType === 'rank'" class="chart" :option="rankLineChartOption" @click="handleLineChartClick"></v-chart>
			<v-chart v-if="lineChartType === 'sales'" class="chart" :option="salesLineChartOption" @click="handleLineChartClick"></v-chart>
			<v-chart v-if="lineChartType === 'audienceCount'" class="chart" :option="audienceCountLineChartOption" @click="handleLineChartClick"></v-chart>
			<v-chart v-if="lineChartType === 'screeningsCount'" class="chart" :option="screeningsCountLineChartOption" @click="handleLineChartClick"></v-chart>
			<v-chart v-if="lineChartType === 'theatersCount'" class="chart" :option="theatersCountLineChartOption" @click="handleLineChartClick"></v-chart>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
import VChart from 'vue-echarts';
import router from '@/plugins';
import { ref, watchEffect } from 'vue';
import { formatDate, getPreviousWeekMonday, getPreviousWeekSunday } from '@/utils/dateUtils';
import { findMovieRankLineChartApi } from '@/api/movieRank';
import { use } from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GraphicComponent, GridComponent, LegendComponent, TitleComponent } from 'echarts/components';

use([LineChart, GridComponent, TitleComponent, GraphicComponent, LegendComponent]);

const props = defineProps({
	datePeriod: { type: Array, default: () => [getPreviousWeekMonday(), getPreviousWeekSunday()] },
});

const lineChartType = ref('rank');
const handleLineChartClick = (params: any) => {
	router.push(`/movie-details/${params.seriesId}`);
};

const findMovieRankLineChartApiSuccess = res => {
	const dates = res.data.dates;
	const titles = res.data.rank.map((rank: any) => rank.movieTitle);

	rankLineChartOption.value = { ...rankLineChartOption.value };
	rankLineChartOption.value.legend.data = titles;
	rankLineChartOption.value.xAxis.data = dates;
	rankLineChartOption.value.series = res.data.rank.map((data: any) => ({
		name: data.movieTitle,
		type: 'line',
		lineStyle: { width: 10 },
		data: data.datas.map((data: any) => (data === 0 ? null : -data + 11)),
		id: data.moviesId,
	}));

	salesLineChartOption.value = { ...salesLineChartOption.value };
	salesLineChartOption.value.legend.data = titles;
	salesLineChartOption.value.xAxis.data = dates;
	salesLineChartOption.value.series = res.data.sales.map((data: any) => ({
		name: data.movieTitle,
		type: 'line',
		lineStyle: { width: 5 },
		data: data.datas.map((data: any) => (data === 0 ? null : data / 100000000)),
		id: data.moviesId,
	}));

	audienceCountLineChartOption.value = { ...audienceCountLineChartOption.value };
	audienceCountLineChartOption.value.legend.data = titles;
	audienceCountLineChartOption.value.xAxis.data = dates;
	audienceCountLineChartOption.value.series = res.data.audienceCount.map((data: any) => ({
		name: data.movieTitle,
		type: 'line',
		lineStyle: { width: 5 },
		data: data.datas.map((data: any) => (data === 0 ? null : data / 10000)),
		id: data.moviesId,
	}));

	salesLineChartOption.value = { ...salesLineChartOption.value };
	screeningsCountLineChartOption.value.legend.data = titles;
	screeningsCountLineChartOption.value.xAxis.data = dates;
	screeningsCountLineChartOption.value.series = res.data.screeningsCount.map((data: any) => ({
		name: data.movieTitle,
		type: 'line',
		lineStyle: { width: 5 },
		data: data.datas.map((data: any) => (data === 0 ? null : data)),
		id: data.moviesId,
	}));

	theatersCountLineChartOption.value.legend.data = titles;
	theatersCountLineChartOption.value.xAxis.data = dates;
	theatersCountLineChartOption.value.series = res.data.theatersCount.map((data: any) => ({
		name: data.movieTitle,
		type: 'line',
		lineStyle: { width: 5 },
		data: data.datas.map((data: any) => (data === 0 ? null : data)),
		id: data.moviesId,
	}));
};

watchEffect(() => {
	findMovieRankLineChartApi(formatDate(props.datePeriod?.[0]), formatDate(props.datePeriod?.[1])).then(findMovieRankLineChartApiSuccess);
});

const rankLineChartOption = ref({
	legend: {
		data: [],
		top: 'bottom',
		itemWidth: 5,
		itemHeight: 10,
	},
	tooltip: {
		formatter: function (params: any) {
			return params.seriesName + '<br/>' + (11 - params.value) + '등';
		},
		textStyle: {
			fontSize: 20,
			fontWeight: 'bold',
			color: 'black',
		},
	},
	xAxis: {
		type: 'category',
		data: [],
		axisLabel: {
			fontSize: 10,
			fontWeight: 'bold',
			color: 'black',
		},
	},
	yAxis: {
		type: 'value',
		axisLabel: {
			formatter: function (value) {
				if (value === 0) {
					return '';
				}
				return 11 - value + '등';
			},
			fontSize: 20,
			fontWeight: 'bold',
			color: 'black',
		},
		interval: 1,
		max: 10,
	},
	series: [],
});

const salesLineChartOption = ref({
	legend: {
		data: [],
		top: 'bottom',
		itemWidth: 10,
		itemHeight: 10,
	},
	tooltip: {
		formatter: function (params: any) {
			return params.seriesName + '<br/>' + params.value.toFixed(2);
		},
		textStyle: {
			fontSize: 20,
			fontWeight: 'bold',
			color: 'black',
		},
	},
	xAxis: {
		type: 'category',
		data: [],
		axisLabel: {
			fontSize: 10,
			fontWeight: 'bold',
			color: 'black',
		},
	},
	yAxis: {
		type: 'value',
		axisLabel: {
			formatter: function (value) {
				if (value === 0) {
					return '';
				}
				return value;
			},
			fontSize: 20,
			fontWeight: 'bold',
			color: 'black',
		},
	},
	series: [],
	grid: {
		containLabel: true,
	},
	graphic: [
		{
			type: 'text',
			left: '10%',
			top: 20,
			style: {
				text: '단위: 억원',
				fontWeight: 'bold',
				color: 'grey',
			},
		},
	],
});

const audienceCountLineChartOption = ref({
	legend: {
		data: [],
		top: 'bottom',
		itemWidth: 10,
		itemHeight: 10,
	},
	tooltip: {
		formatter: function (params: any) {
			return params.seriesName + '<br/>' + params.value.toFixed(2);
		},
		textStyle: {
			fontSize: 20,
			fontWeight: 'bold',
			color: 'black',
		},
	},
	xAxis: {
		type: 'category',
		data: [],
		axisLabel: {
			fontSize: 10,
			fontWeight: 'bold',
			color: 'black',
		},
	},
	yAxis: {
		type: 'value',
		axisLabel: {
			formatter: function (value) {
				if (value === 0) {
					return '';
				}
				return value;
			},
			fontSize: 20,
			fontWeight: 'bold',
			color: 'black',
		},
	},
	series: [],
	grid: {
		containLabel: true,
	},
	graphic: [
		{
			type: 'text',
			left: '10%',
			top: 20,
			style: {
				text: '단위: 만명',
				fontWeight: 'bold',
				color: 'grey',
			},
		},
	],
});

const screeningsCountLineChartOption = ref({
	legend: {
		data: [],
		top: 'bottom',
		itemWidth: 10,
		itemHeight: 10,
	},
	tooltip: {
		formatter: function (params: any) {
			return params.seriesName + '<br/>' + params.value + '개';
		},
		textStyle: {
			fontSize: 20,
			fontWeight: 'bold',
			color: 'black',
		},
	},
	xAxis: {
		type: 'category',
		data: [],
		axisLabel: {
			fontSize: 10,
			fontWeight: 'bold',
			color: 'black',
		},
	},
	yAxis: {
		type: 'value',
		axisLabel: {
			formatter: function (value) {
				if (value === 0) {
					return '';
				}
				return value + '개';
			},
			fontSize: 20,
			fontWeight: 'bold',
			color: 'black',
		},
	},
	series: [],
	grid: {
		containLabel: true,
	},
});

const theatersCountLineChartOption = ref({
	legend: {
		data: [],
		top: 'bottom',
		itemWidth: 10,
		itemHeight: 10,
	},
	tooltip: {
		formatter: function (params: any) {
			return params.seriesName + '<br/>' + params.value + '번';
		},
		textStyle: {
			fontSize: 20,
			fontWeight: 'bold',
			color: 'black',
		},
	},
	xAxis: {
		type: 'category',
		data: [],
		axisLabel: {
			fontSize: 10,
			fontWeight: 'bold',
			color: 'black',
		},
	},
	yAxis: {
		type: 'value',
		axisLabel: {
			formatter: function (value) {
				if (value === 0) {
					return '';
				}
				return value + '번';
			},
			fontSize: 20,
			fontWeight: 'bold',
			color: 'black',
		},
	},
	series: [],
	grid: {
		containLabel: true,
	},
});
</script>
<style scoped>
.chart {
	height: 70vh;
}
</style>

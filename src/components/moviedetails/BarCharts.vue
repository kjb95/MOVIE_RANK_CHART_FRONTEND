<template>
	<v-container v-if="lineChartType != ''">
		<v-row justify="center">
			<v-tabs v-model="lineChartType" selected-class="text-pink">
				<v-tab class="font-weight-bold text-h5" value="rank">순위</v-tab>
				<v-tab class="font-weight-bold text-h5" value="sales">매출액</v-tab>
				<v-tab class="font-weight-bold text-h5" value="audienceCount">관객수</v-tab>
				<v-tab class="font-weight-bold text-h5" value="screeningsCount">상영한 스크린수</v-tab>
				<v-tab class="font-weight-bold text-h5" value="theatersCount">상영된 횟수</v-tab>
			</v-tabs>
		</v-row>
		<v-row>
			<v-chart v-if="lineChartType === 'rank'" class="chart" :option="rankLineChartOption"></v-chart>
			<v-chart v-if="lineChartType === 'sales'" class="chart" :option="salesLineChartOption"></v-chart>
			<v-chart v-if="lineChartType === 'audienceCount'" class="chart" :option="audienceCountLineChartOption"></v-chart>
			<v-chart v-if="lineChartType === 'screeningsCount'" class="chart" :option="screeningsCountLineChartOption"></v-chart>
			<v-chart v-if="lineChartType === 'theatersCount'" class="chart" :option="theatersCountLineChartOption"></v-chart>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';
import { findMovieRankLineChartApi } from '@/api/movieRank';
import { use } from 'echarts/core';
import { BarChart } from 'echarts/charts';
import VChart from 'vue-echarts';
import { GridComponent, TitleComponent, GraphicComponent } from 'echarts/components';

use([BarChart, GridComponent, TitleComponent, GraphicComponent]);

const route = useRoute();
const moviesId = computed(() => route.path.split('/')[2]);

const nonZeroDataIndices = computed(() => rankLineChartOption.value.xAxis.data.map((data, index) => (data !== 0 ? index : -1)).filter(index => index !== -1));

const lineChartType = ref('rank');

findMovieRankLineChartApi(moviesId.value).then(res => {
	if (res.data.dates == null) {
		lineChartType.value = '';
		return;
	}
	const nonZeroDataIndices = res.data.rank[0].datas.map((data, index) => (data !== 0 ? index : -1)).filter(index => index !== -1);
	const dates = nonZeroDataIndices.map(index => res.data.dates[index]);
	rankLineChartOption.value.xAxis.data = dates;
	salesLineChartOption.value.xAxis.data = dates;
	audienceCountLineChartOption.value.xAxis.data = dates;
	screeningsCountLineChartOption.value.xAxis.data = dates;
	theatersCountLineChartOption.value.xAxis.data = dates;
	rankLineChartOption.value.series[0].data = nonZeroDataIndices.map(index => res.data.rank[0].datas.map((data: any) => (data === 0 ? null : -data + 11))[index]);
	salesLineChartOption.value.series[0].data = nonZeroDataIndices.map(index => res.data.sales[0].datas.map((data: any) => data / 100000000)[index]);
	audienceCountLineChartOption.value.series[0].data = nonZeroDataIndices.map(index => res.data.audienceCount[0].datas.map((data: any) => data / 10000)[index]);
	screeningsCountLineChartOption.value.series[0].data = nonZeroDataIndices.map(index => res.data.screeningsCount[0].datas[index]);
	theatersCountLineChartOption.value.series[0].data = nonZeroDataIndices.map(index => res.data.theatersCount[0].datas[index]);
});

const rankLineChartOption = ref({
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow',
		},
		formatter: function (params: any) {
			if (params[0].value == null) {
				return params[0].name + '<br/>' + '순위권 밖';
			}
			return params[0].name + '<br/>' + (11 - params[0].value) + '등';
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
	series: [
		{
			data: [],
			type: 'bar',
			barWidth: '60%',
			itemStyle: {
				color: 'pink',
			},
		},
	],
	grid: {
		containLabel: true,
	},
});

const salesLineChartOption = ref({
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow',
		},
		formatter: function (params: any) {
			if (params[0].value == 0) {
				return params[0].name + '<br/>' + '순위권 밖';
			}
			return params[0].name + '<br/>' + params[0].value.toFixed(2);
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
		splitNumber: 10,
	},
	series: [
		{
			data: [],
			type: 'bar',
			barWidth: '60%',
			itemStyle: {
				color: 'pink',
			},
		},
	],
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
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow',
		},
		formatter: function (params: any) {
			if (params[0].value == 0) {
				return params[0].name + '<br/>' + '순위권 밖';
			}
			return params[0].name + '<br/>' + params[0].value.toFixed(2);
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
		splitNumber: 10,
	},
	series: [
		{
			data: [],
			type: 'bar',
			barWidth: '60%',
			itemStyle: {
				color: 'pink',
			},
		},
	],
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
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow',
		},
		formatter: function (params: any) {
			if (params[0].value == 0) {
				return params[0].name + '<br/>' + '순위권 밖';
			}
			return params[0].name + '<br/>' + params[0].value + '개';
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
		splitNumber: 10,
	},
	series: [
		{
			data: [],
			type: 'bar',
			barWidth: '60%',
			itemStyle: {
				color: 'pink',
			},
		},
	],
	grid: {
		containLabel: true,
	},
});

const theatersCountLineChartOption = ref({
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow',
		},
		formatter: function (params: any) {
			if (params[0].value == 0) {
				return params[0].name + '<br/>' + '순위권 밖';
			}
			return params[0].name + '<br/>' + params[0].value + '번';
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
		splitNumber: 10,
	},
	series: [
		{
			data: [],
			type: 'bar',
			barWidth: '60%',
			itemStyle: {
				color: 'pink',
			},
		},
	],
	grid: {
		containLabel: true,
	},
});
</script>

<style scoped>
.chart {
	height: 85vh;
}
</style>

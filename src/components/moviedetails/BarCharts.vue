<template>
	<v-container v-if="barChartType != ''">
		<v-row justify="center">
			<v-tabs v-model="barChartType" selected-class="text-pink">
				<v-tab class="font-weight-bold text-h5" value="rank">순위</v-tab>
				<v-tab class="font-weight-bold text-h5" value="sales">매출액</v-tab>
				<v-tab class="font-weight-bold text-h5" value="audienceCount">관객수</v-tab>
				<v-tab class="font-weight-bold text-h5" value="screeningsCount">상영한 스크린수</v-tab>
				<v-tab class="font-weight-bold text-h5" value="theatersCount">상영된 횟수</v-tab>
			</v-tabs>
		</v-row>
		<v-row>
			<v-chart v-if="barChartType === 'rank'" class="chart" :option="rankBarChartOption"></v-chart>
			<v-chart v-if="barChartType === 'sales'" class="chart" :option="salesBarChartOption"></v-chart>
			<v-chart v-if="barChartType === 'audienceCount'" class="chart" :option="audienceCountBarChartOption"></v-chart>
			<v-chart v-if="barChartType === 'screeningsCount'" class="chart" :option="screeningsCountBarChartOption"></v-chart>
			<v-chart v-if="barChartType === 'theatersCount'" class="chart" :option="theatersCountBarChartOption"></v-chart>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';
import { findMovieRankBarChartApi } from '@/api/movieRank';
import { use } from 'echarts/core';
import { BarChart } from 'echarts/charts';
import VChart from 'vue-echarts';
import { GridComponent, TitleComponent, GraphicComponent } from 'echarts/components';

use([BarChart, GridComponent, TitleComponent, GraphicComponent]);

const route = useRoute();
const moviesId = computed(() => route.path.split('/')[2]);

const barChartType = ref('rank');

findMovieRankBarChartApi(moviesId.value).then(res => {
	if (res.data.dates == null) {
		barChartType.value = '';
		return;
	}
	const nonZeroDataIndices = res.data.rank[0].datas.map((data, index) => (data !== 0 ? index : -1)).filter(index => index !== -1);
	const dates = nonZeroDataIndices.map(index => res.data.dates[index]);
	rankBarChartOption.value.xAxis.data = dates;
	salesBarChartOption.value.xAxis.data = dates;
	audienceCountBarChartOption.value.xAxis.data = dates;
	screeningsCountBarChartOption.value.xAxis.data = dates;
	theatersCountBarChartOption.value.xAxis.data = dates;
	rankBarChartOption.value.series[0].data = nonZeroDataIndices.map(index => res.data.rank[0].datas.map((data: any) => (data === 0 ? null : -data + 11))[index]);
	salesBarChartOption.value.series[0].data = nonZeroDataIndices.map(index => res.data.sales[0].datas.map((data: any) => data / 100000000)[index]);
	audienceCountBarChartOption.value.series[0].data = nonZeroDataIndices.map(index => res.data.audienceCount[0].datas.map((data: any) => data / 10000)[index]);
	screeningsCountBarChartOption.value.series[0].data = nonZeroDataIndices.map(index => res.data.screeningsCount[0].datas[index]);
	theatersCountBarChartOption.value.series[0].data = nonZeroDataIndices.map(index => res.data.theatersCount[0].datas[index]);
});

const rankBarChartOption = ref({
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow',
		},
		formatter: function (params: any) {
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

const salesBarChartOption = ref({
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow',
		},
		formatter: function (params: any) {
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

const audienceCountBarChartOption = ref({
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow',
		},
		formatter: function (params: any) {
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

const screeningsCountBarChartOption = ref({
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow',
		},
		formatter: function (params: any) {
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

const theatersCountBarChartOption = ref({
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow',
		},
		formatter: function (params: any) {
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
	height: 70vh;
}
</style>

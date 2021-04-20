<template>
	<el-row>
		<el-col> <h2>{{}}</h2> </el-col>
		<el-col> 球员列表 </el-col>
		<el-col> <section ref="chartEl">柱状图</section> </el-col>
	</el-row>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, ref } from "@vue/runtime-core";
import * as echarts from "echarts";

export default defineComponent({
	setup() {
		const chartEl = ref<HTMLElement>();
		const options = ref<{ value: number; label: string }[]>([]);
		const teamList = ref<ITeamItem[]>([]);

		onBeforeMount(() => {
			fetch("data/team.json", {
				method: "GET",
			})
				.then((res) => res.json())
				.then((res) => {});
		});

		const option = {};

		onMounted(() => {
			const radarChart = echarts.init(chartEl.value as HTMLElement);
			radarChart.setOption(option);
		});

		return {
			options,
			chartEl,
		};
	},
});
</script>

<style lang="less" scoped></style>

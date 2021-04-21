<template>
	<div class="wrapper">
		<el-row>
			<el-col style="text-align: center; margin-bottom: 1em">
				选择球队：
				<el-select
					v-model="selected"
					filterable
					multiple
					placeholder="请选择球队"
					:multiple-limit="3"
					@change="handleSelect($event)"
				>
					<el-option
						v-for="(item, id) in teamOptions"
						:key="id"
						:label="item.label"
						:value="item.value"
					>
					</el-option>
				</el-select>
			</el-col>
		</el-row>

		<el-row style="height: calc(100% - 56px)" :gutter="30">
			<el-col :span="10" class="info-panel">
				<el-card shadow="hover">
					<el-form label-position="left" inline>
						<el-form-item label="球队名称"> {{ teamInfo?.TeamName }} </el-form-item>
						<el-form-item label="球队标识符"> {{ teamInfo?.Id }} </el-form-item>
						<el-form-item label="所在城市"> {{ teamInfo?.City }} </el-form-item>
						<el-form-item label="成立年份"> {{ teamInfo?.SetUpTime }} </el-form-item>
						<el-form-item label="主教练"> {{ teamInfo?.Coach }} </el-form-item>
					</el-form>
				</el-card>

				<el-card shadow="hover" title="优势">
					<li v-for="(i, k) in teamInfo?.TeamCharacter.Advantage" :key="k">{{ i }}</li>
				</el-card>
				<el-card shadow="hover" title="劣势">
					<li v-for="(i, k) in teamInfo?.TeamCharacter.Weakness" :key="k">{{ i }}</li>
				</el-card>
				<el-card shadow="hover" title="特色">
					<li v-for="(i, k) in teamInfo?.TeamCharacter.Style" :key="k">{{ i }}</li>
				</el-card>

				<el-card shadow="hover">
					<el-table :data="teamPlayer">
						<el-table-column prop="Name" label="名字"> </el-table-column>
						<el-table-column prop="Position" label="球员位置"> </el-table-column>
						<el-table-column prop="Nationality" label="所在国家"> </el-table-column>
					</el-table>
				</el-card>
			</el-col>

			<el-col :span="14">
				<section ref="chartRadarEl" style="height: 50%"></section>
				<section ref="chartBarEl" style="height: 50%"></section>
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts">
import {
	defineComponent,
	onBeforeMount,
	onMounted,
	onUnmounted,
	ref,
} from "@vue/runtime-core";
import * as echarts from "echarts";

interface ITeamPlayer {
	Name: string;
	Position: string;
	Nationality: string;
}

export default defineComponent({
	setup() {
		const selected = ref<number[]>([0]);
		const teamOptions = ref<{ value: number; label: string }[]>([]);

		const teamList = ref<ITeamItem[]>([]);
		const teamInfo = ref<ITeamInfo>();
		const teamPlayer = ref<ITeamPlayer[]>([]);

		onBeforeMount(() => {
			fetch("data/team.json", {
				method: "GET",
			})
				.then((res) => res.json())
				.then((res: ITeamItem[]) => {
					teamList.value = res;

					res.forEach((team, idx) => {
						teamOptions.value.push({
							value: idx,
							label: team.Info.TeamName,
						});
					});

					handleSelect([0]);
				});
		});

		const chartRadarEl = ref<HTMLElement>();
		const chartRadar = ref<echarts.ECharts>();
		const chartRadarOption: echarts.EChartsOption = {
			title: { text: "球队信息比较", top: "0", left: "left" },
			legend: { data: [], left: "right" },
			tooltip: {},
			radar: [
				{
					indicator: [
						{ text: "球队贡献率", max: 100 },
						{ text: "射门射正率", max: 100 },
						{ text: "传球成功率", max: 100 },
						{ text: "争头球成功率", max: 100 },
					],
					center: ["50%", "50%"],
					radius: 100,
					startAngle: 90,
					shape: "circle",
					splitNumber: 4,
					splitArea: {
						areaStyle: {
							color: [
								"rgba(114, 172, 209, 0.2)",
								"rgba(114, 172, 209, 0.4)",
								"rgba(114, 172, 209, 0.6)",
								"rgba(114, 172, 209, 0.8)",
								"rgba(114, 172, 209, 1)",
							],
							shadowColor: "rgba(0, 0, 0, 0.3)",
							shadowBlur: 10,
						},
					},
					splitLine: { lineStyle: { color: "rgba(255, 255, 255, 0.5)" } },
					axisLine: { lineStyle: { color: "rgba(255, 255, 255, 0.5)" } },
					axisName: { formatter: "【 {value} 】", color: "#72ACD1" },
				},
			],
			series: [
				{
					type: "radar",
					emphasis: { lineStyle: { width: 4 } },
					data: [],
				},
			],
		};

		const chartBarEl = ref<HTMLElement>();
		const chartBar = ref<echarts.ECharts>();
		const chartBarOption: echarts.EChartsOption = {
			title: { text: "最近 5 场比赛情况", top: "0", left: "left" },
			legend: {
				data: ["犯规", "黄牌", "红牌", "射门", "过人", "评分"],
				left: "right",
			},
			tooltip: {
				trigger: "axis",
				axisPointer: { type: "cross", crossStyle: { color: "#999" } },
			},
			grid: { left: "2%", right: "2%", bottom: "2%", containLabel: true },
			xAxis: [{ type: "category", data: [], axisPointer: { type: "shadow" } }],
			yAxis: [
				{ type: "value" },
				{ type: "value" },
				{ type: "value" },
				{ type: "value" },
				{ type: "value" },
				{ type: "value", min: 0, max: 10 },
			],
			series: [
				{ name: "犯规", type: "bar", data: [] },
				{ name: "黄牌", type: "bar", data: [] },
				{ name: "红牌", type: "bar", data: [] },
				{ name: "射门", type: "bar", data: [] },
				{ name: "过人", type: "bar", data: [] },
				{ name: "评分", type: "line", data: [] },
			],
		};

		const handleSelect = (val: number[]) => {
			teamInfo.value = teamList.value[0].Info;
			teamList.value[0].PlayerList.forEach((player) => {
				teamPlayer.value.push({
					Name: player.Info.Name,
					Position: player.Info.Position,
					Nationality: player.Info.Nationality,
				});
			});

			(chartBarOption.xAxis as any)[0].data = [
				...teamList.value[0].Last5.map((item) => item.League),
			];

			(chartBarOption.series as any)[0].data = [
				...teamList.value[0].Last5.map((item) => item.Foul),
			];
			(chartBarOption.series as any)[1].data = [
				...teamList.value[0].Last5.map((item) => item.Yellow),
			];
			(chartBarOption.series as any)[2].data = [
				...teamList.value[0].Last5.map((item) => item.Red),
			];
			(chartBarOption.series as any)[3].data = [
				...teamList.value[0].Last5.map((item) => item.Shot),
			];
			(chartBarOption.series as any)[4].data = [
				...teamList.value[0].Last5.map((item) => item.Dribbling),
			];
			(chartBarOption.series as any)[5].data = [
				...teamList.value[0].Last5.map((item) => item.Score),
			];

			val.forEach((item, idx) => {
				(chartRadarOption.legend as any).data.push(teamList.value[item].Info.TeamName);

				(chartRadarOption.series as any)[0].data.push({
					name: teamList.value[item].Info.TeamName,
					value: [
						teamList.value[item].RecentResults[0].Base.WinRate,
						teamList.value[item].RecentResults[0].Attack.ShotRate,
						teamList.value[item].RecentResults[0].Attack.PassRate,
						teamList.value[item].RecentResults[0].Defense.HeadRate,
					],
					symbolSize: 5,
					lineStyle: { type: ["solid", "dashed", "dotted"][idx] },
				});
			});

			chartRadar.value?.setOption(chartRadarOption);
			chartBar.value?.setOption(chartBarOption);
		};

		onMounted(() => {
			chartRadar.value = echarts.init(chartRadarEl.value as HTMLElement);
			chartRadar.value.setOption(chartRadarOption);

			chartBar.value = echarts.init(chartBarEl.value as HTMLElement);
			chartBar.value.setOption(chartBarOption);
		});

		onUnmounted(() => {
			chartRadar.value?.dispose();
			chartBar.value?.dispose();
		});

		return {
			selected,
			handleSelect,
			teamOptions,

			teamInfo,
			teamPlayer,

			chartRadarEl,
			chartBarEl,
		};
	},
});
</script>

<style lang="less" scoped>
.wrapper {
	height: 100%;
}

li {
	margin-left: 1em;
	list-style: circle;
}

.info-panel {
	overflow: auto;
	height: 100%;
}

.el-form-item {
	margin-bottom: 0;

	::v-deep(.el-form-item__content) {
		font-weight: 600;
	}
}

.el-select {
	width: 40%;
}
</style>

<template>
	<div class="wrapper">
		<el-row>
			<el-col style="text-align: center; margin-bottom: 1em">
				选择球员：
				<el-select
					v-model="selected"
					filterable
					multiple
					placeholder="请选择球员"
					:multiple-limit="3"
					@change="handleSelect($event)"
				>
					<el-option
						v-for="(item, id) in playerOptions"
						:key="id"
						:label="item.label"
						:value="item.value"
					>
					</el-option>
				</el-select>
			</el-col>
		</el-row>

		<el-row style="height: calc(100% - 56px)">
			<el-col :span="12" class="info-panel">
				<el-card shadow="hover">
					<el-form label-position="left" inline>
						<el-form-item label="名字"> {{ playerInfo?.Name }} </el-form-item>
						<el-form-item label="球衣号码"> {{ playerInfo?.JerseyNumber }} </el-form-item>
						<el-form-item label="球员位置"> {{ playerInfo?.Position }} </el-form-item>
						<el-form-item label="所在国家"> {{ playerInfo?.Nationality }} </el-form-item>
						<el-form-item label="生日"> {{ playerInfo?.Birthday }} </el-form-item>
						<el-form-item label="身高/cm"> {{ playerInfo?.Height }} </el-form-item>
						<el-form-item label="体重/Kg"> {{ playerInfo?.Weight }} </el-form-item>
						<el-form-item label="身价/万英镑"> {{ playerInfo?.Worth }} </el-form-item>
					</el-form>
				</el-card>

				<el-card shadow="hover">
					<el-table :data="playerHornor">
						<el-table-column prop="Name" label="荣誉名称"> </el-table-column>
						<el-table-column prop="Number" label="次数" width="60"> </el-table-column>
						<el-table-column prop="Years" label="赛季"> </el-table-column>
					</el-table>
				</el-card>

				<el-card shadow="hover">
					<el-form label-position="left" inline>
						<el-form-item label="吃黄牌数">
							{{ playerBase?.Yellow }}
						</el-form-item>
						<el-form-item label="吃红牌数">
							{{ playerBase?.Red }}
						</el-form-item>
						<el-form-item label="球队贡献率">
							{{ playerBase?.ContributionRate }}
						</el-form-item>
						<el-form-item label="球员评分">
							{{ playerBase?.Score }}
						</el-form-item>
						<el-form-item label="首发上场次数">
							{{ playerBase?.FirstNumber }}
						</el-form-item>
						<el-form-item label="替补上场次数">
							{{ playerBase?.SubstituteNumber }}
						</el-form-item>
						<el-form-item label="首发上场进球数">
							{{ playerBase?.FirstGoal }}
						</el-form-item>
						<el-form-item label="替补上场进球数">
							{{ playerBase?.SubstituteGoal }}
						</el-form-item>
					</el-form>
				</el-card>
			</el-col>
			<el-col :span="12" style="height: 100%">
				<section ref="chartEl" style="height: 100%"></section>
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

export default defineComponent({
	setup() {
		const selected = ref<number[]>([0]);
		const playerOptions = ref<{ value: number; label: string }[]>([]);
		const playerList = ref<IPlayer[]>([]);

		const playerInfo = ref<IPlayerInfo>();
		const playerHornor = ref<IPlayerHornor[]>([]);
		const playerBase = ref<IPlayerBase>();

		onBeforeMount(() => {
			fetch("data/team.json", {
				method: "GET",
			})
				.then((res) => res.json())
				.then((res: ITeamItem[]) => {
					res.forEach((team) => {
						playerList.value.push(...team.PlayerList);
					});

					playerList.value.forEach((player, idx) => {
						playerOptions.value.push({
							value: idx,
							label: player.Info.Name,
						});
					});

					handleSelect([0]);
				});
		});

		const chartEl = ref<HTMLElement>();
		const chartRadar = ref<echarts.ECharts>();
		const chartOption: echarts.EChartsOption = {
			title: { text: "球员信息比较", top: "0", left: "center" },
			legend: { data: [], bottom: "0", left: "center" },
			tooltip: {},
			radar: [
				{
					indicator: [
						{ text: "球队贡献率", min: 0, max: 1 },
						{ text: "射门射正率", min: 0, max: 1 },
						{ text: "传球成功率", min: 0, max: 1 },
					],
					center: ["70%", "30%"],
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
				{
					indicator: [
						{ text: "争顶次数", min: 0, max: 1 },
						{ text: "解围次数", min: 0, max: 1 },
					],
					center: ["30%", "70%"],
					radius: 100,
					shape: "circle",
					splitLine: { lineStyle: { color: "#72ACD1" } },
					axisLine: { lineStyle: { color: "#B8D3E4" } },
					axisName: { formatter: "【 {value} 】", color: "#72ACD1" },
				},
			],
			series: [
				{
					type: "radar",
					emphasis: { lineStyle: { width: 4 } },
					data: [],
				},
				{
					type: "radar",
					emphasis: { lineStyle: { width: 4 } },
					data: [],
				},
			],
		};

		const handleSelect = (val: number[]) => {
			const style = ["solid", "dashed", "dotted"];

			playerInfo.value = playerList.value[val[0]].Info;
			playerHornor.value = playerList.value[val[0]].Honor;
			playerBase.value = playerList.value[val[0]].RecentResults.Base;

			(chartOption.legend as any).data = [];
			(chartOption.series as any)[0].data = [];
			(chartOption.series as any)[1].data = [];

			val.forEach((item, idx) => {
				(chartOption.legend as any).data.push(playerList.value[item].Info.Name);

				(chartOption.series as any)[0].data.push({
					name: playerList.value[item].Info.Name,
					value: [
						playerList.value[item].RecentResults.Base.ContributionRate,
						playerList.value[item].RecentResults.Attack.ShotRate,
						playerList.value[item].RecentResults.Attack.PassRate,
					],
					symbolSize: 5,
					lineStyle: { type: style[idx] },
				});

				(chartOption.series as any)[1].data.push({
					name: playerList.value[item].Info.Name,
					value: [
						playerList.value[item].RecentResults.Defense.HeadingDuelRate,
						playerList.value[item].RecentResults.Defense.ClearanceRate,
					],
					symbolSize: 5,
					lineStyle: { type: style[idx] },
				});
			});

			chartRadar.value?.setOption(chartOption);
		};

		onMounted(() => {
			chartRadar.value = echarts.init(chartEl.value as HTMLElement);
		});

		onUnmounted(() => {
			chartRadar.value?.dispose();
		});

		return {
			selected,
			playerOptions,
			chartEl,

			playerInfo,
			playerHornor,
			playerBase,

			handleSelect,
		};
	},
});
</script>

<style lang="less" scoped>
.wrapper {
	display: flex;
	height: 100%;
	flex-direction: column;
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

<template>
	<div class="wrapper">
		<el-row>
			<el-col style="text-align: center">
				选择联赛和年份：
				<el-cascader :options="options" @change="handleSelect($event[1])"></el-cascader>
			</el-col>
		</el-row>

		<el-row>
			<el-col :span="12">
				<el-card shadow="hover">
					<div>场次信息</div>

					<el-slider
						v-model="round"
						:step="1"
						:min="1"
						:max="32"
						:format-tooltip="(i) => `第 ${i} 轮`"
						show-stops
						show-input
					>
					</el-slider>

					<el-table :data="roundsData[round - 1]" stripe>
						<el-table-column prop="Time" label="比赛时间"> </el-table-column>
						<el-table-column prop="Home" label="主场"> </el-table-column>
						<el-table-column prop="Away" label="客场"> </el-table-column>
						<el-table-column prop="HAScore" label="主客场比分"> </el-table-column>
					</el-table>
				</el-card>
			</el-col>

			<el-col :span="12">
				<el-card shadow="hover">
					<div>队伍排名</div>
					<el-table :data="rankingData">
						<el-table-column type="expand">
							<template #default="props">
								<el-form label-position="left" inline>
									<el-form-item label="得积分点">
										<span>{{ props.row.WinPoint }}</span>
									</el-form-item>
									<el-form-item label="失积分点">
										<span>{{ props.row.LossPoint }}</span>
									</el-form-item>
									<el-form-item label="净积分点（得-失）">
										<span>{{ props.row.MarginPoints }}</span>
									</el-form-item>
									<el-form-item label="胜率">
										<span>{{ props.row.WinRate }}</span>
									</el-form-item>
									<el-form-item label="平率">
										<span>{{ props.row.FlatRate }}</span>
									</el-form-item>
									<el-form-item label="负率">
										<span>{{ props.row.LossRate }}</span>
									</el-form-item>
									<el-form-item label="平均得分">
										<span>{{ props.row.AverageWin }}</span>
									</el-form-item>
									<el-form-item label="平均失分">
										<span>{{ props.row.AverageLoss }}</span>
									</el-form-item>
								</el-form>
							</template>
						</el-table-column>

						<el-table-column prop="Name" label="球队名称"> </el-table-column>
						<el-table-column prop="Score" label="赛季综合得分"> </el-table-column>
						<el-table-column prop="Total" label="总比赛场次"> </el-table-column>
						<el-table-column prop="Win" label="胜利场次"> </el-table-column>
						<el-table-column prop="Draw" label="平局场次"> </el-table-column>
						<el-table-column prop="Lose" label="失败场次"> </el-table-column>
					</el-table>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from "@vue/runtime-core";

export default defineComponent({
	setup() {
		const leagueList = ref<ILeagueItem[]>([]);

		const roundsData = ref<IGameRound[]>([]);

		const rankingData = ref<IRanking[]>([]);

		const options = ref<ICascaderOptions[]>([]);

		onBeforeMount(() => {
			fetch("data/league.json", {
				method: "GET",
			})
				.then((res) => res.json())
				.then((res) => {
					getOption(res);
				});
		});

		const getOption = (data: any) => {
			leagueList.value = data;
			leagueList.value.forEach((item, idx) => {
				const league: ICascaderOptions = {
					label: item.Info.Name,
					value: [idx],
					children: [],
				};

				item.Records.forEach((item, idx) => {
					league.children?.push({
						label: item.Season,
						value: [...league.value, idx],
					});
				});

				options.value.push(league);
			});
		};

		const handleSelect = (value: number[]) => {
			const idx = value[1];
			const league = leagueList.value[value[0]];
			roundsData.value = league.Records[idx].GameRounds;
			rankingData.value = league.Records[idx].Ranking;
		};

		const round = ref(0);

		return {
			leagueList,
			roundsData,
			rankingData,
			handleSelect,
			round,
			options,
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

.el-card {
	margin: 0.5em;

	&,
	::v-deep(.el-card__body) {
		height: 100%;
	}

	div {
		text-align: center;
	}
}
</style>

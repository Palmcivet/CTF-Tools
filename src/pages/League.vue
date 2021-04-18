<template>
	<el-row>
		<el-col style="text-align: center">
			<el-card>
				<el-cascader
					:options="options"
					clearable
					@change="handleSelect($event)"
				></el-cascader>
			</el-card>
		</el-col>
	</el-row>

	<el-row style="height: calc(100% - 83.5px)">
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

				<el-table :data="roundsData[round - 1]" style="width: 100%">
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
				<el-table :data="rankingData" style="width: 100%">
					<el-table-column type="expand">
						<template #default="props">
							<el-form label-position="left" inline>
								<el-form-item label="商品名称">
									<span>{{ props.row.WinPoint }}</span>
								</el-form-item>
								<el-form-item label="商品名称">
									<span>{{ props.row.LossPoint }}</span>
								</el-form-item>
								<el-form-item label="所属店铺">
									<span>{{ props.row.MarginPoints }}</span>
								</el-form-item>
								<el-form-item label="商品 ID">
									<span>{{ props.row.WinRate }}</span>
								</el-form-item>
								<el-form-item label="店铺 ID">
									<span>{{ props.row.FlatRate }}</span>
								</el-form-item>
								<el-form-item label="商品分类">
									<span>{{ props.row.LossRate }}</span>
								</el-form-item>
								<el-form-item label="店铺地址">
									<span>{{ props.row.AverageWin }}</span>
								</el-form-item>
								<el-form-item label="商品描述">
									<span>{{ props.row.AverageLoss }}</span>
								</el-form-item>
							</el-form>
						</template>
					</el-table-column>

					<el-table-column prop="Name" label="日期"> </el-table-column>
					<el-table-column prop="Score" label="邮编"> </el-table-column>
					<el-table-column prop="Total" label="姓名"> </el-table-column>
					<el-table-column prop="Win" label="省份"> </el-table-column>
					<el-table-column prop="Draw" label="市区"> </el-table-column>
					<el-table-column prop="Lose" label="地址"> </el-table-column>
				</el-table>
			</el-card>
		</el-col>
	</el-row>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from "@vue/runtime-core";

interface IGameRound {
	Time: string;
	Home: string;
	Away: string;
	HAScore: string;
}

interface IRanking {
	Name: string;
	Total: number;
	Win: number;
	Draw: number;
	Lose: number;
	WinPoint: number;
	LossPoint: number;
	MarginPoints: number;
	WinRate: number;
	FlatRate: number;
	LossRate: number;
	AverageWin: number;
	AverageLoss: number;
	Score: number;
}

interface ILeagueItem {
	Info: {
		Id: string;
		Name: string;
		Contry: string;
	};
	Records: {
		Season: string;
		GameRounds: IGameRound[];
		Ranking: IRanking[];
	}[];
}

declare interface ICascaderOptions {
	label: string;
	value: number[];
	children?: ICascaderOptions[];
}

export default defineComponent({
	setup() {
		// 联赛总表
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
					league.children.push({
						label: item.Season,
						value: [...league.value, idx],
					});
				});

				options.value.push(league);
			});
		};

		const handleSelect = (value: number[]) => {
			const league = leagueList.value[value[0]];
			const idx = value[1][1];
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

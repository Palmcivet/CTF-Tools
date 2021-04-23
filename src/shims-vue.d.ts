declare module "*.vue" {
	import { DefineComponent } from "vue";
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

declare interface IGameRound {
	Time: string;
	Home: string;
	Away: string;
	HAScore: string;
}

declare interface IRanking {
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

declare interface ILeagueItem {
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

declare interface IPlayerInfo {
	Name: string;
	JerseyNumber: number;
	Position: string;
	Nationality: string;
	Birthday: string;
	Height: number;
	Weight: number;
	Worth: number;
}

declare interface IPlayerHornor {
	Name: string;
	Number: string;
	Years: string[];
}

declare interface IPlayerBase {
	FirstNumber: number;
	SubstituteNumber: number;
	FirstGoal: number;
	SubstituteGoal: number;
	Yellow: number;
	Red: number;
	ContributionRate: number;
	Score: number;
}

declare interface IPlayer {
	Info: IPlayerInfo;
	Honor: IPlayerHornor[];
	RecentResults: {
		Base: IPlayerBase;
		Attack: {
			Shot: number;
			ShotSuccess: number;
			ShotRate: number;
			PassBall: number;
			PassSuccess: number;
			PassRate: number;
		};
		Defense: {
			HeadingDuelRate: number;
			ClearanceRate: number;
		};
	};
}

declare interface ITeamInfo {
	TeamName: string;
	Id: string;
	City: string;
	SetUpTime: string;
	Coach: string;
	TeamCharacter: {
		Advantage: string[];
		Style: string[];
		Weakness: string[];
	};
}

declare interface ITeamItem {
	Info: ITeamInfo;
	RecentResults: {
		Base: {
			Total: number;
			Win: number;
			Draw: number;
			Lose: number;
			WinRate: number;
			Foul: number;
			Yellow: number;
			Red: number;
			Score: number;
		};
		Attack: {
			Possession: number;
			Shot: number;
			ShotSuccess: number;
			ShotRate: number;
			PassBall: number;
			PassSuccess: number;
			PassRate: number;
			Dribbling: number;
		};
		Defense: {
			Corner: number;
			Offside: number;
			Head: number;
			HeadSuccess: number;
			HeadRate: number;
			Save: number;
			Shovel: number;
			Missed: number;
			Block: number;
			Out: number;
		};
	};
	PlayerList: IPlayer[];
	Last5: {
		League: string;
		Time: string;
		Home: string;
		HAScore: string;
		Away: string;
		Foul: number;
		Yellow: number;
		Red: number;
		Possession: number;
		Shot: number;
		ShotSuccess: number;
		ShotRate: number;
		PassBass: number;
		PassSuccess: number;
		PassRate: number;
		Dribbling: number;
		Score: number;
	}[];
}

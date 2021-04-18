import { createRouter, createWebHistory } from "vue-router";

import Banner from "@/pages/Banner.vue";
import League from "@/pages/League.vue";
import Player from "@/pages/Player.vue";
import Team from "@/pages/Team.vue";

export const table = [
	{
		index: "/banner",
		title: "首页",
	},
	{
		index: "/league",
		title: "比赛",
	},
	{
		index: "/team",
		title: "球队",
	},
	{
		index: "/player",
		title: "球员",
	},
];

const routes = [
	{ path: "/", redirect: "/banner" },
	{ path: "/banner", component: Banner },
	{ path: "/league", component: League },
	{ path: "/team", component: Team },
	{ path: "/player", component: Player },
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});

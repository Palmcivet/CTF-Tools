<template>
	<el-container>
		<el-header>
			<el-menu default-active="/banner" mode="horizontal" router>
				<img alt="Vue logo" src="./assets/logo.png" class="logo" />
				<el-menu-item v-for="(v, i) in table" :key="i" :index="v.index">
					{{ v.title }}
				</el-menu-item>
			</el-menu>
		</el-header>
		<el-main>
			<router-view v-slot="{ Component }">
				<keep-alive include="Banner,Team,Player">
					<component :is="Component" />
				</keep-alive>
			</router-view>
		</el-main>
	</el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { table } from "./router";

export default defineComponent({
	name: "App",
	data() {
		return {
			table,
		};
	},
});
</script>

<style lang="less">
body {
	margin: 0;
	width: 100vw;
	height: 100vh;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	height: 100%;
}

.logo {
	margin-top: 7px;
	margin-right: 5em;
	width: 45px;
	height: 45px;
	float: left;
}

.el-container {
	height: 100%;
}

.el-menu-item {
	font-size: 16px;
}
</style>

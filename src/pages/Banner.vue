<template>
	<el-row>
		<el-col :span="6" :push="2">
			<h4 style="text-align: center">友链</h4>
			<div class="link-container">
				<el-tag type="primary" v-for="(item, idx) in linkList" :key="idx">
					<el-link type="primary" :underline="false" :href="item.Url" target="_blank">
						{{ item.Title }}
					</el-link>
				</el-tag>
			</div>
		</el-col>

		<el-col :span="14" :push="2">
			<el-carousel type="card" height="180px">
				<el-carousel-item v-for="(item, idx) in newsList.slice(0, 3)" :key="idx">
					<a class="carousel-item" :href="item.Source" target="_blank">
						<img :src="'/img/' + item.Href" />
						<h3>{{ item.Title }}</h3>
					</a>
				</el-carousel-item>
			</el-carousel>

			<div class="news-container">
				<NewsCard :news="news" :key="idx" v-for="(news, idx) in newsList.slice(3)" />
			</div>
		</el-col>
	</el-row>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from "@vue/runtime-core";
import NewsCard from "../components/NewsCard.vue";

export default defineComponent({
	components: { NewsCard },
	setup() {
		const newsList = ref<INewsItem[]>([]);
		const linkList = ref<ILinkItem[]>([]);

		onBeforeMount(() => {
			fetch("data/news.json", {
				method: "GET",
			})
				.then((res) => res.json())
				.then((res: INewsItem[]) => {
					newsList.value = res;
				});

			fetch("data/link.json", {
				method: "GET",
			})
				.then((res) => res.json())
				.then((res: ILinkItem[]) => {
					linkList.value = res;
				});
		});

		return {
			newsList,
			linkList,
		};
	},
});
</script>

<style lang="less" scoped>
img {
	margin: 0;
	width: 350px;
	height: 200px;
	float: left;
}

.el-row,
.el-col {
	height: 100%;
}

.el-carousel__item h3 {
	color: #475669;
	font-size: 18px;
	opacity: 0.75;
	line-height: 300px;
	margin: 0;
}

.el-carousel__item:nth-child(2n) {
	background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
	background-color: #d3dce6;
}

.carousel-item {
	h3 {
		position: absolute;
		text-shadow: 2px 2px 0px black;
		color: white;
	}

	img {
		width: 100%;
	}
}

.link-container {
	display: flex;
	flex-wrap: wrap;
	flex-flow: wrap-reverse;
	flex-direction: row;

	> * {
		margin: 5px;
	}
}

.news-container {
	overflow: auto;
	height: calc(100% - 206px);
	display: flex;
	flex-flow: wrap;
	flex-direction: row;
	justify-content: center;

	.el-card {
		margin: 5px;
		width: 48%;
	}
}
</style>

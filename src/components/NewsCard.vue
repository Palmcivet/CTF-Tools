<template>
	<el-card shadow="hover">
		<img :src="'/img/' + news.Href" />
		<div class="news-desc">
			<span class="news-title">{{ news.Title }}</span>
			<div class="news-first">{{ news.FirstPara }}</div>
			<div class="news-info">
				<time>{{ news.Time }}</time>
				<el-link type="primary" :href="news.Source" target="_blank">查看新闻</el-link>
			</div>
		</div>
	</el-card>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
	props: ["news"],
});
</script>

<style lang="less" scoped>
img {
	width: 100%;
}

.news-desc {
	.news-info {
		display: flex;
		justify-content: space-between;
	}

	.news-title {
		display: block;
		font-weight: bolder;
		text-align: center;
	}

	.news-first {
		text-indent: 2em;
		margin: 5px 0;
	}
}
</style>

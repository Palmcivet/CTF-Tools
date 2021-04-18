import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import alias from "@rollup/plugin-alias";
import styleImport from "vite-plugin-style-import";

export default defineConfig({
	plugins: [
		vue(),
		alias({
			entries: [{ find: "@", replacement: resolve(__dirname, "./src") }],
		}),
		styleImport({
			libs: [
				{
					libraryName: "element-plus",
					esModule: true,
					resolveStyle: (name) => {
						return `element-plus/lib/theme-chalk/${name}.css`;
					},
					resolveComponent: (name) => {
						return `element-plus/lib/${name}`;
					},
				},
			],
		}),
	],
});

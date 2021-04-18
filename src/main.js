import { createApp } from "vue";
import ElementPlus from "element-plus";
import locale from "element-plus/lib/locale/lang/zh-cn";
import "element-plus/lib/theme-chalk/index.css";

import App from "./App.vue";
import { router } from "./router";

createApp(App).use(ElementPlus, { locale }).use(router).mount("#app");

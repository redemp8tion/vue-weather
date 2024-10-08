import { createApp } from 'vue'
import "@/style/reset.scss"

import App from './App.vue'
import router from './router'

// 引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 全局组件
import Search from '@/components/search/index.vue'
import weatherCard from '@/components/weatherCard/index.vue'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
   app.component(key, component)
 }

app
  .component("Search",Search)
  .component("weatherCard",weatherCard)

app.mount('#app')

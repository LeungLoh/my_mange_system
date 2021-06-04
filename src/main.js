import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import './assets/css/icon.css'
// import * as echarts from 'echarts';
const app = createApp(App)
installElementPlus(app)
// app.config.globalProperties.echarts = echarts;
app
    .use(store)
    .use(router)
    .mount('#app')
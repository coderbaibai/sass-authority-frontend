import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueCookies from 'vue3-cookies'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.use(VueCookies)

app.config.globalProperties.$http = axios.create({
    baseURL: '/api'
})
app.config.globalProperties.$test = axios.create({
    baseURL: '/test'
})
app.mount('#app')



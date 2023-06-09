import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'
import router from './router'

import 'virtual:uno.css'
import '@/styles/global.scss'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')

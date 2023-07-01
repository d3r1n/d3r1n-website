import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'
import router from './router'

import 'virtual:uno.css'
import '@/styles/global.scss'
import 'animate.css'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(router)

router.isReady().then(() => {
    app.mount('#app')
})

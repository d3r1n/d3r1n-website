import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue'
import { createApp as createVueApp } from 'vue'

import App from './App.vue'
import router from './router'

import 'virtual:uno.css'
import '@/styles/global.scss'
import 'animate.css'

const pinia = createPinia()
const head = createHead()
const app = createVueApp(App)

app.use(pinia)
app.use(router)
app.use(head)

router.isReady().then(() => {
    app.mount('#app')
})

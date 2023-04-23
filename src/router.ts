import { createRouter, createWebHistory } from "vue-router"
import routes from "virtual:generated-pages"

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to) {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: "smooth",
            }
        }
    },
})

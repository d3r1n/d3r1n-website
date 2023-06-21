import { createRouter, createWebHistory } from 'vue-router'

import Home from './views/Home.vue'
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('./views/About.vue')
    },
    {
        path: '/projects',
        name: 'projects',
        component: () => import('./views/Projects.vue')
    },
    {
        path: '/songs',
        name: 'songs',
        component: () => import('./views/Songs.vue')
    },
    // 404
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('./views/404.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
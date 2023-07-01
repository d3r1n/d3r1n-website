import { createRouter, createWebHistory } from 'vue-router'

import Home from './views/Home.vue'
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            title: 'Home',
            enter: 'animate__animated animate__fadeInLeft',
            leave: 'animate__animated animate__fadeOutRight'
        }
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('./views/About.vue'),
        meta: {
            title: 'About',
            enter: 'animate__animated animate__fadeInRight',
            leave: 'animate__animated animate__fadeOutLeft'
        }
    },
    {
        path: '/projects',
        name: 'projects',
        component: () => import('./views/Projects.vue'),
        meta: {
            title: 'Projects',
            enter: 'animate__animated animate__fadeInRight',
            leave: 'animate__animated animate__fadeOutLeft'
        }
    },
    {
        path: '/songs',
        name: 'songs',
        component: () => import('./views/Songs.vue'),
        meta: {
            title: 'Songs',
            enter: 'animate__animated animate__fadeInRight',
            leave: 'animate__animated animate__fadeOutLeft'
        }
    },
    // 404
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('./views/404.vue'),
        meta: {
            title: '404',
            enter: 'animate__animated animate__fadeIn',
            leave: 'animate__animated animate__fadeOut'
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

import {createRouter, createWebHistory} from 'vue-router'
import routes from '~pages'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'Not Found',
            path: '/:pathMatch(.*)*',
            component: () => import('./pages/error/404.vue')
        },
        {
            name: 'Home',
            path: '/',
            component: () => import('./pages/home.vue')
        },
        ...routes
    ]
})

export default router

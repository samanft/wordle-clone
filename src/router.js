import { createWebHistory, createRouter } from 'vue-router'

import Options from './components/Options.vue'
import Game from './components/Game.vue'

const routes = [
    { path: '/', component: Options },
    { path: '/game/:maxAttempts', component: Game, props: route => ({ maxAttempts: Number(route.params.maxAttempts) }) },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
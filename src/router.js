import { createWebHistory, createRouter } from 'vue-router'

import Options from './components/Options.vue'
import Game from './components/Game.vue'

const routes = [
    { path: '/', component: Options },
    {
        path: '/game',
        component: Game,
        props: route => ({
            maxAttempts: Number(route.query.maxAttempts),
            wordLength: Number(route.query.wordLength),
            selectedDifficulty: route.query.difficulty
        })
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
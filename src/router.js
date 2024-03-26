import store from './store/index.js'
import { createRouter, createWebHistory } from 'vue-router';

import EventsList from './pages/events/EventsList.vue'
import EventCreation from './pages/events/EventCreation.vue'
import HealthCounter from './pages/HealthCounter.vue'
import NotFound from './pages/NotFound.vue'
import UserAuth from './pages/auth/UserAuth.vue'
import CurrentGame from './pages/CurrentGame.vue'
import PlayersList from './pages/players/PlayersList.vue'
import EventDetails from './pages/events/EventDetails.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', redirect: '/events'},
        {path: '/events', component: EventsList},
        {path: '/events/:id', 
        component: EventDetails, 
        props: true, //passo l'id (:id) come prop
        },
        {path: '/events/new', 
        component: EventCreation, 
        props: true, //passo l'id (:id) come prop
        },
        {path: '/players', component: PlayersList},
        {path: '/players/:id', 
        component: PlayersList, 
        props: true,
        },
        {path: '/counter', component: HealthCounter},
        {path: '/current', component: CurrentGame, meta: {requiresAuth: true}},
        {path: '/auth', component: UserAuth, meta: {requiresUnauth: true}},
        {path: '/:notFound(.*)', component: NotFound},
    ],
});


//global route guard
router.beforeEach((to, _, next)=> {
    if(to.meta.requiresAuth && !store.getters.isAuthenticated){
        next(false)
    }else if(to.meta.requiresUnauth && store.getters.isAuthenticated){
        next('/events')
    }else{
        next()
    }
})

export default router;
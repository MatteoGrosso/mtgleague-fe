
import { createRouter, createWebHistory } from 'vue-router';

import EventsList from './pages/events/EventsList.vue'
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
        {path: '/players', component: PlayersList},
        {path: '/players/:id', 
        component: PlayersList, 
        props: true, //passo l'id (:id) come prop
        },
        {path: '/counter', component: HealthCounter},
        {path: '/current', component: CurrentGame},
        {path: '/auth', component: UserAuth},   //TODO add , meta: {requiresUnauth: true}
        {path: '/:notFound(.*)', component: NotFound},
    ],
});

/*
//global route guard
router.beforeEach((to, _, next)=> {
    if(to.meta.requiresAuth && !store.getters.isAuthenticated){
        next('/auth') //next(false) bloccherebbe il redirect
    }else if(to.meta.requiresUnauth && store.getters.isAuthenticated){
        next('/coaches')
    }else{
        next()
    }
})
*/

export default router;
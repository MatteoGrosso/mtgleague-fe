import {createStore} from 'vuex'

import authModule from './modules/auth';
import eventsModule from './modules/events';
import playersModule from './modules/players';

const store= createStore({
    modules: {
        auth: authModule,
        events: eventsModule,
        players: playersModule
    },
})

export const endpoint = 'http://localhost:8082';

export default store;
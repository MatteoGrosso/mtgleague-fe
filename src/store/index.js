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

export const endpoint = 'https://tax3k68qj2.execute-api.us-east-1.amazonaws.com/Prod';

export default store;
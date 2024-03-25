import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      players: [
        {
          id: '1',
          name: 'Matteo',
          surname: 'Grosso',
          score: 30,        //punti lega
          eventsPlayed: 2, //tappe giocate
          winrate: 70     //percentuale di vittoria overall
        },
        {
          id: '2',
          name: 'Paolo',
          surname: 'Grosso',
          score: 40,
          eventsPlayed: 2,
          winrate: 80
        },
        {
          id: '3',
          name: 'Raffaele',
          surname: 'Sciarrone',
          score: 25,
          eventsPlayed: 3,
          winrate: 60
        },
        {
          id: '1',
          name: 'Matteo',
          surname: 'Grosso',
          score: 30,        //punti lega
          eventsPlayed: 2, //tappe giocate
          winrate: 70     //percentuale di vittoria overall
        },
        {
          id: '2',
          name: 'Paolo',
          surname: 'Grosso',
          score: 40,
          eventsPlayed: 2,
          winrate: 80
        },
        {
          id: '3',
          name: 'Raffaele',
          surname: 'Sciarrone',
          score: 25,
          eventsPlayed: 3,
          winrate: 60
        },
        {
          id: '1',
          name: 'Matteo',
          surname: 'Grosso',
          score: 30,        //punti lega
          eventsPlayed: 2, //tappe giocate
          winrate: 70     //percentuale di vittoria overall
        },
        {
          id: '2',
          name: 'Paolo',
          surname: 'Grosso',
          score: 40,
          eventsPlayed: 2,
          winrate: 80
        },
        {
          id: '3',
          name: 'Raffaele',
          surname: 'Sciarrone',
          score: 25,
          eventsPlayed: 3,
          winrate: 60
        },
        {
          id: '1',
          name: 'Matteo',
          surname: 'Grosso',
          score: 30,        //punti lega
          eventsPlayed: 2, //tappe giocate
          winrate: 70     //percentuale di vittoria overall
        },
        {
          id: '2',
          name: 'Paolo',
          surname: 'Grosso',
          score: 40,
          eventsPlayed: 2,
          winrate: 80
        },
        {
          id: '3',
          name: 'Raffaele',
          surname: 'Sciarrone',
          score: 25,
          eventsPlayed: 3,
          winrate: 60
        },
        {
          id: '1',
          name: 'Matteo',
          surname: 'Grosso',
          score: 30,        //punti lega
          eventsPlayed: 2, //tappe giocate
          winrate: 70     //percentuale di vittoria overall
        },
        {
          id: '2',
          name: 'Paolo',
          surname: 'Grosso',
          score: 40,
          eventsPlayed: 2,
          winrate: 80
        },
        {
          id: '3',
          name: 'Raffaele',
          surname: 'Sciarrone',
          score: 25,
          eventsPlayed: 3,
          winrate: 60
        },
        {
          id: '1',
          name: 'Matteo',
          surname: 'Grosso',
          score: 30,        //punti lega
          eventsPlayed: 2, //tappe giocate
          winrate: 70     //percentuale di vittoria overall
        },
        {
          id: '2',
          name: 'Paolo',
          surname: 'Grosso',
          score: 40,
          eventsPlayed: 2,
          winrate: 80
        },
        {
          id: '3',
          name: 'Raffaele',
          surname: 'Sciarrone',
          score: 25,
          eventsPlayed: 3,
          winrate: 60
        },
        {
          id: '1',
          name: 'Matteo',
          surname: 'Grosso',
          score: 30,        //punti lega
          eventsPlayed: 2, //tappe giocate
          winrate: 70     //percentuale di vittoria overall
        },
        {
          id: '2',
          name: 'Paolo',
          surname: 'Grosso',
          score: 40,
          eventsPlayed: 2,
          winrate: 80
        },
        {
          id: '3',
          name: 'Raffaele',
          surname: 'Sciarrone',
          score: 25,
          eventsPlayed: 3,
          winrate: 60
        },
        {
          id: '1',
          name: 'Matteo',
          surname: 'Grosso',
          score: 30,        //punti lega
          eventsPlayed: 2, //tappe giocate
          winrate: 70     //percentuale di vittoria overall
        },
        {
          id: '2',
          name: 'Paolo',
          surname: 'Grosso',
          score: 40,
          eventsPlayed: 2,
          winrate: 80
        },
        {
          id: '3',
          name: 'Raffaele',
          surname: 'Sciarrone',
          score: 25,
          eventsPlayed: 3,
          winrate: 60
        },
        {
          id: '1',
          name: 'Matteo',
          surname: 'Grosso',
          score: 30,        //punti lega
          eventsPlayed: 2, //tappe giocate
          winrate: 70     //percentuale di vittoria overall
        },
        {
          id: '2',
          name: 'Paolo',
          surname: 'Grosso',
          score: 40,
          eventsPlayed: 2,
          winrate: 80
        },
        {
          id: '3',
          name: 'Raffaele',
          surname: 'Sciarrone',
          score: 25,
          eventsPlayed: 3,
          winrate: 60
        },
        {
          id: '1',
          name: 'Matteo',
          surname: 'Grosso',
          score: 30,        //punti lega
          eventsPlayed: 2, //tappe giocate
          winrate: 70     //percentuale di vittoria overall
        },
        {
          id: '2',
          name: 'Paolo',
          surname: 'Grosso',
          score: 40,
          eventsPlayed: 2,
          winrate: 80
        },
        {
          id: '3',
          name: 'Raffaele',
          surname: 'Sciarrone',
          score: 25,
          eventsPlayed: 3,
          winrate: 60
        },
        {
          id: '1',
          name: 'Matteo',
          surname: 'Grosso',
          score: 30,        //punti lega
          eventsPlayed: 2, //tappe giocate
          winrate: 70     //percentuale di vittoria overall
        },
        {
          id: '2',
          name: 'Paolo',
          surname: 'Grosso',
          score: 40,
          eventsPlayed: 2,
          winrate: 80
        },
        {
          id: '3',
          name: 'Raffaele',
          surname: 'Sciarrone',
          score: 25,
          eventsPlayed: 3,
          winrate: 60
        },
        {
          id: '1',
          name: 'Matteo',
          surname: 'Grosso',
          score: 30,        //punti lega
          eventsPlayed: 2, //tappe giocate
          winrate: 70     //percentuale di vittoria overall
        },
        {
          id: '2',
          name: 'Paolo',
          surname: 'Grosso',
          score: 40,
          eventsPlayed: 2,
          winrate: 80
        },
        {
          id: '3',
          name: 'Raffaele',
          surname: 'Sciarrone',
          score: 25,
          eventsPlayed: 3,
          winrate: 60
        },
        {
          id: '1',
          name: 'Matteo',
          surname: 'Grosso',
          score: 30,        //punti lega
          eventsPlayed: 2, //tappe giocate
          winrate: 70     //percentuale di vittoria overall
        },
        {
          id: '2',
          name: 'Paolo',
          surname: 'Grosso',
          score: 40,
          eventsPlayed: 2,
          winrate: 80
        },
        {
          id: '3',
          name: 'Raffaele',
          surname: 'Sciarrone',
          score: 25,
          eventsPlayed: 3,
          winrate: 60
        },
        {
          id: '1',
          name: 'Matteo',
          surname: 'Grosso',
          score: 30,        //punti lega
          eventsPlayed: 2, //tappe giocate
          winrate: 70     //percentuale di vittoria overall
        },
        {
          id: '2',
          name: 'Paolo',
          surname: 'Grosso',
          score: 40,
          eventsPlayed: 2,
          winrate: 80
        },
        {
          id: '3',
          name: 'Raffaele',
          surname: 'Sciarrone',
          score: 25,
          eventsPlayed: 3,
          winrate: 60
        },
        
      ],
    };
  },
  mutations,
  actions,
  getters,
};

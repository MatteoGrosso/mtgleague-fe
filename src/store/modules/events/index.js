import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      events: [
        {
          id: 'c1',
          name: 'Torneo 1',
          date: new Date(),
          cap: 30,
          description: "Torneo pauper",
          cost: 5,
          players: [{id:'1', name: 'Matteo Grosso'}, {id:'2', name: 'Raffele Sciarrone'}, {id:'3', name: 'GabriG'}, {id:'4', name: 'Paolo Grosso'}] //TODO mettere arra vuoto. Questo array viene popolato ogni volta che qualcuno si iscrive
        },
        {
          id: 'c2',
          name: 'Torneo 2',
          date: new Date(),
          cap: 28,
          description: "Torneo pauper",
          cost: 6,
          players: [{id:'1', name: 'GabriG'}, {id:'1', name: 'Raffele Sciarrone'}]
        },
        {
          id: 'c3',
          name: 'Torneo 3',
          date: new Date(),
          cap: 32,
          description: "Torneo pauper",
          cost: 5,
          players: [{name: 'Matteo Grosso'}, {name: 'Raffele Sciarrone'}, {name: 'GabriG'}, {name: 'Paolo Grosso'}, {name: 'Norberto Guizzo'}, {name: 'Michele Nigretti'}]
        },
        {
          id: 'c1',
          name: 'Torneo 1',
          date: new Date(),
          cap: 30,
          description: "Torneo pauper",
          cost: 5,
          players: [{id:'1', name: 'Matteo Grosso'}, {id:'2', name: 'Raffele Sciarrone'}, {id:'3', name: 'GabriG'}, {id:'4', name: 'Paolo Grosso'}] //TODO mettere arra vuoto. Questo array viene popolato ogni volta che qualcuno si iscrive
        },
        {
          id: 'c2',
          name: 'Torneo 2',
          date: new Date(),
          cap: 28,
          description: "Torneo pauper",
          cost: 6,
          players: [{id:'1', name: 'GabriG'}, {id:'1', name: 'Raffele Sciarrone'}]
        },
        {
          id: 'c3',
          name: 'Torneo 3',
          date: new Date(),
          cap: 32,
          description: "Torneo pauper",
          cost: 5,
          players: [{name: 'Matteo Grosso'}, {name: 'Raffele Sciarrone'}, {name: 'GabriG'}, {name: 'Paolo Grosso'}, {name: 'Norberto Guizzo'}, {name: 'Michele Nigretti'}]
        }
      ],
    };
  },
  mutations,
  actions,
  getters,
};

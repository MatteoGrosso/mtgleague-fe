import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      lastEventsFetch: null,
      events: [],
      futureEvents: [],
      pastEvents: [],
      selectedEventRanks: [],
      selectedEvent: null,
      currentRound: null,
    };
  },
  mutations,
  actions,
  getters,
};

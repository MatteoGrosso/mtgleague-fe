export default {
  setPlayers(state, payload) {
    state.players = payload;
  },
  setLoadPlayersFetchTimestamp(state) {
    state.lastPlayersFetch = new Date().getTime();
  },
};

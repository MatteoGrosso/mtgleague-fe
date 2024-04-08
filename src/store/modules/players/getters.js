export default {
  getPlayers(state) {
    return state.players;
  },
  shouldUpdatePlayers(state) {
    const lastPlayersFetch = state.lastPlayersFetch;
    if (!lastPlayersFetch) {
      return true;
    } else {
      const currentTimeStamp = new Date().getTime();
      return (currentTimeStamp - lastPlayersFetch) / 1000 > 60; //ritorna true se è più di un minuto fa
    }
  },
};

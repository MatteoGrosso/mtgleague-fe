export default {
  addEvent(state, payload) {
    state.events.push(payload);
  },
  setEvents(state, payload) {
    state.events = payload;
  },
  setSelectedEvent(state, payload) {
    state.selectedEvent = payload;
  },
  setFutureEvents(state, payload) {
    state.futureEvents = payload;
  },
  setPastEvents(state, payload) {
    state.pastEvents = payload;
  },
  setLoadEventsFetchTimestamp(state) {
    state.lastEventsFetch = new Date().getTime();
  },
  setCurrentRound(state, payload){
    state.currentRound= payload;
  }
};

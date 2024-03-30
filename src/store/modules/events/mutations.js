export default {
  addEvent(state, payload) {
    state.events.push(payload);
  },
  setEvents(state, payload) {
    state.events = payload;
  },
  setSelectedEvent(state, payload) {
    state.event = payload;
  },
  setFutureEvents(state, payload) {
    state.futureEvents = payload;
  },
  setPastEvents(state, payload) {
    state.pastEvents = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  },
};

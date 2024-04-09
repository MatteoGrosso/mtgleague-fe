const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default {
  getEvents(state) {
    return state.events;
  },
  getPastEvents(state) {
    return state.pastEvents;
  },
  getFutureEvents(state) {
    return state.futureEvents;
  },
  shouldUpdateEvents(state){
    const lastEventsFetch= state.lastEventsFetch
    if(!lastEventsFetch){
      return true
    }else{
      const currentTimeStamp= new Date().getTime()
      return (currentTimeStamp - lastEventsFetch) /1000 >60 //ritorna true se è più di un minuto fa
    }
  },
  getSelectedEvent(state){
    return state.selectedEvent
  },
  getCurrentRound(state){
    return state.currentRound
  },
  isGone(state){
    return state.selectedEvent.date <= formatDate(new Date())
  },
  getSelectedEventRanks(state){
    return state.selectedEventRanks
  }
};

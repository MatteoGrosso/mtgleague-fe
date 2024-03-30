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
  shouldUpdate(state){
    const lastFetch= state.lastFetch
    if(!lastFetch){
      return true
    }else{
      const currentTimeStamp= new Date().getTime()
      return (currentTimeStamp - lastFetch) /1000 >60 //ritorna true se è più di un minuto fa
    }
  },
};

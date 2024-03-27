export default {
  async addEvent(context, data) {
    const token = context.rootGetters.getToken;
    const newEvent = {
      name: data.name,
      date: data.date,
      cap: data.cap,
      description: data.desc,
    };

    const response = await fetch(
      `https://mtg-league-app-default-rtdb.europe-west1.firebasedatabase.app/events.json?auth=` + token,
      {
        method: 'POST',
        body: JSON.stringify(newEvent),
      }
    );

    if (!response.ok) {
        //TODO Error
      return
    }

    context.commit('addEvent', newEvent);
  },

  async loadEvents(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await fetch(
      `https://mtg-league-app-default-rtdb.europe-west1.firebasedatabase.app/events.json`
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    const events = [];

    for (const key in responseData) {
      const event = {
        id: key,
        name: responseData[key].name,
        date: responseData[key].date,
        cap: responseData[key].cap,
        description: responseData[key].description,
      };
      events.push(event);
    }

    context.commit('setEvents', events);

    context.dispatch('filterEvents', events);

    context.commit('setFetchTimestamp');
  },

  async filterEvents(context, events) {
    const futureEvents= []
    const pastEvents= []
    for (const event of events) {
      console.log(event.date)
      if(event.date > (new Date().toISOString().split('T')[0])){
        futureEvents.push(event)
      }else{
        pastEvents.push(event)
      }
    }

    console.log('futureEvents: '+futureEvents)
    console.log('pastEvents: '+pastEvents)

    context.commit('setFutureEvents', futureEvents);
    context.commit('setPastEvents', pastEvents);

  }
};

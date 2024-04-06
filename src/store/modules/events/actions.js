export default {
  async addEvent(context, data) {
    const token = context.rootGetters.getToken;
    const newEvent = {
      name: data.name,
      date: data.date,
      cap: data.cap,
      description: data.desc,
      players: [],
    };
    console.log("token")
    console.log(token)
    const response = await fetch(
      `http://localhost:8080/events/new`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newEvent),
      }
    );

    if (!response.ok) {
      //TODO Error
      return;
    }

    context.commit('addEvent', newEvent);
  },

  async loadEvents(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdateEvents) {
      return;
    }

    const response = await fetch(
      `http://localhost:8080/events`
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    const events = [];

    for (const key in responseData.results) {
      const event = {
        id: key,
        eventId: +responseData.results[key].id,
        name: responseData.results[key].name,
        date: responseData.results[key].date,
        cap: responseData.results[key].cap,
        description: responseData.results[key].description,
        players: responseData.results[key].players,
      };
      events.push(event);
    }

    context.commit('setEvents', events);

    context.dispatch('filterEvents', events);

    context.commit('setLoadEventsFetchTimestamp');
  },

  async filterEvents(context, events) {
    const futureEvents = [];
    const pastEvents = [];
    for (const event of events) {

      if (event.date > new Date().toISOString().split('T')[0]) {
        futureEvents.push(event);
      } else {
        pastEvents.push(event);
      }
    }
    context.commit('setFutureEvents', futureEvents);
    context.commit('setPastEvents', pastEvents);
  },

  async subscribePlayerToEvent(context, payload) {
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.getToken;
    const eventId = payload.eventId;

    const playerToSubscribe = {
      playerId: userId,
    };

    const response = await fetch(
      `http://localhost:8080/events/${eventId}/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(playerToSubscribe),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.error || 'Failed to subscribe player!'
      );
      throw error;
    }
  },

  async findEventById(context, payload) {

    const response = await fetch(
      `http://localhost:8080/events/${payload.eventId}`
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    context.commit('setSelectedEvent', responseData);
  },

  async findCurrentRound(context) {
    const userId = {
      playerId: context.rootGetters.userId
    };
    const token = context.rootGetters.getToken;
    const response = await fetch(
      `http://localhost:8080/rounds/current`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userId),
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }
    context.commit('setCurrentRound', responseData);
  },

  async confirmScore(context, payload){
    const round = {
      playerId: context.rootGetters.userId,
      roundId: payload.round.roundId,
      p1Wins: payload.round.p1Wins,
      p2Wins: payload.round.p2Wins
    };
    const token = context.rootGetters.getToken;
    const response = await fetch(
      `http://localhost:8080/rounds/save`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(round),
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }
  },

  async startEvent(context, eventId){
    const token = context.rootGetters.getToken;

    const response = await fetch(
      `http://localhost:8080/events/${eventId}/start`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      }
    );
    let responseData;
    try {
      responseData = await response.json();
    } catch (error) {
      responseData = {};
    }
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to start event!');
      throw error;
    }
  }
};

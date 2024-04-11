export default {
    async loadPlayers(context, payload) {
        if (!payload.forceRefresh && !context.getters.shouldUpdatePlayers) {
          return;
        }
    
        const response = await fetch(
          `http://ec2-35-174-170-51.compute-1.amazonaws.com:8080/players`
        );
        const responseData = await response.json();
    
        if (!response.ok) {
          const error = new Error(responseData.message || 'Failed to fetch!');
          throw error;
        }
    
        const players = [];
    
        for (const key in responseData.results) {
          const player = {
            id: key,
            name: responseData.results[key].name,
            surname: responseData.results[key].surname,
            matchWinRate: responseData.results[key].matchWinRate,
            score: responseData.results[key].score,
            eventsPlayed: responseData.results[key].eventsPlayed,
          };
          players.push(player);
        }
    
        context.commit('setPlayers', players);
    
        context.commit('setLoadPlayersFetchTimestamp');
      },
};

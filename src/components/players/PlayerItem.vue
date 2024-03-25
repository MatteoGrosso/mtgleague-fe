<template>
<router-link :to="redirectTo">
  <div class="player-row">
    <div class="player-rank" v-if="rank">{{ rank }}</div>
    <div class="player-name">{{ name }}</div>
    <div class="player-score" v-if="score">{{ score }}</div>
    <div class="player-events" v-if="eventsPlayed">{{ eventsPlayed }}</div>
    <div class="player-winrate" v-if="winrate">{{ winrate }}%</div>
  </div>
</router-link>
  
</template>

<script>
export default {
  props: ['id','rank', 'name', 'score', 'eventsPlayed', 'winrate'],
  computed: {
    redirectTo(){
        return '/players/' + this.id;
    }
  },
};
</script>

<style scoped>
a{
    text-decoration: none;
    color: black;
}
a:visited {
  color: inherit;
}
a:hover{
  color: rgba(212, 0, 255, 0.637);
}


    .player-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
    }
    .player-name {
      flex: 1;
    }
    .player-rank,
    .player-score,
    .player-events,
    .player-winrate {
      flex-basis: 20%;
      text-align: center;
    }
</style>

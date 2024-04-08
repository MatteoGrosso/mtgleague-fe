<template>
  <base-card>
    <div id="app">
      <div class="player-row header">
        <div class="player-rank">#</div>
        <div class="player-name">Nome</div>
        <div class="player-score">Punti</div>
        <div class="player-events">#Tornei</div>
        <div class="player-winrate">%MatchWin</div>
      </div>
        <player-item v-for="(player,index) in sortedPlayers" :key="player"
        :rank="index+1"
        :id="player.id"
        :name="player.name"
        :score="player.score"
        :eventsPlayed="player.eventsPlayed"
        :winrate="player.winrate"
        ></player-item >
    </div>
  </base-card>
</template>

<script>
import PlayerItem from '../../components/players/PlayerItem.vue'

export default {
  computed: {
    //...mapGetters('players',['getPlayers']),
    sortedPlayers(){
      return null //this.getPlayers
    }
  },
  components: {
    PlayerItem
  }
};
</script>

<style scoped>
.player-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
      font-size: 0.8rem;
    }
    .player-row.header {
      font-weight: bold;
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

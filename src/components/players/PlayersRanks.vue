<template>
    <div class="players-container">
      <div class="player-row header" v-if="general">
        <div class="player-rank">#</div>
        <div class="player-name">Nome</div>
        <div class="player-score">Punti</div>
        <div class="player-events">#Tornei</div>
        <div class="player-winrate">%MatchWin</div>
      </div>
      <div class="player-row header" v-else>
        <div class="player-rank">#</div>
        <div class="player-name">Nome</div>
        <div class="player-score">Punti</div>
        <div class="player-omw">%omw</div>
        <div class="player-gw">%gw</div>
        <div class="player-ogw">%ogw</div>
      </div>
      <div v-if="players.length > 0">
        <player-item
          v-for="(player, index) in players"
          :key="player"
          :rank="index + 1"
          :name="player.name"
          :surname="player.surname"
          :score="player.score"
          :eventsPlayed="player.eventsPlayed"
          :winrate="player.matchWinRate"
          :omw="player.omw"
          :gw="player.gw"
          :ogw="player.ogw"
          :general="general"
        ></player-item>
      </div>
    </div>
</template>

<script>
import PlayerItem from './PlayerItem.vue';

export default {
  props: ['players', 'general'],
  components: {
    PlayerItem,
  },
};
</script>

<style scoped>
.players-container {
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
}

.player-row.header {
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.2rem 0;
  border-bottom: 1px solid #ccc;
}

.player-score,
.player-events,
.player-winrate,
.player-rank,
.player-omw,
.player-gw,
.player-name,
.player-ogw{
  text-align: center;
  flex: 0.5;
}

.player-name {
  flex: 1.5;
  max-width: 10rem;
}

.player-score,
.player-events,
.player-winrate,
.player-omw,
.player-gw,
.player-ogw {
  flex-basis: 10%;
  text-align: center;
}
</style>

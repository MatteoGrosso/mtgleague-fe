<template>
  <div v-if="showNamesOnly">
    <div class="player-names-row">
      <div>{{name}} {{surname}}</div>
    </div>
  </div>
  <div v-else-if="general">
    <div class="player-row">
      <div class="player-rank">{{ rank }}</div>
      <div class="player-name">{{name}} {{surname}}</div>
      <div class="player-score">{{ score }}</div>
      <div class="player-events">{{ eventsPlayed }}</div>
      <div class="player-winrate">{{ winrate }}</div>
    </div>
  </div>
  <div v-else>
    <div class="player-row">
      <div class="player-rank">{{ rank }}</div>
      <div class="player-name">{{name}} {{surname}}</div>
      <div class="player-score">{{ score }}</div>
      <div class="player-omw">{{ omw }}</div>
      <div class="player-gw">{{ gw }}</div>
      <div class="player-ogw">{{ ogw }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rank', 'name', 'surname', 'score', 'eventsPlayed', 'winrate', 'omw', 'gw', 'ogw', 'general', 'showNamesOnly'],
};
</script>

<style scoped>

.player-row {
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.2rem 0;
  border-bottom: 1px solid #ccc;
}

.player-names-row {
  font-size: 1rem;
  padding: 0.3rem 0;
  border-bottom: 1px solid #ccc;
  text-align: center;
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

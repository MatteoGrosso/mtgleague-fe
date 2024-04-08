<template>
    <div class="player-row">
      <div class="player-rank">{{ rank }}</div>
      <div class="player-name">{{name}} {{surname}}</div>
      <div class="player-score">{{ score }}</div>
      <div class="player-events">{{ eventsPlayed }}</div>
      <div class="player-winrate">{{ winrate }}</div>
    </div>
</template>

<script>
export default {
  props: ['rank', 'name', 'surname', 'score', 'eventsPlayed', 'winrate'],
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

.player-score,
.player-events,
.player-winrate,
.player-rank{
  text-align: center;
  flex: 0.5;
}

.player-name {
  flex: 2;
  text-align: left;
  max-width: 8rem;
}

.player-score,
.player-events,
.player-winrate {
  flex-basis: 10%;
  text-align: center;
}
</style>

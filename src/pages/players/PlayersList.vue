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
      <player-item
        v-for="(player, index) in getPlayers"
        :key="player"
        :rank="index + 1"
        :name="player.name"
        :surname="player.surname"
        :score="player.score"
        :eventsPlayed="player.eventsPlayed"
        :winrate="player.matchWinRate"
      ></player-item>
    </div>
  </base-card>
</template>

<script>
import PlayerItem from '../../components/players/PlayerItem.vue';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('players', ['getPlayers']),
  },
  components: {
    PlayerItem,
  },
  data() {
    return {
      players: [],
    };
  },
  methods: {
    async loadPlayers(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('players/loadPlayers', {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
    },
  },
  created() {
    this.loadPlayers(true);
  },
};
</script>

<style scoped>
.player-row {
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}
.player-row.header {
  font-weight: bold;
}
.player-score,
.player-events,
.player-winrate,
.player-name,
.player-rank{
  text-align: center;
}
.player-name {
  flex: 2;
  max-width: 10rem;
}
.player-score,
.player-events,
.player-winrate,
.player-rank{
  text-align: center;
  flex: 0.5;
}
.player-score,
.player-events,
.player-winrate {
  flex-basis: 10%;
}
</style>

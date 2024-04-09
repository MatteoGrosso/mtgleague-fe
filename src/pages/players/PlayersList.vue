<template>
  <base-card>
    <players-ranks :players="getPlayers" :general="true">
    </players-ranks>
  </base-card>
</template>

<script>
import PlayersRanks from '../../components/players/PlayersRanks.vue';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('players', ['getPlayers']),
  },
  components: {
    PlayersRanks,
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

<style scoped></style>

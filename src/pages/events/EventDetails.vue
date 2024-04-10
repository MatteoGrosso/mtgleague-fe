<template>
  <base-card>
    <section>
      <div>
        <base-button
          :class="'danger'"
          v-if="isAuthenticated && isAdmin && !isEventStarted && isEventToday"
          @click="startEvent">
          Inizia Torneo
        </base-button>
        <header>
          <h2>Dettagli Evento</h2>
          <h3>Nome: {{ name }}</h3>
          <h3>Data: {{ date }}</h3>
          <h3>Cap giocatori: {{playersSubscribed}}/{{ cap }}</h3>
          <h3>Descrizione: {{ description }}</h3>
        </header>
      </div>
    </section>
    <section>
      <div>
        <div class="manager">
          <base-button
            v-if="isAuthenticated && !isSubscribed && !isEventGone && !isFull"
            @click="subscribePlayer">Iscriviti</base-button>
          <div class="danger" v-if="isEventToday || (!isSubscribed && isFull)">Iscrizioni chiuse!</div>
          <base-button
            v-if="isAuthenticated && isSubscribed && !isEventGone"
            @click="unSubscribePlayer">Disiscriviti</base-button>
          <base-button link class="animated-highlight" to="/auth" v-if="!isAuthenticated && !isEventGone"><u>Accedi</u> per iscriverti</base-button>
          <base-button
            v-if="!isEventGone"
            @click="playersList"
            mode="outline">{{ playersButton }}</base-button>
          <base-button v-if="isEventGone" @click="playersRanks" mode="outline">Mostra classifica</base-button>
          <base-refresh @click="loadDetails()"></base-refresh>
        </div>
      </div>
    </section>
    <section v-if="showPlayersList">
      <div v-if="players && players.length > 0">
        <player-item
          v-for="player in players"
          :key="player"
          :name="player.name"
          :surname="player.surname"
          :showNamesOnly="true"
        ></player-item>
      </div>
      <div v-else>Non ci sono giocatori iscritti a questo torneo!</div>
    </section>
    <section v-if="showPlayersRanks">
      <div v-if="getSelectedEventRanks && getSelectedEventRanks.length > 0">
        <players-ranks :players="getSelectedEventRanks" :general="false"></players-ranks>
      </div>
      <div v-else>La classifica non è ancora disponibile...</div>
    </section>
  </base-card>
</template>

<script>
import PlayerItem from '@/components/players/PlayerItem.vue';
import PlayersRanks from '../../components/players/PlayersRanks.vue';
import { mapGetters } from 'vuex';
import { formatDate } from '@/main';

export default {
  props: ['id'],
  components: {
    PlayerItem,
    PlayersRanks
  },
  data() {
    return {
      selectedEvent: null,
      showPlayersList: false,
      showPlayersRanks: false,
      isEventGone: false,
    };
  },
  computed: {
    ...mapGetters('events', [
      'getSelectedEvent',
      'isGone',
      'getSelectedEventRanks',
    ]),
    name() {
      return this.selectedEvent ? this.selectedEvent.name : '';
    },
    date() {
      return this.selectedEvent ? this.selectedEvent.date : '';
    },
    cap() {
      return this.selectedEvent ? this.selectedEvent.cap : '';
    },
    description() {
      return this.selectedEvent ? this.selectedEvent.description : '';
    },
    playersSubscribed(){
      return this.selectedEvent ? this.selectedEvent.players.length : null;
    },
    players() {
      return this.selectedEvent ? this.selectedEvent.players : null;
    },
    playersButton() {
      return this.showPlayersList ? 'Nascondi giocatori' : 'Mostra giocatori';
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    isSubscribed() {
      return this.players ? this.players.some(player => player.id == this.$store.getters.userId) : false;
    },
    isAdmin() {
      return this.$store.getters.getLoggedUserRole === 'ADMIN';
    },
    isEventStarted() {
      return this.selectedEvent ? this.selectedEvent.started : true;
    },
    isEventToday(){
      return this.selectedEvent ? this.selectedEvent.date===formatDate(new Date()) : false;
    },
    isFull(){
      return this.playersSubscribed === this.cap
    }
  },
  methods: {
    playersList() {
      this.showPlayersList = !this.showPlayersList;
    },
    playersRanks() {
      this.showPlayersRanks = !this.showPlayersRanks;
    },
    async subscribePlayer() {
      try {
        await this.$store.dispatch('events/subscribePlayerToEvent', {
          eventId: this.id,
        });
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.loadDetails(true);
    },
    async unSubscribePlayer() {
      try {
        await this.$store.dispatch('events/unSubscribePlayerToEvent', {
          eventId: this.id,
        });
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.$router.replace('/events');
    },
    async loadDetails() {
      try {
        await this.$store.dispatch('events/findEventById', {
          eventId: this.id,
        });
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.setSelectedEvent();
    },
    setSelectedEvent() {
      this.selectedEvent = this.getSelectedEvent;
      this.isEventGone = this.isGone;
    },
    startEvent() {
      this.$store.dispatch('events/startEvent', this.id);
      this.$router.replace('/events');
    },
  },
  created() {
    this.loadDetails();
  },
};
</script>

<style scoped>
.danger{
  text-align: center;
  align-self: center;
  color: red;
  padding-right: 1rem;
}

.manager {
  display: flex;
  justify-content: space-around;
  height: 4rem;
  margin-bottom: 1rem;
}

a,button{
  width: 30%;
  height: 70%;
  padding: 0;
  align-self: center;
}
</style>

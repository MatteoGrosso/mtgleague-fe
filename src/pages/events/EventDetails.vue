<template>
  <div>
    <section>
      <base-card>
        <header>
          <h2>Dettagli Evento</h2>
          <h3>{{ name }}</h3>
          <h3>Data: {{ date }}</h3>
          <h3>Cap giocatori: {{ cap }}</h3>
          <h3>Costo iscrizione: {{ cost }}</h3>
          <h3>{{ description }}</h3>
        </header>
      </base-card>
    </section>
    <section>
      <base-card>
        <div class="manager">
            <base-button>Iscriviti</base-button>
            <base-button @click="playersList" mode="outline">{{playersButton}}</base-button>
        </div>
      </base-card>
    </section>
    <section v-if="showPlayersList">
      <base-card>
        <player-item
          v-for="player in players"
          :key="player"
          :id="player.id"
          :name="player.name"
        ></player-item>
      </base-card>
    </section>
  </div>
</template>

<script>
import PlayerItem from '@/components/players/PlayerItem.vue';

export default {
  props: ['id'],
  components: {
    PlayerItem,
  },
  data() {
    return {
      selectedEvent: null,
      players: [],
      showPlayersList: false
    };
  },
  computed: {
    name() {
      return this.selectedEvent.name;
    },
    date() {
      return this.selectedEvent.date;
    },
    cost() {
      return this.selectedEvent.cost;
    },
    cap() {
      return this.selectedEvent.cap;
    },
    description() {
      return this.selectedEvent.description;
    },
    playersButton(){
      return this.showPlayersList ? 'Nascondi partecipanti' : 'Mostra partecipanti'
    }
  },
  methods: {
    playersList(){
      this.showPlayersList=!this.showPlayersList
    }
  },
  created() {
    //lifeCycle hook di quando viene creato il componente che cerca un coach con lo stesso id passato
    this.selectedEvent = this.$store.getters['events/getEvents'].find(
      (event) => event.id === this.id
    );
    this.players = this.selectedEvent.players;
  },
};
</script>

<style scoped>
.manager {
  display: flex;
}
.manager > button {
  flex: 1; /* This will make the divs take equal width */
}
</style>
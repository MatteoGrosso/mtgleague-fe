<template>
  <base-card>
    <div class="header">
      <h1>{{ pageTitle }}</h1>
      <base-button link :mode="'animated'" :to="newEventLink">Crea Nuovo</base-button>
    </div>
    <div>
      <section>
        <header>
          <base-button :mode="programButtonMode" @click="showProgram">Programmazione</base-button>
          <base-button :mode="historyButtonMode" @click="showHistory">Storico</base-button>
        </header>
      </section>
      <section>
        <ul>
          <event-item
            v-for="event in filteredEvents"
            :key="event"
            :id="event.id"
            :name="event.name"
            :date="event.date"
          >
          </event-item>
        </ul>
      </section>
    </div>
  </base-card>
</template>

<script>
import EventItem from '@/components/events/EventItem.vue';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('events', ['getEvents']),
    pageTitle() {
      return this.pageMode === 'program'
        ? 'Eventi in programma'
        : this.pageMode === 'history'
        ? 'Storico eventi'
        : 'Eventi';
    },
    programButtonMode() {
      return this.pageMode === 'program' ? '' : 'outline';
    },
    historyButtonMode() {
      return this.pageMode === 'history' ? '' : 'outline';
    },
    newEventLink() {
      return this.$route.path + '/new';
    },
  },
  components: {
    EventItem,
  },
  data() {
    return {
      filteredEvents: [],
      pageMode: 'program',
    };
  },
  methods: {
    showProgram() {
      if (this.pageMode !== 'program') {
        this.pageMode = 'program';
        this.setFilteredEvents();
      }
    },
    showHistory() {
      if (this.pageMode !== 'history') {
        this.pageMode = 'history';
        this.setFilteredEvents();
      }
    },
    setFilteredEvents() {
      this.filteredEvents = this.getEvents;
    },
  },
  created() {
    this.setFilteredEvents();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.header{
  display: flex;
  justify-content: space-between;
}
  
</style>

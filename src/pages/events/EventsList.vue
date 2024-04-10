<template>
  <div>
    <div class="header">
      <h2>{{ pageTitle }}</h2>
      <base-button link :mode="'animated'" :to="newEventLink" v-if="isAdmin">Crea Nuovo</base-button>
    </div>
    <div>
      <section>
        <header class="header">
          <div>
            <base-button :mode="programButtonMode" @click="showProgram">Futuri</base-button>
            <base-button :mode="historyButtonMode" @click="showHistory">Passati</base-button>
          </div>
          <base-refresh @click="loadAllEvents(true)"></base-refresh>
        </header>
      </section>
      <section>
        <ul>
          <event-item
            v-for="event in filteredEvents"
            :key="event"
            :id="event.eventId"
            :name="event.name"
            :date="event.date"
            :cap="event.cap"
            :desc="event.desc"
            :players="event.players.length"
          >
          </event-item>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import EventItem from '@/components/events/EventItem.vue';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('events', ['getFutureEvents', 'getPastEvents']),
    pageTitle() {
      return this.pageMode === 'program'
        ? 'Eventi in programma'
        : this.pageMode === 'history'
        ? 'Storico eventi'
        : 'Eventi';
    },
    programButtonMode() {
      return this.pageMode === 'program' ? 'outline' : '';
    },
    historyButtonMode() {
      return this.pageMode === 'history' ? 'outline' : '';
    },
    newEventLink() {
      return this.$route.path + '/new';
    },
    isAdmin(){
      return this.$store.getters.getLoggedUserRole === 'ADMIN'
    }
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
      if (this.pageMode === 'history') {
        this.filteredEvents = this.getPastEvents;
      } else {
        this.filteredEvents = this.getFutureEvents;
      }
    },
    async loadAllEvents(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('events/loadEvents', {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.setFilteredEvents();
      this.isLoading = false;
    },
  },
  created() {
    this.loadAllEvents()
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

h2{
  white-space: nowrap;
}

.header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;
}

a{
  width: 30%;
  height: 2.5rem;
  padding: 0
}
</style>

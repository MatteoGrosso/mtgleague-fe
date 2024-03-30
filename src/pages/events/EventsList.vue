<template>
  <base-card>
    <div class="header">
      <h1>{{ pageTitle }}</h1>
      <base-button link :mode="'animated'" :to="newEventLink"
        >Crea Nuovo</base-button
      >
    </div>
    <div>
      <section>
        <header class="header">
          <div>
            <base-button :mode="programButtonMode" @click="showProgram"
              >Futuri</base-button
            >
            <base-button :mode="historyButtonMode" @click="showHistory"
              >Passati</base-button
            >
          </div>
          <button class="refresh" @click="loadAllEvents(true)">
            <svg
              class="icon"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m23.8995816 10.3992354c0 .1000066-.1004184.1000066-.1004184.2000132 0 0 0 .1000066-.1004184.1000066-.1004184.1000066-.2008369.2000132-.3012553.2000132-.1004184.1000066-.3012552.1000066-.4016736.1000066h-6.0251046c-.6025105 0-1.0041841-.4000264-1.0041841-1.00006592 0-.60003954.4016736-1.00006591 1.0041841-1.00006591h3.5146443l-2.8117154-2.60017136c-.9037657-.90005932-1.9079498-1.50009886-3.0125523-1.90012523-2.0083682-.70004614-4.2175733-.60003954-6.12552305.30001977-2.0083682.90005932-3.41422594 2.50016478-4.11715481 4.5002966-.20083682.50003295-.80334728.80005275-1.30543933.60003954-.50209205-.10000659-.80334728-.70004613-.60251046-1.20007909.90376569-2.60017136 2.71129707-4.60030318 5.12133891-5.70037568 2.41004184-1.20007909 5.12133894-1.30008569 7.63179914-.40002637 1.4058578.50003296 2.7112971 1.30008569 3.7154812 2.40015819l3.0125523 2.70017795v-3.70024386c0-.60003955.4016736-1.00006591 1.0041841-1.00006591s1.0041841.40002636 1.0041841 1.00006591v6.00039545.10000662c0 .1000066 0 .2000132-.1004184.3000197zm-3.1129707 3.7002439c-.5020921-.2000132-1.1046025.1000066-1.3054394.6000396-.4016736 1.1000725-1.0041841 2.200145-1.9079497 3.0001977-1.4058578 1.5000989-3.5146444 2.3001516-5.623431 2.3001516-2.10878662 0-4.11715482-.8000527-5.72384938-2.4001582l-2.81171548-2.6001714h3.51464435c.60251046 0 1.0041841-.4000263 1.0041841-1.0000659 0-.6000395-.40167364-1.0000659-1.0041841-1.0000659h-6.0251046c-.10041841 0-.10041841 0-.20083682 0s-.10041841 0-.20083682 0c0 0-.10041841 0-.10041841.1000066-.10041841 0-.20083682.1000066-.20083682.2000132s0 .1000066-.10041841.1000066c0 .1000066-.10041841.1000066-.10041841.2000132v.2000131.1000066 6.0003955c0 .6000395.40167364 1.0000659 1.0041841 1.0000659s1.0041841-.4000264 1.0041841-1.0000659v-3.7002439l2.91213389 2.8001846c1.80753138 2.0001318 4.31799163 3.0001977 7.02928871 3.0001977 2.7112971 0 5.2217573-1.0000659 7.1297071-2.9001911 1.0041841-1.0000659 1.9079498-2.3001516 2.4100418-3.7002439.1004185-.6000395-.2008368-1.2000791-.7029288-1.3000857z"
              />
            </svg>
          </button>
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
    ...mapGetters('events', ['getFutureEvents', 'getPastEvents']),
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
    this.loadAllEvents(true) //TODO
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.header {
  display: flex;
  justify-content: space-between;
}

.refresh {
  background: #def4d7;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  border: 0;
  border-radius: 50%;
  width: 40px;
  height: 40px;
}

@media (min-width: 69rem) {
  .refresh:hover {
    background: #587e4c;
    cursor: pointer;
  }
}
</style>

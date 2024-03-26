<template>
  <li @click="onGoToDetails">
    <base-card :class="eventClass">
      <h3>{{ name }}</h3>
      <h4>Data: {{ date }}</h4>
      <event-cap></event-cap>
    </base-card>
  </li>
</template>

<script>
import EventCap from './EventCap.vue'
export default {
  props: ['id','name', 'date'],
  components: {
    EventCap
  },
  computed: {
    eventDetailsLink() {
      return this.$route.path + '/' + this.id;
    },
    eventClass() {
      const eventDate = this.date;
      const currentDate = new Date();
      if (eventDate < currentDate) {
        return 'expired';
      } else {
        return ''; // No class added if event is in the future
      }
    },
  },
  methods: {
    onGoToDetails(){
      this.$router.push(this.eventDetailsLink);
    }
  },
};
</script>

<style scoped>
li {
  list-style: none;
  padding-top: 1rem
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}


</style>

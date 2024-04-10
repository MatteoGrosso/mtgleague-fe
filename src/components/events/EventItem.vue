<template>
  <li @click="onGoToDetails">
    <base-card :class="eventClass">
      <h3>{{ name }}</h3>
      <h4>Data: {{ date }}</h4>
      <h1>Cap: {{players}}/{{cap}}</h1>
    </base-card>
  </li>
</template>

<script>
export default {
  props: ['id','name','date','cap','desc','players'],
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
  padding-bottom: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}
@media(min-width: 41rem){
  li {
  padding-top: 0
}
}

</style>

<template>
  <section>
    <base-card>
      <h2>Crea un nuovo evento!</h2>
      <event-form @save-data="saveData"></event-form>
    </base-card>
  </section>
</template>

<script>
import EventForm from '@/components/events/EventForm.vue'
import {mapActions} from 'vuex'

export default {
  components: {
    EventForm
  },
  methods: {
    ...mapActions('events', ['addEvent']),
    saveData(formData){
      this.addEvent(formData)
      this.$router.replace('/events')
    }
  }

}
</script>

<style>

</style>
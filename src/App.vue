<template>
  <the-header></the-header>
  <main-card>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
  </main-card>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
import MainCard from './components/ui/MainCard.vue';
export default {
  components: {
    TheHeader,
    MainCard
  },
  computed: {
    didAutoLogout(){
      return this.$store.getters.didAutoLogout
    }
  },
  watch: {
    didAutoLogout(curValue, oldValue){
      if(curValue && curValue !== oldValue){
        this.$router.replace('/events')
      }
    }
  },
  created(){
    this.$store.dispatch('tryLogin')
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
  height: 100%;
}

body {
  margin: 0;
  display: grid;
  grid-template-rows: 6rem auto;
  grid-template-areas: "header"
                        "main";
  height: 100%;
  background-color: #2c3e50;
}

#app {
  grid-area: main;
}

.route-enter-from{
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to{
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active{
  transition: all 0.3s ease-out;
}

.route-leave-active{
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from{
  opacity: 1;
  transform: translateY(0);
}
</style>

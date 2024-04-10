<template>
  <nav class="mobile-nav" :class="open">
    <ul class="mobile-nav__items">
      <li>
        <base-button link v-if="isAdmin" @click="closeMobileNav" to="/events/new">Crea Evento</base-button>
      </li>
      <li>
        <base-button link to="/counter" @click="closeMobileNav">Segnapunti</base-button>
      </li>
      <li v-if="isAuthenticated">
          <base-button link to="/current" @click="closeMobileNav">Partita in corso</base-button>
        </li>
      <li>
        <base-button link to="/events" @click="closeMobileNav">Eventi</base-button>
      </li>
      <li>
        <base-button link to="/players" @click="closeMobileNav">Classifica</base-button>
      </li>
      <li v-if="!isAuthenticated">
        <base-button link to="/auth" @click="closeMobileNav">Login</base-button>
      </li>
      <li v-else>
        <base-button link class="outline" to="/events" @click="logout">Logout</base-button>
      </li>
    </ul>
  </nav>
</template>

<script>
import BaseButton from '../ui/BaseButton.vue';
export default {
  components: { BaseButton },
  emits: ['close-mobilenav'],
  props: ['isOpen'],
  computed: {
    open() {
      return this.isOpen ? 'open' : '';
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    isAdmin(){
      return this.$store.getters.getLoggedUserRole==='ADMIN';
    }
  },
  methods: {
    closeMobileNav() {
      this.$emit('close-mobilenav');
    },
    logout() {
      this.$store.dispatch('logout');
      this.closeMobileNav()
      this.$router.replace('/events');
    },
  },
};
</script>

<style scoped>
.mobile-nav {
  position: fixed;
  min-width: 300px;
  transform: translateX(-100%);
  transition: transform 0.3s ease-out;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: rgb(55, 77, 100);
  width: 100%;
  height: 100vh;
}

.mobile-nav__items {
  width: 100%;
  height: 100%;
  list-style: none;
  margin: 0% auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

li {
  padding-top: 1rem;
}

.open {
  display: block;
  opacity: 1;
  transform: translateY(0) translateX(0);
}

@media (min-width: 69rem) {
  .mobile-nav {
    display: none;
  }
  .mobile-nav__items {
    display: none;
  }
}
</style>

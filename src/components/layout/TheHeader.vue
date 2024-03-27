<template>
  <header class="main-header">
    <div class="mobile-header">
      <toggle-button @toggle-mobilenav="toggleMobileNav"></toggle-button>
      <h1>
        <router-link class="logo" to="/">LP Canavese</router-link>
      </h1>
    </div>
    <nav class="main-nav">
      <h1>
        <router-link class="logo" to="/">LP Canavese</router-link>
      </h1>
      <ul>
        <li>
          <router-link v-if="isAdmin" to="/events/new">Crea Evento</router-link>
        </li>
        <li>
          <router-link to="/counter">Segnapunti</router-link>
        </li>
        <li>
          <router-link to="/events">Eventi</router-link>
        </li>
        <li>
          <router-link to="/players">Classifica</router-link>
        </li>
        <li>
          <router-link v-if="isAuthenticated" to="/current">Partita in corso</router-link>
        </li>
        <li v-if="!isAuthenticated">
          <base-button link to="/auth">Login</base-button>
        </li>
        <li v-else>
          <base-button @click="logout">Logout</base-button>
        </li>
      </ul>
    </nav>
  </header>
  <mobile-nav :isOpen="isOpen" @close-mobilenav="closeMobileNav"></mobile-nav>
</template>

<script>
import MobileNav from './MobileNav.vue';
import ToggleButton from './ToggleButton.vue';

export default {
  components: {
    ToggleButton,
    MobileNav,
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    isAdmin(){
      //TODO
      return true
    }
  },
  data() {
    return {
      isOpen: false,
      baseFontSize: parseFloat(getComputedStyle(document.documentElement).fontSize)
    };
  },
  methods: {
    toggleMobileNav() {
      this.isOpen = !this.isOpen;
    },
    closeMobileNav() {
      this.isOpen = false;
    },
    checkViewPortForMobileNav() {
      if(window.innerWidth>this.baseFontSize){
        this.closeMobileNav()
      }
    },
    logout(){
      this.$store.dispatch('logout')
      this.$router.replace('/events')
    }
  },
  mounted() {
    window.addEventListener('resize', this.checkViewPortForMobileNav);
  },
};
</script>

<style scoped>
.main-header {
  min-width: 300px;
  display: flex;
  width: 100%;
  height: 6rem;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  background: #3d008d;
  align-items: center;
  justify-content: space-between;
  grid-area: header;
}

.mobile-header {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

header a {
  text-decoration: none;
  color: #f391e3;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #f391e3;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

header li {
  margin: 0 0.5rem;
}

.main-nav {
  display: none;
}

.logo {
  color: #fb84d0;
}

@media (min-width: 69rem) {
  .main-nav {
    display: flex;
    align-items: center;
  }

  .mobile-header {
    width: 23%;
    display: none;
  }

  header nav {
    width: 90%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>

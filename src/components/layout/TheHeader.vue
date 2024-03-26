<template>
  <header class="main-header">
    <div class="mobile-header">
      <toggle-button @open-mobilenav="openMobileNav"></toggle-button>
      <h1>
        <router-link to="/">LP Canavese</router-link>
      </h1>
    </div>
    <nav class="main-nav">
      <ul>
        <li>
          <router-link to="/counter">Segnapunti</router-link>
        </li>
        <li>
          <router-link to="/current">Partita in corso</router-link>
        </li>
        <li>
          <router-link to="/events">Eventi</router-link>
        </li>
        <li>
          <router-link to="/players">Classifica</router-link>
        </li>
        <li>
          <router-link to="/auth">Login</router-link>
        </li>
        <li>
          <base-button>Logout</base-button>
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
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    openMobileNav() {
      this.isOpen= true
    },
    closeMobileNav(){
      this.isOpen= false
    }
  }
};
</script>

<style scoped>
.main-header {
  display: flex;
  width: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background: #3d008d;
  padding: 0.5rem 1rem;
  align-items: center;
  justify-content: space-between;
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

@media (min-width: 67.5rem) {
  .main-nav {
    display: flex;
  }

  .mobile-header {
    width: 23%;
  }
}
</style>

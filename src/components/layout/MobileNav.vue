<template>
  <nav class="mobile-nav" :class="open">
    <ul class="mobile-nav__items">
        <li>
          <router-link to="/counter" @click="closeMobileNav">Segnapunti</router-link>
        </li>
        <li>
          <router-link to="/current" @click="closeMobileNav">Partita in corso</router-link>
        </li>
        <li>
          <router-link to="/events" @click="closeMobileNav">Eventi</router-link>
        </li>
        <li>
          <router-link to="/players" @click="closeMobileNav">Classifica</router-link>
        </li>
        <li>
          <router-link to="/auth" @click="closeMobileNav">Login</router-link>
        </li>
    </ul>
  </nav>
</template>

<script>
export default {
  emits: ['close-mobilenav'],
  props: ['isOpen'],
  computed: {
    open() {
      return this.isOpen ? 'open' : ''
    },
  },
  methods: {
    closeMobileNav() {
      this.$emit('close-mobilenav');
    }
  }
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
  background: #B0B5DA;
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

li{
    text-decoration: none;
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
  .mobile-nav__items{
    display: none;
  }
}
</style>

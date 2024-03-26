<template>
  <button class="toggle-button" @click="toggleMobileNav">
    <span class="toggle-button__bar"></span>
    <span class="toggle-button__bar"></span>
    <span class="toggle-button__bar"></span>
  </button>
</template>

<script>
export default {
  emits: ['toggle-mobilenav'],
  methods: {
    toggleMobileNav() {
      this.$emit('toggle-mobilenav');
    },
  },
};
</script>

<style scoped>
.toggle-button {
  width: 3rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding-top: 0;
  padding-bottom: 0;
  vertical-align: middle;
}

.toggle-button:focus {
  outline: none;
}

.toggle-button__bar {
  width: 100%;
  height: 0.2rem;
  background: black;
  display: block;
  margin: 0.6rem 0;
}

@media (min-width: 67.5rem) {
  .toggle-button {
    display: none;
  }
}
</style>

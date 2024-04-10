<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
export default {
};
</script>

<style scoped>
.card {
  border-radius: 12px;
  padding: 1rem;
  max-width: 40rem;
  color: beige;
  background-color: inherit;
}

@media(min-width: 41rem){
  .card {
    margin: 1rem auto;
  }
}
</style>

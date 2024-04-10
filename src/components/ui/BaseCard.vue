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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  max-width: 40rem;
  height: 100%;
  color: beige;
  background-color: #3E2411;
}

@media(min-width: 41rem){
  .card {
    margin: 1rem auto;
  }
}
</style>

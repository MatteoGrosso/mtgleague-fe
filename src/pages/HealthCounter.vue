<template>
  <base-card class="container">
    <div class="box">
      <p>Contenuto 1</p>
    </div>
    <div class="box">
      <p>Contenuto 2</p>
    </div>
    <div class="box">
      <p>Contenuto 3</p>
    </div>
  </base-card>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
}

.box {
  width: 30%;
  background-color: #f0f0f0;
  padding: 20px;
  margin: 10px;
}

@media screen and (max-width: 600px) {
  .container {
    transform: rotate(90deg);
    width: 100vh;
    height: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    flex-direction: row-reverse;
  }

  .box {
    margin: 10px 0;
  }
}
</style>

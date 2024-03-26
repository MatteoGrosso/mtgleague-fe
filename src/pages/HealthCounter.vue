<template>
  <div class="container">
    <div class="counter">
      <div class="overlay-down p1" @click="loseHealth('p1')"><div>-</div></div>
      <div class="overlay p1" @click="gainHealth('p1')"><div>+</div></div>
      <div class="circle">{{p1}}</div>
    </div>
    <div class="reset" @click="reset">
      <img src="../assets/reset.svg" alt="reset">
    </div>
    <div class="counter">
      <div class="overlay p2" @click="loseHealth('p2')"><div>-</div></div>
      <div class="overlay-down p2" @click="gainHealth('p2')"><div>+</div></div>
      <div class="circle">{{p2}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      p1: 20,
      p2: 20
    }
  },
  methods: {
    gainHealth(player){
      player==='p1' ? this.p1++ : this.p2++
    },
    loseHealth(player){
      player==='p1' ? this.p1-- : this.p2--
    },
    reset(){
    this.p1= 20,
    this.p2= 20
  }
  },
};
</script>

<style scoped>
.container {
  min-width: 300px;
  display: flex;
  flex-direction: column;
  height: calc(100% - 4rem);
  width: 100%;
  position: fixed;
  top: 4rem;
  left: 0;
  width: 100%;
  justify-content: space-between;
}

.counter {
  position: relative;
  height: 45%;
  border: 1px solid black;
  font-size: 2rem;
}

.reset {
  position: relative;
  height: 10%;
  font-size: 3rem;
  border-radius: 50%;
  width: 11%;
  height: 7%;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
}

img {
  height: 50%;
  width: 100%;
}

.overlay {
  position: absolute;
  width: 50%;
  height: 100%;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay-down {
  position: absolute;
  width: 50%;
  height: 100%;
  left: 50%;
  border-left: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay-down.p1, .overlay.p2 {
  background-color: rgba(132, 16, 16, 0.5);
}
.overlay.p1, .overlay-down.p2 {
  background-color: rgba(18, 110, 12, 0.5);
}

.circle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20%;
  height: 25%;
  border-radius: 50%;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  background-color: white;
  transform: translate(-50%, -50%); /* Centering trick */
}

.health.p1{
  transform: rotateX(-180deg);
}

.overlay, .overlay-down, .circle, img {
  user-select: none;
}


@media (min-width: 69rem) {
  .container {
  flex-direction: row;
}

.counter {
  width: 45%;
  height: 100%;
}

.reset {
  width: 10%;
  height: 100%;
  border: 1px solid black;
}

.overlay {
  width: 100%;
  height: 50%;
  bottom: 0;
  left: 0;
}

.overlay-down {
  width: 100%;
  border-bottom: 1px solid black;
  border-left: none;
  top: 0;
  left: 0;
  height: 50%;
}

.circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Centering trick */
  width: 20%;
  height: 16%;
  border-radius: 50%; /* Makes it a circle */
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  background-color: white;
}

.reset {
  position: relative;
  height: 10%;
  border-radius: 50%;
  width: 7%;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
}

img {
  height: 50%;
  width: 100%;
}

}
</style>

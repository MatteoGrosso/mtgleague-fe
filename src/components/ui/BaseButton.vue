<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    //sta volta uso l'oggetto per cambiare
    //qui intendo unificare i router-link (che sarebbero dei <a>) che ho in giro nel progetto per fargli avere lo stesso styling dei buttons e vice versa
    //uso mode per usare classi css dinamiche (tra flat e outline)
    mode: {
        type: String,
        required: false,
        default: null
    },
    link: {
        type: Boolean,
        required: false,
        default: false
    },
    to: {
        type: String,
        required: false,
        default: '/'
    }
  },
};
</script>

<style scoped>
a,button {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  display: inline-block;
  text-align: center;
  align-content: center;
  vertical-align: center;
}

a{
  background-color: rgb(57, 2, 34);
  border: 1px solid rgb(57, 2, 34);
}

button {
  background-color: #3E2411;
  border: 1px solid #3E2411;
}

.flat {
  background-color: transparent;
  color: #6f0000;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: beige;
  color: beige;
}

.danger{
  background-color: transparent;
  border-color: rgb(235, 90, 90);
  color: rgb(235, 90, 90);
}

.animated {
    color: white;
    align-self: center;
  }

.animated-highlight{
  background-color: rgb(57, 2, 34);
  border: 1px solid rgb(57, 2, 34);
  color: white;
  align-self: center;
}
  
  .animated:hover,
  .animated:focus,
  .animated-highlight:hover,
  .animated-highlight:focus{
    transition-timing-function: cubic-bezier(0.6, 4, 0.3, 0.8);
    animation: gelatine 0.5s 1;
    background: #f391e3;
  }
  
  @keyframes gelatine {
    0%,
    100% {
      transform: scale(1, 1);
    }
    25% {
      transform: scale(0.9, 1.1);
    }
    50% {
      transform: scale(1.1, 0.9);
    }
    75% {
      transform: scale(0.95, 1.05);
    }
  }
</style>

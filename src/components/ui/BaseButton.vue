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
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #270041;
  border-color: #270041;
}

.flat {
  background-color: transparent;
  color: #3a0061;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #270041;
  color: #270041;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #edd2ff;
}

.animated {
    color: white;
    background: #1463f5;
    align-self: center;
    border: none;
  }
  
  .animated:hover,
  .animated:focus{
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

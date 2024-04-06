<template>
    <div class="container" v-if="this.currentRound">
      <div class="players">
        <div class="player">
          <base-card class="points">{{ p1wins }}</base-card>
          <h4>{{nameP1}} {{lastnameP1}}</h4>
          <div class="overlay" @click="addWinP1">+</div>
          <div class="overlay-bottom" @click="removeWinP1">-</div>
        </div>
        <div class="player">
          <base-card class="points">{{ p2wins }}</base-card>
          <h4>{{nameP2}} {{lastnameP2}}</h4>
          <div class="overlay" @click="addWinP2">+</div>
          <div class="overlay-bottom" @click="removeWinP2">-</div>
        </div>
      </div>
      <div class="send">
        <base-button class="btn-send" @click="sendScore">Invia Punteggio</base-button>
      </div>
    </div>
    <div v-else>
      <base-card>Al momento non hai match da giocare, riprova più tardi..</base-card>
    </div>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton.vue';
import { mapGetters } from 'vuex';
export default {
  components: { BaseButton },
  data() {
    return {
      p1wins: 0,
      p2wins: 0,
      currentRound: null
    };
  },
  created(){
    this.loadCurrentRound()
  },
  computed: {
    ...mapGetters('events', ['getCurrentRound']),
    nameP1(){
      return this.currentRound ? this.currentRound.nameP1 : ""
    },
    nameP2(){
      return this.currentRound ? this.currentRound.nameP2 : ""
    },
    lastnameP1(){
      return this.currentRound ? this.currentRound.surnameP1 : ""
    },
    lastnameP2(){
      return this.currentRound ? this.currentRound.surnameP2 : ""
    }
  },
  methods: {
    async sendScore() {
      const actionPayload = {
        roundId: this.currentRound.id,
        p1Wins: this.p1wins,
        p2Wins: this.p2wins,
      };
      try {
        await this.$store.dispatch('events/confirmScore', {
          round: actionPayload,
        });
      } catch (err) {
        this.error = err.message || 'Failed to authenticate, try later..';
      }
      this.$router.replace('/events')
    },
    async loadCurrentRound(){
      try {
        await this.$store.dispatch('events/findCurrentRound');
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.setCurrentRound()
    },
    setCurrentRound(){
      this.currentRound= this.getCurrentRound
    },
    addWinP1(){
      if(this.p1wins<2 && (this.p1wins+this.p2wins<3)){
        this.p1wins++;
      }
    },
    addWinP2(){
      if(this.p2wins<2 && (this.p1wins+this.p2wins<3)){
        this.p2wins++;
      }
    },
    removeWinP1(){
      if(this.p1wins>0){
        this.p1wins--;
      }
    },
    removeWinP2(){
      if(this.p2wins>0){
        this.p2wins--;
      }
    }
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.players {
  display: flex;
  justify-content: space-around;
  position: relative;
  top: 6%;
  width: 100%;
  height: 100%;
}
.player {
  width: 40%;
  height: 100%;
  position: relative;
  font-size: 1.4rem;
}
.points {
  width: 100%;
  height: 80%;
  font-size: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
}
h4 {
  text-align: center;
}
.send {
  width: 100%;
  height: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-send {
  align-self: center;
}
.overlay,
.overlay-bottom {
  position: absolute;
  left: 0;
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: center;
}
.overlay{
  top: 0;
  font-size: 1.5rem;
  align-items: flex-start;
}
.overlay-bottom{
  top: 40%;
  font-size: 2rem;
  align-items: flex-end;
}

@media(min-width: 41rem){
  .overlay,
  .overlay-bottom{
    margin: 1rem auto;
  }
  .overlay{
    font-size: 4rem;
  }
  .overlay-bottom{
    font-size: 6rem;
  }
}

</style>

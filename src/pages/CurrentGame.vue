<template>
    <div class="container" v-if="roundLoaded">
      <div class="players">
        <div class="player">
          <base-card class="points">{{ p1Wins }}</base-card>
          <h4>{{nameP1}} {{lastnameP1}}</h4>
          <div class="overlay" @click="addWinP1" v-if="!ended">+</div>
          <div class="overlay-bottom" @click="removeWinP1" v-if="!ended">-</div>
        </div>
        <div class="player">
          <base-card class="points">{{ p2Wins }}</base-card>
          <h4>{{nameP2}} {{lastnameP2}}</h4>
          <div class="overlay" @click="addWinP2" v-if="!ended">+</div>
          <div class="overlay-bottom" @click="removeWinP2" v-if="!ended">-</div>
        </div>
      </div>
      <div class="send">
        <base-button class="btn-send" @click="sendScore" v-if="!ended">Invia Punteggio</base-button>
        <h3 v-else-if="isBye && ended && isEventEnded">Ti è stato assegnato il bye!</h3>
        <h3 v-else-if="ended && isEventEnded">Turni terminati!</h3>
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
      currentRound: null,
      p1Wins: 0,
      p2Wins: 0,
    };
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
    },
    roundLoaded(){
      return this.currentRound ? true : false
    },
    ended(){
      return this.currentRound ? this.currentRound.ended : true
    },
    isBye(){
      return this.currentRound ? this.currentRound.bye : false
    },
    isEventEnded(){
      console.log(this.currentRound)
      return this.currentRound ? this.currentRound.eventEnded : false
    }
  },
  methods: {
    async sendScore() {
      const actionPayload = {
        roundId: this.currentRound.id,
        p1Wins: this.p1Wins,
        p2Wins: this.p2Wins,
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
      this.p1Wins= this.currentRound ? this.currentRound.p1Wins : 0
      this.p2Wins= this.currentRound ? this.currentRound.p2Wins : 0
    },
    addWinP1(){
      if(this.p1Wins<2 && (this.p1Wins+this.p2Wins<3)){
        this.p1Wins++;
      }
    },
    addWinP2(){
      if(this.p2Wins<2 && (this.p1Wins+this.p2Wins<3)){
        this.p2Wins++;
      }
    },
    removeWinP1(){
      if(this.p1Wins>0){
        this.p1Wins--;
      }
    },
    removeWinP2(){
      if(this.p2Wins>0){
        this.p2Wins--;
      }
    }
  },
  created(){
    this.loadCurrentRound()
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

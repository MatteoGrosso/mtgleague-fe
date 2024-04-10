<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{invalid: !name.isValid}">
      <label>Nome evento</label>
      <input type="text" id="name" v-model.trim="name.val" @blur="clearValidity('name')" />
      <p v-if="!name.isValid">Inserisci il nome dell'evento!</p>
    </div>
    <div class="form-control" :class="{invalid: !date.isValid}">
      <label>Data</label>
      <input type="date" id="date" :min="minDate" v-model.trim="date.val" @blur="clearValidity('date')" />
      <p v-if="!date.isValid">Devi selezionare una data!</p>
    </div>
    <div class="form-control" :class="{invalid: !cap.isValid}">
      <label>Cap giocatori</label>
      <input type="number" id="cap" v-model.number="cap.val" @blur="clearValidity('cap')" />
      <p v-if="!cap.isValid">Il cap deve essere maggiore di 0!</p>
    </div>
    <div class="form-control" :class="{invalid: !description.isValid}">
      <label>Description</label>
      <textarea id="description" rows="5" v-model.trim="description.val" @blur="clearValidity('description')" />
      <p v-if="!description.isValid">Inserisci una descrizione!</p>
    </div>
    <p v-if="!formIsValid">Riprova dopo aver corretto il form.</p>
    <base-button>Crea</base-button>
  </form>
</template>

<script>
export default {
  emits: ['save-data'],
  computed: {
    minDate(){
      const today = new Date();
      const formattedToday = today.toISOString().split('T')[0];
      return formattedToday;
    }
  },
  data() {
    return {
      //using objects as so i can use a better validation approach
      name: {
        type: String,
        val: '',
        isValid: true
      },
      date: {
        type: Date,
        val: '',
        isValid: true
      },
      cap: {
        type: Number,
        val: null,
        isValid: true
      },
      description: {
        type: String,
        val: '',
        isValid: true
      },
      formIsValid: true
    };
  },
  methods: {
    clearValidity(input) {
      //checking dynamically if the input is valid based on the given input type i defined in the data section
      //i do this becouse i don't like that when the user, after getting a validity error on the cap(number) can set it to a negative or to 0 and gets the error removed until he submits again. Instead i want an instant feedback
      if (
        (this[input].type === String && this[input].val !== '') ||
        (this[input].type === Number && this[input].val > 0) ||
        (this[input].type === Date && this[input].val !== '')
      )
        this[input].isValid = true;
      else this[input].isValid = false;

      this.validateForm()
    },
    validateForm() {
      //reset form every time i submit and then recheck if it is valid or not
      this.formIsValid= true

      if(this.name.val===''){
        this.name.isValid= false
        this.formIsValid= false
      }
      if(this.date.val===''){
        this.date.isValid= false
        this.formIsValid= false
      }
      if(!this.cap.val || this.cap.val <0){
        this.cap.isValid= false
        this.formIsValid= false
      }
      if(this.description.val===''){
        this.description.isValid= false
        this.formIsValid= false
      }
    },
    submitForm() {
      this.validateForm();

      if(!this.formIsValid){
        return
      }

      const formData = {
        name: this.name.val,
        date: this.date.val,
        cap: this.cap.val,
        desc: this.description.val,
      };

      this.$emit('save-data', formData);
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>

<template>
  <div>
    <base-dialog :show="!!error" title="An error occured" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating" fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
    <div
      class="form-control"
      :class="{ invalid: !name.isValid }"
      v-if="getMode === 'signup'"
    >
      <label>Nome</label>
      <input
        type="text"
        id="name"
        v-model.trim="name.val"
        @blur="clearValidity('name')"
      />
      <p v-if="!name.isValid">Il nome è obbligatorio!</p>
    </div>
    <div
      class="form-control"
      :class="{ invalid: !lastName.isValid }"
      v-if="getMode === 'signup'"
    >
      <label>Cognome</label>
      <input
        type="text"
        id="lastName"
        v-model.trim="lastName.val"
        @blur="clearValidity('lastName')"
      />
      <p v-if="!lastName.isValid">Il cognome è obbligatorio!</p>
    </div>
    <div class="form-control" :class="{ invalid: !email.isValid }">
      <label>Email</label>
      <input
        type="email"
        id="email"
        v-model.trim="email.val"
        @blur="clearValidity('email')"
      />
      <p v-if="!email.isValid">Inserisci una mail valida!</p>
    </div>
    <div class="form-control" :class="{ invalid: !password.isValid }">
      <label>Password</label>
      <input
        type="password"
        id="password"
        v-model.trim="password.val"
        @blur="clearValidity('password')"
      />
      <p v-if="!password.isValid">Password almeno di 6 caratteri!</p>
    </div>
    <p v-if="!formIsValid">Correggi per proseguire.."</p>
    <base-button>{{ submitButtonCaption }}</base-button>
    <base-button type="button" mode="flat" @click="switchAuthMode">
      {{ switchModeButtonCaption }}
    </base-button>
  </form>
    </base-card>
  </div>
</template>

<script>

export default {
  data() {
    return {
      error: null,
      isLoading: false,
      mode: 'login',
      name: {
        type: String,
        val: '',
        isValid: true,
      },
      lastName: {
        type: String,
        val: '',
        isValid: true,
      },
      email: {
        type: String,
        val: '',
        isValid: true,
      },
      password: {
        type: String,
        val: '',
        isValid: true,
      },
      formIsValid: true,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === 'login') {
        return 'Login';
      } else {
        return 'Signup';
      }
    },
    switchModeButtonCaption() {
      if (this.mode === 'login') {
        return 'Signup instead';
      } else {
        return 'Login instead';
      }
    },
    getMode() {
      return this.mode;
    },
  },
  methods: {
    clearValidity(input) {
      if (this[input].type === String && this[input].val !== '') {
        if (
          input === 'email' &&
          this[input].val &&
          !this[input].val.includes('@')
        ) {
          this[input].isValid = false;
        } else {
          this[input].isValid = true;
        }
      } else this[input].isValid = false;

      this.validateForm();
    },
    resetForm() {
        this.name.val = '', this.name.isValid = true,
        this.lastName.val = '', this.lastName.isValid = true,
        this.email.val = '', this.email.isValid = true,
        this.password.val = '', this.password.isValid = true,
        this.formIsValid = true;
    },
    validateForm() {
      this.formIsValid = true;

      if (this.mode==='signup' && this.name.val === '') {
        this.name.isValid = false;
        this.formIsValid = false;
      }
      if (this.mode==='signup' && this.lastName.val === '') {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }
      if (this.email.val === ''|| !this.email.val.includes('@')) {
        this.email.isValid = false;
        this.formIsValid = false;
      }
      if (this.password.val === ''|| this.password.length < 6) {
        this.password.isValid = false;
        this.formIsValid = false;
      }
    },
    async submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      this.isLoading = true;

      const actionPayload = {
        name: this.name.val,
        lastName: this.lastName.val,
        email: this.email.val,
        password: this.password.val,
      };
      const redirectUrl = '/' + (this.$route.query.redirect || 'events');
      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('login', actionPayload);
        } else {
          await this.$store.dispatch('signup', actionPayload);
        }
        this.$router.replace(redirectUrl); //replace non fa tornare indietro
      } catch (err) {
        this.error = err.message || 'Failed to authenticate, try later..';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
    switchAuthMode() {
      this.resetForm();
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
  background-color: #2c3e50;
}

input:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input {
  border: 1px solid red;
}
</style>

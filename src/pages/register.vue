<template>
  <form @submit.prevent="handleSubmit" method="post" class="form">
    <div>
      <h1 class="title is-1 mb-5 has-text-centered">Inscription</h1>
    </div>

    <b-field label="nom" message="This nom is available" label-position="on-border">
      <b-input maxlength="30" v-model="nom"></b-input>
    </b-field>

    <b-field label="prenom" message="This prenom is available" label-position="on-border">
      <b-input maxlength="30" v-model="prenom"></b-input>
    </b-field>

    <b-field label="email" message="This email is available" label-position="on-border">
      <b-input maxlength="30" v-model="email"></b-input>
    </b-field>

    <b-field label="Password" label-position="on-border" message="Minimum password length is 8" >
      <b-input type="password" v-model="password" password-reveal> </b-input>
    </b-field>

    <b-button class="btn" native-type="submit" type="is-primary"
      >Envoyer</b-button
    >
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "Register",
  data() {
    return {
      email: "joe@gmail.com",
      password: "12345678",
      nom: "test",
      prenom: "lol",
      error: [],
    };
  },
  methods: {
    async handleSubmit() {
      const response = await axios.post("kine/register", {
        email: this.email,
        password: this.password,
        nom: this.nom,
        prenom: this.prenom,
      });
      if (response.data.success) {
        this.$router.push("/login");
      }
      else{
        this.danger()
      }
    },
    danger() {
      return this.$buefy.toast.open({
        duration: 5000,
        message: `<b>this address is already taken or the informations are wrong </b>`,
        position: "is-bottom",
        type: "is-danger",
      });
    },
  },
};
</script>

<style scoped>

.form {
  margin: 0 10% 0 10%;
  text-align: start;
}
.btn {
  margin-top: 2%;
}
</style>

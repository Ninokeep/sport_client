<template>
  <form @submit.prevent="handleSubmit" method="post" class="form container-form">
    <div>
      <h1 class="title is-1 mb-5 mt-5 has-text-centered">
        Création d'un patient
      </h1>
    </div>

    <b-field label="nom" label-position="on-border">
      <b-input maxlength="30" v-model="nom" required></b-input>
    </b-field>

    <b-field label="prenom" label-position="on-border">
      <b-input maxlength="30" v-model="prenom" required></b-input>
    </b-field>
    <b-field label="email" label-position="on-border">
      <b-input maxlength="30" v-model="email" type="email" required></b-input>
    </b-field>

    <b-field label="age" label-position="on-border">
      <b-numberinput v-model="age" min="1" max="100" required></b-numberinput>
    </b-field>

    <b-field label="sexe" label-position="on-border">
      <b-input maxlength="30" v-model="sexe" required></b-input>
    </b-field>

    <b-field label="pathologie" label-position="on-border">
      <b-input maxlength="30" v-model="pathologie" required></b-input>
    </b-field>

    <b-field label="séance restante" label-position="on-border">
      <b-numberinput
        v-model="seance_restante"
        min="1"
        max="100"
        required
      ></b-numberinput>
    </b-field>

    <b-field label="Password" label-position="on-border">
      <b-input type="password" v-model="password" password-reveal required>
      </b-input>
    </b-field>
    <b-button
      class="btn has-text-centered"
      native-type="submit"
      type="is-primary "
      >Envoyer</b-button
    >
  </form>
</template>

<script>
import axios from 'axios'
export default {
  name: "CreatePatient",
  data() {
    return {
      age: 20,
      nom: "cavallaro",
      prenom: "maria",
      pathologie: "tendinite",
      seance_restante: 15,
      email: "maria@gmail.com",
      password: "12345678",
      sexe: false,
    };
  },
  methods: {
    async handleSubmit() {
      axios.post('kine/create-patient',{
         age: this.age,
      nom: this.nom,
      prenom: this.prenom,
      pathologie: this.pathologie,
      seance_restante: this.seance_restante,
      email: this.email,
      password: this.password,
      sexe: this.sexe,
      }, { headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}` 
      }}).then(
        rep =>{
          if(rep){
            this.successSubmit()
          }
        }
      )
      .catch(e => {
        if(e){
          this.errorSubmit()
        }
      })
   
    },

    errorSubmit() {
      return this.$buefy.toast.open({
        duration: 5000,
        message: `<b>Mauvais mot de passe ou email</b>`,
        position: "is-bottom",
        type: "is-danger",
      });
    },
    successSubmit() {
        return this.$buefy.toast.open({
        duration: 5000,
        message: `<b>Patient créé !</b>`,
        position: "is-bottom",
        type: "is-success",
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
</style>
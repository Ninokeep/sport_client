<template>
  <form @submit.prevent="handleSubmit" method="post" class="form">
    <div>
      <h1 class="title is-1 mb-5 has-text-centered">Connexion</h1>
    </div>
    <b-field label="email" label-position="on-border"   >
      <b-input maxlength="30" v-model="email"></b-input>
    </b-field>

    <b-field label="Password" label-position="on-border" >
      <b-input type="password" v-model="password" password-reveal> </b-input>
    </b-field>
    <b-button class="btn" native-type="submit" type="is-primary"
    
      >Envoyer</b-button>  
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      email: "joe@gmail.com",
      password: "12345678",
      error: [],
    };
  },
  methods: {
    async handleSubmit() {
      const response = await axios.post("kine/login", {
        email: this.email,
        password: this.password,
      });
      console.log(response.data.success)
      if(response.data.success){
        console.log("je me connecte")
        localStorage.setItem('token', response.data.response[0].jwt)
        this.$store.dispatch('user', response.data.response[0]);
        this.$store.dispatch('users')
        this.$router.push('/')
      }
      else{
        this.danger()
      }

    },

    //methode pour afficher l'erreur du mdp ou login
    danger(){
      return this.$buefy.toast.open({
                    duration: 5000,
                    message: `<b>Wrong password or email </b>`,
                    position: 'is-bottom',
                    type: 'is-danger'
                })
    }

  },
};
</script>

<style scoped>
.form {
  margin: 10%;
}
.btn {
  margin-top: 2%;
}
</style>

<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Utilisateur</p>
    </header>
    <section class="modal-card-body">
      <form>
        <b-field label="Nom" label-position="on-border">
          <b-input v-model="nomUser" required></b-input>
        </b-field>

        <b-field label="Prenom" label-position="on-border">
          <b-input v-model="prenomUser" required></b-input>
        </b-field>

        <b-field
          label="Email"
          label-position="on-border"
          message="Exemple : toto@gmail.com "
        >
          <b-input type="email" v-model="emailUser" maxlength="30" required>
          </b-input>
        </b-field>

        <b-field label="Age" label-position="on-border">
          <b-input v-model="ageUser" required></b-input>
        </b-field>

        <b-field label="Mot de passe" label-position="on-border">
          <b-input v-model="passwordUser" type="password" required></b-input>
          <template #message>
            <div>Password is too short</div>
            <div>Password must have at least 8 characters</div>
          </template>
        </b-field>

        <b-field label="Séance restante" label-position="on-border">
          <b-input
            v-model="seance_restanteUser"
            type="number"
            required
          ></b-input>
        </b-field>

        <b-field label="Pathologie" label-position="on-border">
          <b-input v-model="pathologieUser" type="text" required></b-input>
        </b-field>

        <b-field label="Sexe" label-position="on-border">
          <b-select
            placeholder="Selectionner un sexe"
            required
            v-model="sexeUser"
          >
            <option value="0">Homme</option>
            <option value="1">Femme</option>
          </b-select>
        </b-field>

        <b-button class="btn" type="is-primary" @click="handleClick"
          >Envoyer</b-button
        >
      </form>
    </section>

    <footer class="modal-card-foot">
      <b-button label="Close" @click="$parent.close()" />
    </footer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: [
    "nom",
    "prenom",
    "email",
    "seance_restante",
    "sexe",
    "age",
    "pathologie",
    "password",

    "id",
  ],

  name: "ModalForm",
  mounted() {
    console.log(this.$props);
  },
  data() {
    return {
      nomUser: this.nom,
      prenomUser: this.prenom,
      emailUser: this.email,
      seance_restanteUser: this.seance_restante,
      sexeUser: this.sexe,
      ageUser: this.age,
      pathologieUser: this.pathologie,
      passwordUser: this.password,
      idUser: this.id,
    };
  },
  methods: {
    async handleClick() {
      console.log(this.nomUser);

      const response = await axios.post(
        "kine/update-patient",
        {
          id_patient: this.idUser,
          nom: this.nomUser,
          prenom: this.prenomUser,
          email: this.emailUser,
          seance_restante: this.seance_restanteUser,
          sexe: this.sexeUser,
          age: this.ageUser,
          pathologie: this.pathologieUser,
          password: this.passwordUser,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if(response.data.success){
        this.$router.go()
      }
      else{
        this.errorSubmit();
      }
      
      
     
    },
    errorSubmit() {
      this.$buefy.snackbar.open({
        duration: 5000,
        message:
          "Un des champs n'est pas bon, veuillez bien respecter les champs ! ",
        type: "is-danger",
        position: "is-bottom-left",
        actionText: "Ok",
        queue: false,
      });
    },
  },
};
</script>

<style>
</style>
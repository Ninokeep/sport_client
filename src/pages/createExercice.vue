<template>
  <div class="card mx-4 my-4 hero is-halfheight">
    <div class="card-content">
      <p class="card-header-title">Création d'un entraînement</p>
      <!--  -->
      <form  @submit.prevent="onSubmit" method="POST" class="has-text-left">
        <b-field label=" Email Patient" label-position="on-border">
          <b-select
            placeholder="Sélectionne un patient"
            required
            v-model="id_user"

          >
            <option
              :value="item.id"
              v-for="item in this.$store.getters.users"
              :key="item.id"
              
            >
              {{ item.email }}
            </option>
          </b-select>
        </b-field>


      
        <b-field
          label="Entrainement"
          label-position="on-border"
          class="has-text-left"
        >
          <b-select
            placeholder="Sélectionne un Entrainement"
            required
            v-model="id_entrainement"
          >
            <option  :value="item.id"
              v-for="item in this.$store.getters.entrainements"
              :key="item.id"  >{{item.nom}} {{item.niveau}} </option>

          </b-select>
        </b-field>



        
        <b-field
          label="Côté"
          label-position="on-border"
          class="has-text-left"
        >
          <b-select
            placeholder="Sélectionne un côté pour le membre du corps"
            required
            v-model="cote_membre"
          >
            <option  value="droit" >droit </option>
            <option value="gauche">gauche</option>

          </b-select>
        </b-field>

        <b-field label="Nombre de répétition">
          <b-numberinput v-model="nombre_repetition" min="0" max="100"></b-numberinput>
        </b-field>


          <b-field label="Message"
            label-position="on-border">
            <b-input maxlength="200" type="textarea" v-model="commentaire_kine"></b-input>
        </b-field>

        <b-button class="btn is-primary" native-type="submit">envoyer</b-button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CreerExercice",
  mounted() {
     this.getAllPatient()
  },
  data() {
    return {
      email: "",
      nom: "",
      niveau: "",
      partie_corps: "",
      id_entrainement: 1,
      id_user : null,
      commentaire_kine: '',
      error: false,
      nombre_repetition: 0,
      cote_membre: null
    };
  },
  methods: {
      
    getAllPatient:function(){
        this.$store.dispatch('entrainements');
    },
    handleChange : function(event){
      console.log(event)
    },
    async onSubmit() {
      const res = await axios.post(
        "kine/give-entrainement-user",
        {
          id_user: this.id_user,
          id_entrainement : this.id_entrainement,
          nom: this.nom,
          niveau: this.niveau,
          meta_value: this.nombre_repetition,
          commentaire_kine : this.commentaire_kine
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res)
      if (res.data.success) {
        this.successSubmit();
      } else {
        this.errorSubmit();
      }
    },

    successSubmit() {
      return this.$buefy.toast.open({
        duration: 2000,
        message: `<b>Entraînement créé !</b>`,
        position: "is-bottom",
        type: "is-success",
      });
    },
    errorSubmit() {
      return this.$buefy.toast.open({
        duration: 2000,
        message: `<b>Un des champs est manquant ou mal complété  </b>`,
        position: "is-bottom",
        type: "is-danger",
      });
    },
  },
};
</script>

<style>
</style>
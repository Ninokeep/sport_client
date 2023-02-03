<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Modification d'une session d'entraînement</p>
    </header>
    <section class="modal-card-body">
      <form>
        <!-- <b-field label="message utilisateur" label-position="on-border">
          <b-input v-model="messageUser"  required></b-input>
        </b-field> -->

        <b-field
          label="commentaire du kinésithérapeute"
          label-position="on-border"
        >
          <b-input v-model="commentaireKine" required></b-input>
        </b-field>

        <b-field label="repetition réalisé" label-position="on-border">
          <b-input v-model="repetitionFait" required></b-input>
        </b-field>

        <b-field label="repetition à faire" label-position="on-border">
          <b-input v-model="metaValue" required></b-input>
        </b-field>

        <b-field label="exercice terminé" label-position="on-border">
          <b-select
            placeholder="Sélectionne un choix"
            required
            v-model="finiSession"
          >
            <option value="0">non</option>
            <option value="1">oui</option>
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
    "id_user",
    "id_session",
    "repetition_fait",
    "meta_value",
    "commentaire_kine",
    "fini",
  ],

  name: "ModalFormSession",
  mounted() {
    console.log(this.$props);
    
  },
  data() {
    return {
      idUser: this.id_user, 
      idSession: this.id_session,
      metaValue: this.meta_value,
      repetitionFait: this.repetition_fait,
      finiSession: this.fini,
      commentaireKine: this.commentaire_kine,
      
    }
  },
  methods: {
  
    async handleClick() {
      console.log(this.repetitionFait);

      const response = await axios.put(
        "kine/update-session-user",
        {	
          id_user: this.idUser,
          id_session: this.idSession,
          meta_value: this.metaValue,
          repetition_fait: this.repetitionFait,
          commentaire_kine: this.commentaireKine,
          fini : this.finiSession
    
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data) {
        this.$router.go();
      } else {
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
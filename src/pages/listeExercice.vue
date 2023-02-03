<template>
  <div class="card mx-4 my-4 hero is-halfheight">
    <div class="card-content">
      <p class="card-header-title">Liste des entraînements</p>
      <form @change="onSubmit" class="has-text-left">
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
      </form>

      <b-table :data="data" focusable sticky-header striped>
        <b-table-column
          field="pathologie"
          label="pathologie"
          width="200"
          sortable
          numeric
          v-slot="props"
        >
          {{ props.row.pathologie }}
        </b-table-column>

        <b-table-column
          field="niveau"
          label="niveau"
          width="40"
          sortable
          centered
          v-slot="props"
        >
          {{ props.row.niveau }}
        </b-table-column>
        <b-table-column
          field="commentaire kiné"
          label="commentaire kiné"
          width="40"
          sortable
          centered
          v-slot="props"
        >
          {{ props.row.commentaire_kine }}
        </b-table-column>
        <b-table-column
          field="nombre de répétition à faire"
          label="nombre de répétition à faire"
          width="40"
          sortable
          centered
          v-slot="props"
        >
          {{ props.row.meta_value }}
        </b-table-column>

        <b-table-column
          field="répétition réalisée(s)"
          label="répétition réalisée(s)"
          width="40"
          numeric
          sortable
          centered
          v-slot="props"
        >
          {{ props.row.repetition_fait }}
        </b-table-column>
        <b-table-column
          field="terminé"
          label="terminé"
          width="40"
          numeric
          sortable
          centered
          v-slot="props"
        >
          {{ props.row.fini ? "oui" : "non" }}
        </b-table-column>

        <b-table-column
          field="commentaire patient"
          label="commentaire patient"
          width="40"
          numeric
          sortable
          centered
          v-slot="props"
        >
          {{
            props.row.message_user ? props.row.message_user : "pas de message"
          }}
        </b-table-column>

        <b-table-column
          field="action"
          label="ACTION"
          width="40"
          numeric
          sortable
          centered
          v-slot="props"
        >
          <b-button class="is-info" @click="changeUser(props.row)" 
            >MODIFIER</b-button
          >
        </b-table-column>

        <b-table-column
          field="action"
          label="ACTION"
          width="40"
          numeric
          sortable
          centered
          v-slot="props"
        >
          <b-button
            class="is-danger"
            @click="handleDeleteEntrainement(props.row)"
            >SUPPRIMER</b-button
          >
        </b-table-column>
      </b-table>
    </div>
    <section>
      <b-modal
        v-model="isComponentModalActive"
        has-modal-card
        full-screen
        :can-cancel="false"
      >
        <modal-form-session v-bind="formProps"></modal-form-session>
      </b-modal>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import ModalFormSession from "../components/modalFormSession.vue";

export default {
  name: "ListeExercice",
  components : {
    ModalFormSession
  },
  mounted() {
    this.$nextTick(function () {
      
    });
  },
  data() {
    const data = [
      {
        id_user: null,
        nom: null,
        prenom: null,
        age: null,
        email: null,
        password: null,
        sexe: null,
        seance_restante: null,
        pathologie: null,
        id_session: null,
      },
    ];
    return {
      data,
      id_user: "",
      id_session: "",
      nom: "",
      niveau: "",
      commentaire: "",
      error: false,
      isComponentModalActive: false,
      formProps: ''
    };
  },
  methods: {
    changeUser(id) {
      this.isComponentModalActive = true;
      this.formProps = id;
    },
    async onSubmit() {
      const res = await axios.post(
        "kine/get-entrainement-user",
        { id_user: this.id_user },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("les réponses de data --------------")
      console.log(res.data.response);
      this.data = res.data.response;
    },
    async handleDeleteEntrainement(element) {
      const { id_user, id_session } = element;
      axios
        .post(
          "kine/delete-entrainement-user",
          { id_user: id_user, id_session: id_session },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          this.onSubmit();
          return this.$buefy.toast.open({
            duration: 2000,
            message: `<b>Entrainement de l'utilisateur bien supprimé !</b>`,
            position: "is-bottom",
            type: "is-success",
          });
        })
        .catch((err) => {
          console.log(err);
        });
      //     console.log(element.id_session)
      //       const res = await axios.delete('kine/delete-entrainement-user', {id_user: 42, id_session : 22},  { headers: {
      //   'Authorization': `Bearer ${localStorage.getItem('token')}`
      // }} )
      // console.log(res)
      // console.log("je clique")
      // return this.$buefy.toast.open({
      //   duration: 2000,
      //   message: `<b>Entrainement de l'utilisateur bien supprimé !</b>`,
      //   position: 'is-bottom',
      //   type: 'is-success'
      // })
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
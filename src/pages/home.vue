<template>
  <div class="m-5">
    <h3 v-if="!user">you are not logged</h3>
    <div v-if="user">
      <h1 class="is-size-3 mt-2 mb-5 has-text-weight-semibold">
        Sélectionne le patient de ton choix
      </h1>

      <b-table :data="data" :selected.sync="selected" focusable>
        <b-table-column
          field="id"
          label="ID"
          width="40"
          sortable
          numeric
          v-slot="props"
        >
          {{ props.row.id }}
        </b-table-column>

        <b-table-column
          field="nom"
          label="NOM"
          width="40"
          sortable
          centered
          v-slot="props"
        >
          {{ props.row.nom }}
        </b-table-column>
        <b-table-column
          field="prenom"
          label="PRENOM"
          width="40"
          sortable
          centered
          v-slot="props"
        >
          {{ props.row.prenom }}
        </b-table-column>
        <b-table-column
          field="email"
          label="EMAIL"
          width="40"
          sortable
          centered
          v-slot="props"
        >
          {{ props.row.email }}
        </b-table-column>
        <b-table-column
          field="pathologie"
          label="PATHOLOGIE"
          width="40"
          sortable
          centered
          v-slot="props"
        >
          {{ props.row.pathologie }}
        </b-table-column>
        <b-table-column
          field="seance_restante"
          label="SEANCE RESTANTE"
          width="40"
          numeric
          sortable
          centered
          v-slot="props"
        >
          {{ props.row.seance_restante }}
        </b-table-column>
        <b-table-column
          field="age"
          label="AGE"
          width="40"
          numeric
          sortable
          centered
          v-slot="props"
        >
          {{ props.row.age }}
        </b-table-column>

        <b-table-column
          field="sexe"
          label="SEXE"
          width="40"
          numeric
          sortable
          centered
          v-slot="props"
        >
          {{ props.row.sexe ? "femme" : "homme" }}
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
          <b-button @click="changeUser(props.row)" class="is-info"
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
          <b-button @click="deleteUser(props.row.id)" class="is-danger"
            >SUPPRIMER</b-button
          >
        </b-table-column>
      </b-table>

      <section>
        <b-modal
          v-model="isComponentModalActive"
          has-modal-card
          full-screen
          :can-cancel="false"
        >
          <modal-form v-bind="formProps"></modal-form>
        </b-modal>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import ModalForm from "../components/modalForm.vue";

export default {
  name: "Home",
  computed: {
    ...mapGetters(["user"]),
   
  },
  components: {
    ModalForm,
  },
  mounted: function() {
       this.$nextTick(function() {
        this.getPatient()
        
        
  });
  },
 
  methods: {
 
     getPatient : async function() {
      const resp = await axios.get("kine/get-patient",
     { headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}` 
  }}
  );
      this.data = resp.data.response;
      return this.data
    },
    handleSubmit() {
     
      console.log(this.selected.nom);
    },
    changeUser(id) {
      this.isComponentModalActive = true;
      this.formProps = id
    },
    async deleteUser(id) {
      
      axios.delete(`kine/delete-patient/${id}`, { headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}` 
  }} ).then(() => {
    this.getPatient()
     return this.$buefy.toast.open({
          duration: 2000, 
          message: `<b>l'utilisateur est bien supprimé !</b>`,
          position: 'is-bottom',
          type: 'is-success'
        })
  }).catch(err => {console.log(err)})
    },
  },
  data: function () {
    const data = [
      {
        nom: null,
        prenom:null,
        age: null,
        email: null,
        password: null,
        sexe: null,
        seance_restante: null,
        pathologie: null,
      },
    ];

    return {
      data,

      selected: data[1],
      isComponentModalActive: false,
      formProps: {
        email: "evan@you.com",
        password: "testing",
      },
    };
  },
};
</script>

<style>
</style>
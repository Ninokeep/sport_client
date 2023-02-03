<template>
  <b-navbar class="ml-2 has-background-light">
    <template #start>
   





       <b-dropdown aria-role="list" class="mt-2 ml-3" v-if="user">
        <template #trigger="{ active }">
          <b-button
            label="Patients"
            class="button is-light has-text-weight-bold"
            :icon-right="active ? 'menu-up' : 'menu-down' "
          />
        </template>

        <router-link to="/" >
          <b-dropdown-item aria-role="listitem">Liste des patients</b-dropdown-item>
        </router-link>

        <router-link to="/inscription-patient" >
          <b-dropdown-item aria-role="listitem">Créer un patient</b-dropdown-item>
        </router-link>

       
      </b-dropdown>

    



      <b-dropdown aria-role="list" class="ml-2 mt-2" v-if="user">
        <template #trigger="{ active }">
          <b-button
            label="Exercices"
            class="button is-light has-text-weight-bold"
            :icon-right="active ? 'menu-up' : 'menu-down'"
          />
        </template>

        <router-link to="/creer-exercice" >
          <b-dropdown-item aria-role="listitem">Créer un exercice pour un patient</b-dropdown-item>
        </router-link>

        <router-link to="/liste-exercices" >
          <b-dropdown-item aria-role="listitem">Liste des exercices des patients</b-dropdown-item>
        </router-link>

      
      </b-dropdown>


    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <div v-if="user">
            <a
              class="button is-danger"
              href="javascript:void(0)"
              @click="handleClick"
            >
              Déconnexion</a
            >
          </div>

          <div v-if="!user">
            <router-link
              to="/register"
              class="button is-primary has-text-weight-bold"
            >
              Inscription
            </router-link>

            <router-link to="/login" class="button is-light">
              Connexion
            </router-link>
          </div>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Navbar",
  methods: {
    handleClick() {
      localStorage.removeItem("token");
      this.$store.dispatch("user", null);
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>

<style>
</style>
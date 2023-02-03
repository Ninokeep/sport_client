<template>
  <div id="app">
    <Navbar  />
    <div>
      <router-view  />
    </div>
  </div>
</template>

<script>
import Navbar from './components/navbar.vue';
import axios from 'axios'
export default {
  name: 'App',
   components: {
    
    Navbar
    
  },
  
 
    async created() {
    const response = await axios.get("kine");
    this.user = this.$store.dispatch('user',response.data.response);
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}
</style>

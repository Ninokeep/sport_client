import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/home.vue';
import Login from './pages/login.vue';
import Register from './pages/register.vue'
import CreerExercice from './pages/createExercice.vue';
import ListeExercice from './pages/listeExercice.vue'
import CreatePatient from './pages/createPatient';
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes : [
        {path : '/', component : Home},
        {path : '/login', component: Login},
        {path : '/register', component: Register},
        {path: '/creer-exercice', component: CreerExercice},
        {path :'/liste-exercices', component: ListeExercice},
        {path :'/inscription-patient', component: CreatePatient},
        
    ]
})
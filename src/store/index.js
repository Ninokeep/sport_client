import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import VuexPersist from 'vuex-persist';

//import the module user
const vuexLocalStorage = new VuexPersist({
    key: 'vuex', // The key to store the state on in the storage provider.
    storage: window.localStorage, // or window.sessionStorage or localForage
    // Function that passes the state and returns the state with only the objects you want to store.
    // reducer: state => state,
    reducer: state => ({
        users : state.users,
        entrainements: state.entrainements
    }) 
})



Vue.use(Vuex)



// user = user login
// users = all users (array)

export default new Vuex.Store({
    state:  {
        user : null,
        users: [],
        entrainements: []
    },
    // mutation est toujours synchrone 
    mutations: {
        user(state, user){
            state.user = user;
        },
        users(state,users){
            state.users= users
        },
        entrainements(state,entrainements){
            state.entrainements = entrainements
        }
    },
    // action est toujours asynchrone 
    actions:{
        user(context,user){
            context.commit('user',user)
        },
        async users(context){
            const resp = await axios.get("kine/get-patient",
            { headers: {
           'Authorization': `Bearer ${localStorage.getItem('token')}` 
            } 
            })
            context.commit('users',resp.data.response)
        },
        async entrainements(context){
            const resp = await axios.get('kine/get-allentrainement',{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` 
                     }   
            })
            context.commit('entrainements',resp.data.response)

        }
    },
    getters: {
        user : (state) => {
            return state.user;
        },
        users: (state) => {
            return state.users
        },
        entrainements: (state) => {
            return state.entrainements
        }
    },
    plugins: [vuexLocalStorage.plugin]

   
})
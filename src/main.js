import Vue from 'vue'
import App from './App.vue'
import { Table, Input, Button, Field, Navbar, Toast, Tabs, Select, Modal, Notification, Snackbar, Dropdown, Numberinput } from 'buefy'
import 'buefy/dist/buefy.css'
import router from './router'
import './axios';
import store from './store/index'
import { ValidationProvider } from 'vee-validate';
import {ValidationObserver} from 'vee-validate';





import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import { library } from '@fortawesome/fontawesome-svg-core';
// internal icons
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);
Vue.component('vue-fontawesome', FontAwesomeIcon);


Vue.use(Buefy, {
  defaultIconComponent: "vue-fontawesome",
  defaultIconPack: "fas",
  customIconPacks: {
    fas: {
      sizes: {
        default: "lg",
        "is-small": "1x",
        "is-medium": "2x",
        "is-large": "3x"
      },
      iconPrefix: ""
    }
  }
});
Vue.use(Table)
Vue.use(Input)
Vue.use(Button)
Vue.use(Field)
Vue.use(Navbar)
Vue.use(Toast)
Vue.use(Tabs)
Vue.use(Select)
Vue.use(Modal)
Vue.use(Notification)
Vue.use(Snackbar)
Vue.use(Dropdown)
Vue.use(Numberinput)

Vue.config.productionTip = false
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

new Vue({
  router,
  store:store,
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../tailwind.css'
import Notifications from 'vue-notification'
import VueQuillEditor from 'vue-quill-editor'

Vue.config.productionTip = false

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)

Vue.use(Notifications)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

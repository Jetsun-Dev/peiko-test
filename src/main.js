import Vue from 'vue'
import App from './App.vue'

// Globally register all `_base`-prefixed components
import './components/ui/_globals'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

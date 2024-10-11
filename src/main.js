// Import the necessary modules
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import VueApexCharts from 'vue3-apexcharts'

const options = {
  timeout: 3000, // Duration for which the toast is visible
  position: 'top-right' // Position of the toast
}

const app = createApp(App)

app.use(Toast, options)
app.use(VueApexCharts)
app.component('apexchart', VueApexCharts)

app.use(router)

app.mount('#app')

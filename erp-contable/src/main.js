import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css' // ← Esta línea activa los iconos

const app = createApp(App)

app.use(router)
app.use(vuetify) // ← Esta línea activa Vuetify
app.mount('#app')

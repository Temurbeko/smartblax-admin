import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueTheMask from 'vue-the-mask';

import App from './App.vue'
import dashboardRouter from './router/dashboard-routes'

const app = createApp(App)

app.use(createPinia())
app.use(VueTheMask as any)
app.use(dashboardRouter)

app.mount('#app')

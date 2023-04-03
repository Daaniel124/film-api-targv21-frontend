import { createApp } from 'vue'
import { config } from 'dotenv'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(router)

app.mount("#app")


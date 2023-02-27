import { createApp } from 'vue'
import { config } from 'dotenv'
import App from './App.vue'

import './assets/main.css'

const app = createApp(App)

app.mount("#app")


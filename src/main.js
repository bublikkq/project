import { createApp } from 'vue'
import App from './App.vue'
import axios from "axios";
const axiosPlugin = {
    install: (app) => {
        app.config.globalProperties.$axios = axios
    }
}
const app = createApp(App)

// app.mount("#app")
app.use(axiosPlugin).mount('#app')
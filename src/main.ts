import './style.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/es/components/message/style/css'
import App from './App.vue'
import router from "./router.ts"
import MetaInfo from 'vue-meta-info'

const app = createApp(App)

app.use(router)
app.use(MetaInfo)

app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

document.onkeydown = (e) => {
  e.preventDefault()
  e.stopPropagation()
}
document.onclick = (e) => {
  e.preventDefault()
  e.stopPropagation()
}
document.ondblclick = (e) => {
  e.preventDefault()
  e.stopPropagation()
}
document.oncontextmenu = (e) => {
  e.preventDefault()
  e.stopPropagation()
}

const app = createApp(App)

app.use(router)

app.mount('#app')

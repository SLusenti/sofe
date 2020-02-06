import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

document.onkeydown = e => {
  e.preventDefault();
  e.stopPropagation();
};
document.onclick = e => {
  e.preventDefault();
  e.stopPropagation();
};
document.ondblclick = e => {
  e.preventDefault();
  e.stopPropagation();
};
document.oncontextmenu = e => {
  e.preventDefault();
  e.stopPropagation();
};

new Vue({
  render: h => h(App)
}).$mount("#app");

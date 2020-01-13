<template>
  <div id="app">
    <menus />
    <desktop />
  </div>
</template>

<script>
import desktop from "./components/Desktop.vue";
import menus from "./components/Menu.vue";

export default {
  name: "app",
  components: {
    menus,
    desktop
  }
};
</script>

<style lang="stylus">
body
  height 100%

html
  height 100%

#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  height  100%
  width 100%
</style>

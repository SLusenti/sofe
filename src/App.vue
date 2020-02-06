<template>
  <div id="app" @click="clearMenu" @contextmenu="displayMenu">
    <menus @showUserMenu="showUserMenu" />
    <guimenu v-if="user_menu.show" :x="user_menu.x" :y="user_menu.y" :option="user_menu.opt" />
    <window />
    <guimenu
      v-if="menu.show"
      :option="menu.opt"
      :x="menu.x"
      :y="menu.y"
      @change="console.log($event)"
    />
  </div>
</template>

<script>
//import desktop from "./components/Desktop.vue";
import menus from "./components/Menu.vue";
import Window from "./components/Window.vue";
import guimenu from "./components/GuiMenu.vue";

export default {
  name: "app",
  data() {
    return {
      menu: {
        show: false,
        x: 600,
        y: 50,
        opt: ["option1", "option2", "option3", "option4"]
      },
      user_menu: {
        opt: ["Logout", "Lock user"],
        x: 0,
        y: 40,
        show: false
      },
      clearMenuUser: true
    };
  },
  mounted() {
    this.$root.$on("clear_menu", () => {
      this.menu.show = false;
      if (this.clearMenuUser) {
        this.user_menu.show = false;
      }
      this.clearMenuUser = true;
    });
  },
  methods: {
    displayMenu(e) {
      this.menu.show = true;
      this.menu.x = e.x;
      this.menu.y = e.y;
    },
    clearMenu() {
      this.$root.$emit("clear_menu");
    },
    showUserMenu(e) {
      this.clearMenuUser = false;
      this.user_menu.x = e - 20;
      this.user_menu.show = true;
    }
  },
  components: {
    menus,
    Window,
    guimenu
    //desktop
  }
};
</script>

<style lang="stylus">
#app, body, html {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: fixed;
}

#app, body {
  margin: 0;
  padding: 0;
}

html {
  touch-action: none;
}

#app, body, button, input, label, select, textarea {
  font-size: 12px;
  font-family: Sans-serif, Arial;
}

#app {
  background-color: rgb(49, 120, 206);
  background-attachment: fixed;
  background-image: url('assets/wallpaper.png');
  background-size: auto;
  background-position: center;
  background-repeat: no-repeat;
  background-position: 50%;
}
</style>

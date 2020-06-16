<template>
  <div
    id="app"
    @mousemove="Dragging($event)"
    @click="clearMenu"
    @contextmenu="displayMenu"
    @mouseup="endDragging"
  >
    <menus @showUserMenu="showUserMenu" :activeTask="win" @activate="activate($event)" />
    <guimenu v-if="user_menu.show" :x="user_menu.x" :y="user_menu.y" :option="user_menu.opt" />
    <window
      v-for="(item, indx) in win"
      :key="indx"
      @initDrag="initDragging($event,indx,'d')"
      @max="activate(indx);item.fullsize = !item.fullsize"
      @min="activate(indx);item.minimized = true"
      @close="win.splice(indx,1)"
      @initResize="initDragging($event,indx,'r')"
      @activate="activate(indx)"
      :activeTask="item"
    />
    <guimenu
      v-if="menu.show"
      :option="menu.opt"
      :x="menu.x"
      :y="menu.y"
      :winID="getWinID()"
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
      win: [
        {
          icon: "help-browser",
          name: "Welcome",
          ref: "",
          resizable: true,
          top: 59,
          left: 26,
          width: 500,
          height: 500,
          fullsize: false,
          minimized: false,
          active: true
        },
        {
          icon: "help-browser",
          name: "Welcome 1",
          ref: "",
          resizable: true,
          top: 59,
          left: 26,
          width: 500,
          height: 500-26,
          fullsize: false,
          minimized: false,
          active: false
        }
      ],
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
      clearMenuUser: true,
      x: 0,
      y: 1,
      indx: -1,
      ctype: "n"
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
    activate(id) {
      //console.log(id);
      for (var v in this.win) {
        this.win[v].active = false;
      }
      this.win[id].active = true;
      this.win[id].minimized = false;
    },
    initDragging(e, id, t) {
      this.activate(id);
      //console.log("init",e, id, t);
      if (!this.win[id].fullsize) {
        this.ctype = t;
        this.x = e.x;
        this.y = e.y;
        this.indx = id;
      }
    },
    Dragging(e) {
      if (this.indx != -1) {
        //console.log(this.ctype)
        if (this.ctype === "d") {
          if (e.y > 40) {
            this.win[this.indx].top += e.y - this.y;
            this.y = e.y;
          }
          this.win[this.indx].left += e.x - this.x;
          this.x = e.x;
        } else if (this.ctype === "r") {
          if (this.win[this.indx].width > 60) {
            //console.log("x:",e.x - this.x, e.x, this.x)
            this.win[this.indx].width += e.x - this.x;
            this.x = e.x;
          }
          if (this.win[this.indx].height > 60)  {
            //console.log("y:",e.y - this.y, e.y, this.y)
            this.win[this.indx].height += e.y - this.y;
            this.y = e.y;
          }
        }
      }
    },
    endDragging() {
      if (this.indx != -1) {
        this.indx = -1;
        this.ctype = "n";
      }
    },
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
    },
    getWinID() {
      this.winID += 1;
      return this.winID;
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

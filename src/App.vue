<template>
  <div
    id="app"
    @contextmenu="displayMenu"
    @mousemove="Dragging($event)"
    @click="clearMenu"
    @mouseup="endDragging"
  >
    <menus
      @showUserMenu="showUserMenu"
      @showMenu="showMenu"
      :activeTask="win"
      @activate="activate($event)"
    />
    <guimenu v-if="user_menu.show" :x="user_menu.x" :y="user_menu.y" :option="user_menu.opt" />
    <guimenu v-if="mainMenu" :x="0" :y="40" :option="app" @openApp="openApp" />
    <window
      v-for="(item, indx) in win"
      :key="indx"
      :refurl="item.ref"
      @initDrag="initDragging($event,indx,'d')"
      @max="activate(indx);item.fullsize = !item.fullsize"
      @min="activate(indx);item.minimized = true;menu.opt = []"
      @close="win.splice(indx,1);menu.opt = []"
      @initResize="initDragging($event,indx,'r')"
      @activate="activate(indx)"
      @changeOpt="changeOpt(item.opt)"
      @clearOpt="changeOpt([])"
      :activeTask="item"
    ></window>
    <guimenu
      @dontChange="dontchange = false"
      v-if="menu.show"
      :option="menu.opt"
      :x="menu.x"
      :y="menu.y"
      :winID="getWinID()"
      @change="change"
    />
  </div>
</template>

<script>
//import desktop from "./components/Desktop.vue";
import menus from "./components/Menu.vue";
import Window from "./components/Window.vue";
import guimenu from "./components/GuiMenu.vue";
import axios from 'axios'

export default {
  name: "app",
  data() {
    return {
      win: [],
      app: [],
      ref:"",
      menu: {
        show: false,
        x: 600,
        y: 50,
        opt: []
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
      ctype: "n",
      mainMenu: false,
      dontchange: false
    };
  },
  mounted() {
    this.$root.$on("clear_menu", () => {
      this.menu.show = false;
      if (this.clearMenuUser) {
        this.user_menu.show = false;
        this.mainMenu = false;
      }
      this.clearMenuUser = true;
    });
    window.location.origin
    axios
      .get(window.location.origin+'/app.json')
      .then(response => (
        this.app = response.data
      ));
  },
  methods: {
    change() {
      //console.log(e);
    },
    openApp(id) {
      //console.log(id)
      var app = this.app[id];
      var qadd = -1;
      for (var a in this.win) {
        if (app.name == this.win[a].name) {
          qadd = a;
        }
      }
      if (qadd == -1) {
        this.win.push(app);
        this.activate(this.win.length-1)
      } else {
        this.activate(qadd)
      }
    },
    activate(id) {
      //console.log(id);
      for (var v in this.win) {
        this.win[v].active = false;
      }
      this.win[id].active = true;
      this.win[id].minimized = false;
    },
    changeOpt(opt) {
      //console.log(opt.length > 0, this.dontchange);
      if (opt.length == 0 && !this.dontchange) {
        this.menu.opt = [];
        this.menu.show = false;
      } else if (opt.length > 0) {
        this.menu.opt = opt;
      }
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
          if (this.win[this.indx].height > 60) {
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
      this.dontchange = true;
      //console.log(e);
      if (this.menu.opt.length > 0) {
        this.menu.show = true;
        this.menu.x = e.x;
        this.menu.y = e.y;
      }
    },
    clearMenu() {
      this.$root.$emit("clear_menu");
    },
    showUserMenu(e) {
      this.mainMenu = false;
      this.clearMenuUser = false;
      this.user_menu.x = e - 20;
      this.user_menu.show = true;
    },
    showMenu() {
      this.user_menu.show = false;
      this.clearMenuUser = false;
      this.mainMenu = true;
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

.help-browser {
  background-image: url('components/assets/help-browser.png');
  height: 16px;
  width: 16px;
}

.app-menu {
  background-image: url('components/assets/app-menu.png');
  height: 16px;
  width: 16px;
}

.app-system {
  background-image: url('components/assets/app-system.png');
  height: 16px;
  width: 16px;
}

.user {
  background-image: url('components/assets/user.png');
  height: 16px;
  width: 16px;
}

.view-fullscreen {
  background-image: url('components/assets/view-fullscreen.png');
  height: 16px;
  width: 16px;
}
</style>

<template>
  <div class="menu">
    <div class="menu-container">
      <div class="menu-container-item">
        <div class="menu-button">
          <div class="app-menu"></div>
        </div>
      </div>
      <div class="menu-container-item">
        <div class="menu-button">
          <div class="app-system"></div>
        </div>
      </div>
      <div class="menu-container-item PanelItemWindowList menu-expand">
        <ul class="menu-button">
          <li :class="{ active: item.active }" v-for="(item, id) in activeTask" @click="$emit('activate',id)" :key="id">
            <div class="app-icon" :class="item.icon"></div>
            <span>{{ item.name }}</span>
          </li>
        </ul>
      </div>
      <div class="menu-container-item">
        <div class="menu-button" @click="openFullscreen">
          <div class="view-fullscreen"></div>
        </div>
      </div>
      <div class="menu-container-item">
        <div class="menu-button">
          <div class="user" id="user" @click="showUserMenu"></div>
        </div>
      </div>
      <div class="menu-container-item">
        <div class="menu-button PanelItemClock">
          <span>{{ time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment"

export default {
   props: ["activeTask"],
  data() {
    return {
      active_item: 0,
      time: moment().format("DD/MMM/YYYY HH:mm"),
    };
  },
  methods: {
    openFullscreen() {
      var e = document.getElementById("app");
      if (e.requestFullscreen) {
        e.requestFullscreen();
      } else if (e.mozRequestFullScreen) {
        /* Firefox */
        e.mozRequestFullScreen();
      } else if (e.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        e.webkitRequestFullscreen();
      } else if (e.msRequestFullscreen) {
        /* IE/Edge */
        e.msRequestFullscreen();
      }
    },
    showUserMenu() {
      this.$emit(
        "showUserMenu",
        document.getElementById("user").getBoundingClientRect().x
      );
    }
  },
  mounted() {
    setInterval(() => {
      this.time = moment().format("DD/MMM/YYYY HH:mm");
    }, 5000);
  }
};
</script>

<style lang="stylus" scoped>
.PanelItemClock {
  font-family: Monospace, Courier New;
  font-weight: 400;
  text-align: right;
}

.app-icon {
  margin-right: 0.33em;
}

li > span {
  max-width: 200px;
}

.active {
  opacity: 1 !important;
  font-size: 12px !important;
}

li {
  min-width: 16px;
  min-height: 16px;
  -webkit-flex: 1 1 auto;
  -moz-flex: 1 1 auto;
  -ms-flex: 1 1 auto;
  -o-flex: 1 1 auto;
  flex: 1 1 auto;
  justify-content: center;
  -ms-flex-align: center;
  -webkit-box-align: center;
  -moz-box-align: center;
  -ms-box-align: center;
  -o-box-align: center;
  margin-right: 0.33em;
  margin-left: 0.33em;
  font-size: 11px;
}

li, .menu-button {
  position: relative;
  box-sizing: border-box;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  -moz-align-items: center;
  align-items: center;
}

.PanelItemWindowList li > span {
  max-width: 200px;
}

.menu-ellipsis span {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
}

.menu-ellipsis {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
}

ul {
  margin: 0;
  padding: 0;
}

.menu .PanelItemWindowList li {
  opacity: 0.5;
}

.menu .PanelItemWindowList li.Focused {
  opacity: 1;
}

.menu-container > .menu-expand {
  -webkit-flex: 1 1 auto;
  -moz-flex: 1 1 auto;
  -ms-flex: 1 1 auto;
  -o-flex: 1 1 auto;
  flex: 1 1 auto;
}

.menu-button {
  list-style: none;
  z-index: 10;
  -ms-flex-align: center;
  cursor: pointer;
  margin-right: 0.33em;
  margin-left: 0.33em;
}

.help-browser {
  background-image: url('assets/help-browser.png');
  height: 16px;
  width: 16px;
}

.app-menu {
  background-image: url('assets/app-menu.png');
  height: 16px;
  width: 16px;
}

.app-system {
  background-image: url('assets/app-system.png');
  height: 16px;
  width: 16px;
}

.user {
  background-image: url('assets/user.png');
  height: 16px;
  width: 16px;
}

.view-fullscreen {
  background-image: url('assets/view-fullscreen.png');
  height: 16px;
  width: 16px;
}

.menu-container-item {
  height: 100%;
  box-sizing: border-box;
  -webkit-flex: 0 0 auto;
  -moz-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  -o-flex: 0 0 auto;
  flex: 0 0 auto;
}

.menu-container, .menu-container-item {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
}

.menu-container {
  position: relative;
  z-index: 10;
  justify-content: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  -moz-align-items: center;
  align-items: center;
  -webkit-box-align: center;
  -moz-box-align: center;
  -ms-box-align: center;
  -o-box-align: center;
  -webkit-flex-wrap: nowrap;
  -moz-flex-wrap: nowrap;
  -ms-flex-wrap: nowrap;
  -o-flex-wrap: nowrap;
  flex-wrap: nowrap;
  width: calc(100% - 0.66em);
  min-height: 16px;
  height: 16px;
  padding: 0.66em;
}

div.menu {
  display: block;
  position: absolute;
  overflow: hidden;
  z-index: 9999998;
  margin: 0;
  box-sizing: border-box;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  top: 0;
  left: 0;
  right: 0;
  color: #fff;
  padding: 0.33em;
  background: #101010;
  box-shadow: 0 0 10px 1px rgba(34, 34, 34, 0.3);
  opacity: 0.85;
}

.menu:before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

button {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgb(255, 255, 255);
  padding-top: 0;
  padding-bottom: 0;
}
</style>

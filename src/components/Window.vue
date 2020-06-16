<template>
  <div
    class="application-window"
    :style="style"
    :class="{
      active: activeTask.active,
      'active-top': activeTask.active,
      'active-bottom': !activeTask.active
    }"
    v-if="!activeTask.minimized"
    @mouseenter="$emit('changeOpt')"
    @mouseleave="$emit('clearOpt')"
  >
    <div class="application-window-top">
      <div class="application-window-icon" @mousedown="initDragging" :class="[activeTask.icon]"></div>
      <div class="application-window-title" @mousedown="initDragging" :class="{active: isActive}">
        <span>{{ this.activeTask.name }}</span>
      </div>
      <div class="application-window-top-button">
        <div class="application-window-button-minimize" @click="min"></div>
      </div>
      <div class="application-window-top-button">
        <div class="application-window-button-maximize" @click="max"></div>
      </div>
      <div class="application-window-top-button">
        <div class="application-window-button-close" @click="close"></div>
      </div>
    </div>
    <div class="application-window-content" @click="activate">
      <slot />
    </div>
    <div class="application-resize" @mousedown="resize"></div>
  </div>
</template>

<script>
export default {
  props: ["winID", "activeTask"],
  data() {
    return {
      isActive: true
    };
  },
  methods: {
    initDragging(e) {
      this.$emit("initDrag", e);
    },
    max() {
      this.$emit("max");
    },
    min() {
      this.$emit("min");
    },
    resize(e) {
      this.$emit("initResize", e);
    },
    close() {
      this.$emit("close");
    },
    activate() {
      this.$emit("activate");
    }
  },
  computed: {
    style() {
      if (this.activeTask.fullsize) {
        //console.log("max");
        return `top: 40px;
              left: 0px;
              right: 0px;
              bottom: 0px;`;
      } else {
        //console.log("normal");
        return `top: ${this.activeTask.top}px;
              left: ${this.activeTask.left}px;
              width: ${this.activeTask.width}px;
              height: ${this.activeTask.height}px;`;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.active-top {
  z-index: 10;
}

.active-bottom {
  z-index: 5;
}

.application-window-content {
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.application-resize {
  position: absolute;
  height: 10px;
  width: 10px;
  right: 0;
  bottom: 0;
  z-index: 2;
  cursor: nwse-resize;
}

.gui-menu-entry {
  color: #242424;
  padding-right: 16px;
}

.gui-menu-entry>label {
  cursor: pointer;
  line-height: 1.5;
  padding: 0.33em;
  vertical-align: middle;
  display: inline-block;
  pointer-events: none;
}

.application-window-button-close {
  margin: auto;
  height: 16px;
  width: 16px;
  display: block;
  cursor: pointer;
  border-radius: 16px;
  background: #e56c5c;
  background: -moz-linear-gradient(top, #e56c5c 0, #f09c8d 100%);
  background: -webkit-linear-gradient(top, #e56c5c, #f09c8d);
  background: linear-gradient(180deg, #e56c5c 0, #f09c8d);
}

.application-window-button-close:hover {
  background: #f09c8d;
  background: -moz-linear-gradient(top, #f09c8d 0, #e56c5c 100%);
  background: -webkit-linear-gradient(top, #f09c8d, #e56c5c);
  background: linear-gradient(180deg, #f09c8d 0, #e56c5c);
}

.application-window-button-maximize {
  margin: auto;
  height: 16px;
  width: 16px;
  display: block;
  cursor: pointer;
  border-radius: 16px;
  background: #8dd22b;
  background: -moz-linear-gradient(top, #8dd22b 0, #b1ec70 100%);
  background: -webkit-linear-gradient(top, #8dd22b, #b1ec70);
  background: linear-gradient(180deg, #8dd22b 0, #b1ec70);
}

.application-window-button-maximize:hover {
  background: #b1ec70;
  background: -moz-linear-gradient(top, #b1ec70 0, #8dd22b 100%);
  background: -webkit-linear-gradient(top, #b1ec70, #8dd22b);
  background: linear-gradient(180deg, #b1ec70 0, #8dd22b);
}

.application-window-button-minimize {
  margin: auto;
  height: 16px;
  width: 16px;
  display: block;
  background: #f9c435;
  background: -moz-linear-gradient(top, #f9c435 0, #fdd675 100%);
  background: -webkit-linear-gradient(top, #f9c435, #fdd675);
  background: linear-gradient(180deg, #f9c435 0, #fdd675);
  cursor: pointer;
  border-radius: 16px;
}

.application-window-button-minimize:hover {
  background: #fdd675;
  background: -moz-linear-gradient(top, #fdd675 0, #f9c435 100%);
  background: -webkit-linear-gradient(top, #fdd675, #f9c435);
  background: linear-gradient(180deg, #fdd675 0, #f9c435);
}

.application-window-title {
  display: block;
  font-weight: 700;
  color: #242424;
  opacity: 0.5;
  left: 20.33px;
  line-height: 2.5em;
  text-align: center;
  height: 100%;
  z-index: 1;
  overflow: hidden;
  white-space: nowrap;
  -webkit-text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
  -ms-text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  -webkit-flex: 1 1 auto;
  -moz-flex: 1 1 auto;
  -ms-flex: 1 1 auto;
  -o-flex: 1 1 auto;
  flex: 1 1 auto;
}

.application-window-top-button {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  width: 2em;
}

.application-window-icon {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: 16px;
  width: 2.5em;
}

.application-window-top {
  min-width: 1em;
  min-height: 1em;
  -webkit-flex: 0 0 auto;
  -moz-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  -o-flex: 0 0 auto;
  flex: 0 0 auto;
}

.application-window-top {
  position: absolute;
  flex-wrap: nowrap;
  display: flex;
  top: -2.5em;
  height: 2.5em;
  left: 0;
  right: 0;
  z-index: 5;
  -webkit-flex-wrap: nowrap;
  -moz-flex-wrap: nowrap;
  -ms-flex-wrap: nowrap;
  -o-flex-wrap: nowrap;
}

.application-window {
  position: absolute;
  overflow: visible;
  opacity: 0.9;
  margin-top: 2.5em;
}

.application-window:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.3);
  background: #ebebeb;
  top: -2.75em;
  left: -0.25em;
  right: -0.25em;
  bottom: -0.25em;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

.active {
  opacity: 1;
}

.active:before {
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.6);
}
</style>
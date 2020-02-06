<template>
  <div class="gui-menu" :style="style">
    <div class="gui-menu-entry" v-for="(opt, id) in option" :key="opt" @click="$emit('change',id)">
      <label>{{ opt }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: ["x", "y", "option"],
  computed: {
    style() {
      return `left: ${this.x}px; top: ${this.y}px;`;
    }
  }
};
</script>

<style lang="stylus" scoped>
.gui-menu {
  display: inline-block;
  position: relative;
  display: block;
  position: absolute;
  z-index: 99999999;
  border: 1px solid transparent;
  background: #ebebeb;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.6);
  color: #242424;
}

.gui-menu-entry {
  background-position: 0.33em;
  background-repeat: no-repeat;
  background-position: 0;
  background-size: 16px;
  white-space: nowrap;
  display: block;
  position: relative;
  text-align: center;
  cursor: pointer;
}

label {
  font-family: Karla, Sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 12px;
  color: #242424;
  vertical-align: middle;
  display: inline-block;
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
  padding: 0.33em;
}

.gui-menu-entry:hover {
  background-color: #2d73d2;
}
</style>
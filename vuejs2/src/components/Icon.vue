<template>
  <div class="icon" :class="{bordert: printborder, border_hover:isdragging}">
    <div v-if="isprintable">
      <img :id="imgid" :src="hicon" height="42" width="42"> 
      <div
          :target="imgid"
          :title="hname"
          triggers="hover focus"
          placement="bottom"
        ></div>
    </div>
    <div v-else>
      <div class="empty">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [ "hname", "hicon", "isdragging" ],
  computed: {
    isprintable() {
      return this.hname != "" ? true : false
    },
    printborder() {
      return this.hname != "" && !this.isdragging ? true : false
    },
    imgid() {
      return "img"+"_"+this._uid
    }
  }
}
</script>

<style lang="stylus" scoped>
div.bordert
  border 1px solid gray;
  border-radius 5px;

div.border_hover
  border 2px solid blue;
  border-radius 5px;

div.empty
  height 42px 
  width 42px

div.icon
  max-width 100px;
  margin auto
  margin-top 10px
  margin-bottom 10px
  padding-bottom 10px
  padding-top 10px
  cursor pointer
</style>
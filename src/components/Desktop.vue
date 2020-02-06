<template>
  <div class="desktop">
    <div v-for="(array_item, index) in arrays" :key="array+index.toString()" class="item">
      <div class="align-self-center" v-for="( element, id ) in array_item" :key="element.name" @drop="onDropCallback($event, element, id, array_item)" @dragover="allowDrop($event)">
        <div draggable="true" @dragstart="onDragCallback($event, element, id, array_item)">
          <icon :isdragging="dragging.isdragging" :hname="element.name" :hicon="element.href" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import icon from "./Icon.vue"
export default {
  data: function() {
    return {
      arrays: [
        [
          { name: "notes", href: "https://image.flaticon.com/icons/svg/1395/1395476.svg" },
          { name: "trends", href: "https://image.flaticon.com/icons/svg/1395/1395488.svg" },
          { name: "", href: "" },
          { name: "", href: "" },
          { name: "", href: "" },
          { name: "", href: "" },
          { name: "run", href: "https://image.flaticon.com/icons/svg/1791/1791987.svg" }
        ],
        [
          { name: "files", href: "https://image.flaticon.com/icons/svg/1395/1395451.svg" },
          { name: "", href: "" },
          { name: "", href: "" },
          { name: "", href: "" },
          { name: "", href: "" },
          { name: "permission", href: "https://image.flaticon.com/icons/svg/2444/2444493.svg" },
          { name: "messages", href: "https://image.flaticon.com/icons/svg/1395/1395465.svg" }
        ],
        [
          { name: "search", href: "https://image.flaticon.com/icons/svg/751/751463.svg" },
          { name: "", href: "" },
          { name: "", href: "" },
          { name: "", href: "" },
          { name: "", href: "" },
          { name: "", href: "" },
          { name: "", href: "" }
        ],
        [
          { name: "", href: "" },
          { name: "", href: "" },
          { name: "", href: "" },
          { name: "", href: "" },
          { name: "", href: "" },
          { name: "", href: "" },
          { name: "", href: "" },
        ],
        [
          { name: "", href: "" },
          { name: "", href: "" },
          { name: "", href: "" },
          { name: "", href: "" },
          { name: "", href: "" },
          { name: "", href: "" },
          { name: "", href: "" },
        ]
      ],
      dragging: {
        el: null,
        id: null,
        list: null,
        isdragging: false
      }
    };
  },
  methods: {
    onDragCallback(ev, el, id, list) {
      console.log("drag", id);
      this.dragging.el = el;
      this.dragging.id = id;
      this.dragging.list = list;
      this.dragging.isdragging = true;
    },
    onDropCallback(ev, el, id, list) {
      ev.preventDefault();
      this.dragging.list.splice(this.dragging.id,1,el);
      list.splice(id,1,this.dragging.el);
      this.dragging.isdragging = false;
      this.dragging = {
        el: null,
        id: null,
        list: null,
        isdragging: false
      };
    },
    allowDrop(ev) {
      ev.preventDefault();
    }
  },
  components: {
    icon
  }
};
</script>

<style lang="stylus" scoped>
div.desktop
  max-width 100%

div.draghover
  border-style solid;
  border-width 5px
  border-color rgb(33, 150, 243)
</style>

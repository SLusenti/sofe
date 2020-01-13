<template>
  <b-container class="bv-example-row menu">
    <b-row>
      <b-col sm="1" class="align-self-center" style="justify-content: flex-start">
        <b-button>
          <b-icon icon="list"></b-icon>
        </b-button>
      </b-col>
      <b-col class="align-self-center">
        <b-row>
          <b-col class="align-right">
            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmaxcdn.icons8.com%2Fwindows8%2FPNG%2F512%2FLogos%2Fopenstack_copyrighted-512.png&f=1&nofb=1" width="40" height="30">
          </b-col>
          <b-col>
            <div class="title"> SOFE </div>
          </b-col>
        </b-row>
      </b-col>
      <b-col></b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
div.align-right
  text-align right 

div.menu
  width 100%
  height 12mm
  background-color rgb(238, 30, 72)
  max-width 100%
  text-align left

div.row
  height 100%

div.title
  font-family: 'Alatsi';
  font-size: 22px;

button
  background-color rgba(0,0,0,0)
  border-color rgb(255,255,255)
  padding-top 0
  padding-bottom 0
</style>

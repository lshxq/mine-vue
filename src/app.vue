<template lang="pug">
.app-main-panel
  .top
  .bottom
    .left
    .right
      router-view
</template>
<script>
// import utils from "@/utils/utils.js"
export default {
  data() {
    return {
      show: false,
      error: false,
    }
  },
  mounted() { },
};
</script>
<style lang="sass" scoped>
$bg-color: #f0f0f0
.app-main-panel
  box-sizing: border-box
  background-color: white
  height: 100vh
  width: 100%
  padding: 0
  margin: 0
  &>.top
    margin: 10px
    height: 40px
    background-color: $bg-color
  &>.bottom
    height: calc(100% - 60px)
    width: 100%
    display: flex
    &>.left
      flex: 0 0 300px
      background-color: $bg-color
      margin: 0 0 0 10px
      height: 100%
    &>.right
      flex: 1 1 auto
      margin: 0 10px
      background-color: $bg-color
      height: 100%
</style>

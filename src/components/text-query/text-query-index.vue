<template lang="pug">
  .text-query-main
    el-tooltip(content="敲击回车，确定检索" placement="top" effect="light")
      el-input(v-model='valueDisplay', @change='valueChanged' :placeholder='placeholder')
    el-tooltip(content="点击清空检索条件" placement="top-start" effect="light")
      i.el-icon-error.clear-query-btn(@click="clearQuery")
</template>
<script>
export default {
  props: {
    text: String,
    placeholder: String,
  },
  data() {
    const { text = "" } = this;
    return {
      valueDisplay: text,
    };
  },
  methods: {
    valueChanged(text) {
      this.$emit("update:text", text);
    },
    clearQuery() {
      this.valueDisplay = "";
      this.valueChanged("");
    },
  },
};
</script>
<style lang="sass" scoped>
.text-query-main:hover
  &>.clear-query-btn
    display: block

.text-query-main
  position: relative

  &>.clear-query-btn
    position: absolute
    right: 15px
    top: 10px
    color: #BEBEBE
    display: none
    transition: all .5s
    cursor: pointer

  &>.clear-query-btn:hover
    color: #FF2D2D
</style>

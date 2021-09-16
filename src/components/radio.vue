<template lang="pug">
  .radio-main
    .radio-outter(@click='clicked' :class="radiuClass")
      .radio-inner
</template>

<script>
export default {
  props: {
    checked: Boolean,
  },
  computed: {
    radiuClass() {
      const { checked } = this;
      return {
        checked,
      };
    },
  },
  methods: {
    clicked() {
      this.$emit("click", !this.checked);
    },
  },
};
</script>

<style lang="sass" scoped>
.radio-main
  display: flex
  align-items: center
  justify-content: center
  &>.radio-outter
    cursor: pointer
    border: 1px solid #dcdfe6
    background-color: white
    display: flex
    align-items: center
    justify-content: center
    width: 16px
    height: 16px
    border-radius: 50%
    &>.radio-inner
      width: 6px
      height: 6px
      background: transparent
      border-radius: 50%

  &>.radio-outter.checked
    background-color: #409eff
    &>.radio-inner
      background-color: white
</style>
